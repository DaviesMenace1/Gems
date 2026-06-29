// ==========================================
// 1. GLOBAL IDENTITY & ROLE MANAGEMENT
// ==========================================

export type UserRole = 'ADMIN' | 'TRADE' | 'CLIENT' | 'INSTALLER' | 'MEMBER' | 'GUEST';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  loyaltyPoints: number;
  isVerified: boolean;
}

// ==========================================
// 2. ARCHITECTURE & PROJECT PORTFOLIOS
// ==========================================

export type ProjectStatus = 'CONCEPT' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export interface ProtectedDrawing {
  id: string;
  projectId: string;
  title: string;
  fileUrl: string; // AWS S3 Secure URL
  fileSize: number; // In bytes
  version: string;
  allowedRoles: UserRole[];
  uploadedAt: Date;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  location: string;
  completionYear: number;
  status: ProjectStatus;
  heroImageUrl: string; // Cloudinary CDN
  galleryUrls: string[];
  editorialText: string;
  architects: string[];
  protectedDrawings: ProtectedDrawing[];
  metadata: {
    metaTitle: string;
    metaDescription: string;
  };
}

// ==========================================
// 3. ECOMMERCE & COLLECTIONS SUITE
// ==========================================

export interface MaterialOption {
  id: string;
  name: string;
  swatchUrl: string;
  priceModifier: number; // Flat rate or percentage addition
}

export interface ProductVariant {
  id: string;
  sku: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'mm' | 'cm' | 'm';
  };
  weightKg: number;
  stockCount: number;
  price: number;
  material: MaterialOption;
}

export interface ProductCollectionItem {
  id: string;
  slug: string;
  collectionName: 'THE_AVANT_GARDE' | 'MINIMALIST_OBSIDIAN' | 'CLASSIC_IVORY';
  title: string;
  description: string;
  basePrice: number;
  currency: 'UGX' | 'USD' | 'EUR';
  variants: ProductVariant[];
  images: string[]; // Cloudinary CDN Array
  isCustomizable: boolean;
  reviews: UserReview[];
}

export interface UserReview {
  id: string;
  userId: string;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: Date;
}

// ==========================================
// 4. INTEGRATIONS & SYSTEM INFRASTRUCTURE
// ==========================================

export interface PaymentTransaction {
  id: string;
  transactionReference: string; // Flutterwave reference ID
  userId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  paymentMethod: string;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  payloadBefore?: string; // JSON string for tracking administrative updates
  payloadAfter?: string;  // JSON string for tracking administrative updates
}
