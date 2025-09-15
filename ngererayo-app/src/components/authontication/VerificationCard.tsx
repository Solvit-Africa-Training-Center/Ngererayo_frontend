import React, { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import OTPInput from './OTPInput';
import VerificationMethodToggle from './VerificationMethodToggle';
import WhyVerifySection from './WhyVerifySection';
import { VerificationMethod } from '../../type/verification';
import { useCountdown } from '../../hooks/useCountdown';
import { validateOTP } from '../../utilis/otpHelpers';

interface VerificationCardProps {
  method: 'sms' | 'email';
  contactInfo: string;
  onMethodChange: (method: 'sms' | 'email') => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

const VerificationCard: React.FC<VerificationCardProps> = ({
  method,
  contactInfo,
  onMethodChange,
  onVerify,
  onResend,
  onBack,
  isLoading = false
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { timeLeft, canResend, start } = useCountdown(60);

  const methods: VerificationMethod[] = [
    {
      type: 'sms',
      display: 'SMS to 078***9787',
      masked: '078***9787',
      isSelected: method === 'sms'
    },
    {
      type: 'email',
      display: 'Email to you@ig.com',
      masked: 'you@ig.com',
      isSelected: method === 'email'
    }
  ];

  useEffect(() => {
    start();
  }, [method, start]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = () => {
    if (!validateOTP(otp)) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    setError('');
    onVerify(otp);
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      start();
      setOtp('');
      setError('');
    }
  };

  const handleOTPChange = (newOtp: string) => {
    setOtp(newOtp);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify your account</h2>
      </div>

      {/* Method Selection */}
      <VerificationMethodToggle
        methods={methods}
        selectedMethod={method}
        onMethodChange={onMethodChange}
      />

      {/* Verification Status */}
      <div className="text-center my-6">
        <p className="text-sm text-gray-600 mb-2">
          We've sent a 6-digit verification code to your {method === 'sms' ? 'phone number' : 'email'}
        </p>
        <p className="font-semibold text-gray-900">{contactInfo}</p>
      </div>

      {/* OTP Input */}
      <div className="mb-6">
        <OTPInput
          length={6}
          value={otp}
          onChange={handleOTPChange}
          disabled={isLoading}
        />
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`text-sm ${
            canResend 
              ? 'text-green-600 hover:text-green-700' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          {canResend ? 'Resend code' : `Resend in ${timeLeft}s`}
        </button>

        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          <Check size={18} />
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>

        <button
          onClick={onBack}
          className="w-full text-gray-600 hover:text-gray-800 text-sm transition-colors"
        >
          Back to registration
        </button>
      </div>

      <WhyVerifySection />
    </div>
  );
};

export default VerificationCard;