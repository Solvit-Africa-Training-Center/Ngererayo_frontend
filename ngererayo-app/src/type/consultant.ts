export interface ConsultantProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  experience: number;
  rating: number;
  totalConsultations: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documents: ConsultantDocument[];
  services: ServiceCategory[];
}

export interface ConsultantDocument {
  id: string;
  type: 'id_document' | 'professional_license' | 'degree' | 'certification';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface ConsultationSession {
  id: string;
  consultantId: string;
  clientId: string;
  clientName: string;
  service: string;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'video' | 'phone' | 'in-person';
  meetingLink?: string;
  notes?: string;
  rating?: number;
  review?: string;
}

export interface ConsultantReview {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  service: string;
  createdAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  icon: string;
  isActive: boolean;
}

export interface ConsultantMetrics {
  activeClients: number;
  consultationsThisMonth: number;
  averageRating: number;
  monthlyRevenue: number;
}