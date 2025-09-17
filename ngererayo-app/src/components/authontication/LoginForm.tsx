import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./AuthHeader";
import Footer from "../landingpage/Footer";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { api,} from "../../utilis/api";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/accounts/login/', { email, password });
      // Save token in localStorage for later requests
      sessionStorage.setItem("token", res.data.access);
      navigate("/buyerhome");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <div>
      <Header />
            <div  className="relative bg-cover bg-center text-white py-25"
  style={{
    backgroundImage: `url('/loginBg.jpg')`,
  }}>
      {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-yellow-900 opacity-80"></div>
     <div className="container mx-auto px-4 relative z-20">

      <div className="py-15">
        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto bg-white rounded-xl border border-green-600 p-6 shadow space-y-6"
        >
          <h2 className="text-2xl text-black font-bold text-center">Login to your Account</h2>
          <p className="text-sm text-gray-500 text-center">Enter your email and password</p>

          <AuthButton text="Continue with Google" variant="secondary" />

          <div className="relative text-center text-sm text-gray-400">
            <span className="absolute left-0 top-1/2 h-px w-full bg-gray-200"></span>
            <span className="relative bg-white px-2">Or login with email</span>
          </div>

          <AuthInput
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-black">
              <input type="checkbox" className="h-4 w-4 " /> Remember me
            </label>
            <a href="#" className="text-green-600 hover:underline">Forgot password?</a>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <AuthButton text="Login" type="submit" />

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">Create one</a>
          </p>
        </form>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
