import React from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { Eye, EyeOff } from "lucide-react";
import Header from "../landingpage/Header";
import Footer from "../landingpage/Footer";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy check
    if (email === "buyer@example.com" && password === "123456") {
      navigate("/buyerhome"); // redirect to dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <Header />

      <div className="py-15">
        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto bg-white/70 rounded-xl border border-green-600 p-6 shadow space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Login to your Account</h2>
          <p className="text-sm text-gray-500 text-center">
            Enter your email and password
          </p>

          {/* Google Button */}
          <AuthButton text="Continue with Google" variant="secondary" />

          <div className="relative text-center text-sm text-gray-400">
            <span className="absolute left-0 top-1/2 h-px w-full bg-gray-200"></span>
            <span className="relative bg-white px-2">Or login with email</span>
          </div>

          {/* Email */}
          <AuthInput
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          {/* Password */}
          <AuthInput
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>
            <a href="#" className="text-green-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Actions */}
          <AuthButton text="Login" type="submit" />

          {/* Switch to Register */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Create one
            </a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default LoginForm;
