import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Bell, User } from 'lucide-react';
import VerificationCard from './VerificationCard';
import { maskPhoneNumber, maskEmail } from '../../utilis/otpHelpers';

interface OTPVerificationPageProps {
  phoneNumber?: string;
  email?: string;
  onVerificationSuccess?: () => void;
  onBackToRegistration?: () => void;
}

const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({
  phoneNumber = '0788899787',
  email = 'user@example.com',
  onVerificationSuccess,
  onBackToRegistration
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState<'sms' | 'email'>('sms');
  const [isLoading, setIsLoading] = useState(false);

  // Get user data from navigation state if available
  const userData = location.state?.userData;
  const actualPhone = userData?.phoneNumber || phoneNumber;
  const actualEmail = userData?.email || email;

  const getContactInfo = () => {
    return method === 'sms' ? actualPhone : actualEmail;
  };

  const getMaskedContactInfo = () => {
    return method === 'sms' ? maskPhoneNumber(actualPhone) : maskEmail(actualEmail);
  };

  const handleMethodChange = (newMethod: 'sms' | 'email') => {
    setMethod(newMethod);
  };

  const handleVerify = async (otp: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, verify OTP with backend
      console.log('Verifying OTP:', otp, 'for', method, getContactInfo());
      
      if (onVerificationSuccess) {
        onVerificationSuccess();
      } else {
        navigate('/buyerhome', { 
          state: { 
            message: 'Account verified successfully!',
            userData: userData 
          }
        });
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    console.log('Resending OTP to', method, getContactInfo());
    // In a real app, call API to resend OTP
  };

  const handleBack = () => {
    if (onBackToRegistration) {
      onBackToRegistration();
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🌾</span>
                </div>
                <span className="text-xl font-bold text-green-600">NGERERAYO</span>
                <span className="text-sm text-gray-500 ml-2">Agricultural Marketplace</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Home</a>
              <a href="/marketplace" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Marketplace</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">EN</span>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <User size={20} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <VerificationCard
          method={method}
          contactInfo={getMaskedContactInfo()}
          onMethodChange={handleMethodChange}
          onVerify={handleVerify}
          onResend={handleResend}
          onBack={handleBack}
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">🌾</span>
                </div>
                <span className="text-xl font-bold">NGERERAYO</span>
              </div>
              <p className="text-green-100 text-sm">
                Rwanda's leading digital agricultural marketplace connecting farmers and buyers across the country.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li><a href="#" className="hover:text-white">About us</a></li>
                <li><a href="#" className="hover:text-white">How it works</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li><a href="#" className="hover:text-white">Marketplace</a></li>
                <li><a href="#" className="hover:text-white">Cooperatives</a></li>
                <li><a href="#" className="hover:text-white">Payments</a></li>
                <li><a href="#" className="hover:text-white">Delivery</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact us</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>📞 +250785600440</li>
                <li>✉️ info@ngererayo.rw</li>
                <li>📍 Kigali, Rwanda</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-500 mt-8 pt-8 text-center text-sm text-green-100">
            ©2024 Ngererayo. Uburenganzira bwose buranzwe. Made in Rwanda
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OTPVerificationPage;