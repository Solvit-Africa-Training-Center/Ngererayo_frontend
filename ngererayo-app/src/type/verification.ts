export interface VerificationData {
  phoneNumber: string;
  email: string;
  method: 'sms' | 'email';
  maskedContact: string;
}

export interface OTPVerificationState {
  otp: string;
  method: 'sms' | 'email';
  isLoading: boolean;
  error: string | null;
  resendTimer: number;
  canResend: boolean;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  token?: string;
  error?: string;
}

export interface VerificationMethod {
  type: 'sms' | 'email';
  display: string;
  masked: string;
  isSelected: boolean;
}