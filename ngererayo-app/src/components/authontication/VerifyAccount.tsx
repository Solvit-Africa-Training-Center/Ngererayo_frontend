import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyAccount: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate('/buyerhome');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Account</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;