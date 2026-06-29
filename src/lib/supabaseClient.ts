import { createClient } from '@supabase/supabase-js';
import { UserProfile, ProjectCaseStudy, ProtectedDrawing } from '../types/platform';

// Infrastructure Schema Definition for Supabase Engine
export interface DatabaseSchema {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'createdAt' | 'updatedAt'>;
        Update: Partial<Omit<UserProfile, 'id'>>;
      };
      projects: {
        Row: ProjectCaseStudy;
        Insert: Omit<ProjectCaseStudy, 'id' | 'protectedDrawings'>;
        Update: Partial<Omit<ProjectCaseStudy, 'id'>>;
      };
      protected_drawings: {
        Row: ProtectedDrawing;
        Insert: Omit<ProtectedDrawing, 'id' | 'uploadedAt'>;
        Update: Partial<Omit<ProtectedDrawing, 'id'>>;
      };
    };
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-tenant.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient<DatabaseSchema>(supabaseUrl, supabaseAnonKey);
