export interface VerificationDocument {
  id: string;
  type: 'id_document' | 'business_license';
  name: string;
  file: File;
  size: number;
  uploadedAt: Date;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
}

export interface VerificationState {
  documents: VerificationDocument[];
  isUploading: boolean;
  uploadProgress: Record<string, number>;
  errors: Record<string, string>;
}

export interface DocumentRequirement {
  type: 'id_document' | 'business_license';
  label: string;
  description: string;
  acceptedFormats: string[];
  maxSize: number;
  required: boolean;
}

export interface VerificationReview {
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  documents: VerificationDocument[];
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: Date;
  rejectionReason?: string;
}