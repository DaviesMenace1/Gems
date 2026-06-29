import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { supabase } from '../../../lib/supabaseClient';
import { ApiResponse } from '../../../types/api';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ downloadUrl: string }>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests are authorized here.' } });
  }

  // 1. Check Authenticated Session
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Missing auth credentials token.' } });
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid active user credentials.' } });
  }

  // 2. Fetch User Profile Role Clearances
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'User structural profile clearance profile missing.' } });
  }

  const { drawingId } = req.query;
  if (!drawingId || typeof drawingId !== 'string') {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Explicit string target drawingId required.' } });
  }

  // 3. Fetch Drawing Record Tracking Matrix
  const { data: drawing, error: drawingError } = await supabase
    .from('protected_drawings')
    .select('file_key', 'allowed_roles')
    .eq('id', drawingId)
    .single();

  if (drawingError || !drawing) {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'The requested architectural specification drawing asset is missing.' } });
  }

  // 4. Validate Cross-Sectional Role Clearance Permissions
  const userHasAccess = (drawing.allowed_roles as unknown as string[]).includes(profile.role);
  if (!userHasAccess) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Your authorization level is insufficient for this set of schematic parameters.' } });
  }

  // 5. Generate Presigned Temporary Link expiring in 15 Minutes
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_PROTECTED_BUCKET_NAME || 'luxury-spec-drawings',
      Key: drawing.file_key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    return res.status(200).json({
      success: true,
      data: { downloadUrl: presignedUrl }
    });
  } catch (s3Err) {
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_S3_FAULT', message: 'Failed generating presigned access token handshake.', details: { error: String(s3Err) } }
    });
  }
}
