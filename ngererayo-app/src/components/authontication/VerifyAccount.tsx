// src/components/authentication/VerifyAccount.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import AuthButton from "./AuthButton";
import { api } from "../../utilis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyAccount: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // get email from navigation

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  // Handle OTP input
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        (nextInput as HTMLInputElement)?.focus();
      }
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      await api.post("/accounts/resend-otp/", { email });
      toast.success("OTP resent to your email");
    } catch {
      toast.error("Failed to resend code");
    }
  };

  // Submit OTP
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }
    setLoading(true);
    try {
      await api.post("/accounts/verify-otp/", { email, otp: String(code), });
      console.log({ email, otp: code });
      toast.success("Account verified successfully!");
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      toast.error("Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <ShieldCheck className="text-green-600 w-8 h-8" />
          <h2 className="text-xl font-bold">Verify your account</h2>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          We’ve sent a 6-digit verification code to your email: <br />
          <span className="font-semibold">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 border rounded-lg text-center text-lg focus:ring-2 focus:ring-green-600"
            />
          ))}
        </div>

        {/* Resend */}
        <p
          onClick={handleResend}
          className="text-green-600 text-sm cursor-pointer mb-4 hover:underline"
        >
          Resend code
        </p>

        {/* Verify Button */}
        <AuthButton
          text={loading ? "Verifying..." : "Verify Code"}
          onClick={handleVerify}
          
        />

        {/* Back */}
        <p
          onClick={() => navigate("/register")}
          className="text-sm text-gray-600 text-center mt-4 cursor-pointer hover:underline"
        >
          Back to registration
        </p>

        {/* Info Box */}
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 text-sm text-gray-600">
          <strong className="block mb-1">Why verify?</strong>
          Account verification helps us ensure the security of our platform
          and prevents unauthorized access to your account.
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default VerifyAccount;
