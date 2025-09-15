import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { Eye, EyeOff } from "lucide-react";
import Header from "../landingpage/Header";
import Footer from "../landingpage/Footer";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>

    <Header />
    <div className="py-15">

    
    <div className="max-w-md mx-auto bg-white/70 rounded-xl border border-green-600 p-6 shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Create your Account</h2>
      <p className="text-sm text-gray-500 text-center">
        Enter your details to get started
      </p>

      {/* Google Button */}
      <AuthButton text="Continue with Google" variant="secondary" />

      <div className="relative text-center text-sm text-gray-400">
        <span className="absolute left-0 top-1/2 h-px w-full bg-gray-200"></span>
        <span className="relative bg-white px-2">Or create with email</span>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4">
        <AuthInput placeholder="First Name" />
        <AuthInput placeholder="Last Name" />
      </div>
      <AuthInput placeholder="Email Address" type="email" />
      <AuthInput placeholder="Phone Number" type="tel" />
      <AuthInput
        placeholder="Create a strong password"
        type={showPassword ? "text" : "password"}
        rightIcon={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />
      <AuthInput
        placeholder="Confirm Password"
        type={showConfirm ? "text" : "password"}
        rightIcon={
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />

      {/* Terms */}
      <div className="flex items-center gap-2 text-sm">
        <input type="checkbox" id="terms" className="h-4 w-4" />
        <label htmlFor="terms">
          I agree to <span className="font-semibold">Ngererayo</span>{" "}
          <a href="#" className="text-green-600 hover:underline">
            Terms of services
          </a>{" "}
          and{" "}
          <a href="#" className="text-green-600 hover:underline">
            privacy
          </a>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <AuthButton onClick={() => navigate('/')} text="Back" variant="secondary" />
        <AuthButton text="Create Account" type="submit" />
      </div>
      <p className="text-sm text-center text-gray-600">
            If you already have an account{" "}
            <a href="/login" className="text-green-600 hover:underline">
              login
            </a>
          </p>
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default RegisterForm;
