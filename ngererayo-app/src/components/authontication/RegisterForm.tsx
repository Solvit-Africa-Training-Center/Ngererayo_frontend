import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "./AuthHeader";
import Footer from "../landingpage/Footer";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { api, REGISTER_URL } from "../../utilis/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false); // <-- loading state


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
setLoading(true); // show loader
    try {
      await api.post(REGISTER_URL, {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        confirm_password: confirm,
        role: "buyer",
      });

      toast.success("Account created successfully!");
      // redirect to verify-otp page with email pre-filled
      setTimeout(() => navigate("/verify-otp", { state: { email } }), 3000);
    } catch (err: any) {
      console.error(err.response?.data);
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.confirm_password?.[0] ||
        "Registration failed";
      toast.error(errorMessage);
     } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div>
      <Header />
      <div  className="relative bg-cover bg-center text-white py-25"
  style={{
    backgroundImage: `url('/registerBg.jpg')`,
  }}>
      {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-yellow-900 opacity-80"></div>
     <div className="container mx-auto px-4 relative z-20">

     
        <form
          onSubmit={handleRegister}
          className="max-w-md mx-auto bg-white rounded-xl border border-green-600 p-6 shadow space-y-6 z-20"
        >
          <h2 className="text-2xl text-black font-bold text-center">Create your Account</h2>
          <p className="text-sm text-gray-500 text-center">
            Enter your details to get started
          </p>

          <AuthButton text="Continue with Google" variant="secondary" />

          <div className="relative text-center text-sm text-gray-400">
            <span className="absolute left-0 top-1/2 h-px w-full bg-gray-200"></span>
            <span className="relative bg-white px-2">Or create with email</span>
          </div>

          <AuthInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <AuthInput
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <AuthInput
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            placeholder="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <AuthInput
            placeholder="Create a strong password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <AuthInput
            placeholder="Confirm Password"
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            rightIcon={
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <div className="flex gap-3">
            <AuthButton onClick={() => navigate("/")} text="Back" variant="secondary" />
            <AuthButton text="Create Account" type="submit" />
          </div>

          <p className="text-sm text-center text-gray-600">
            If you already have an account{" "}
            <a href="/login" className="text-green-600 hover:underline">login</a>
          </p>
        </form>
        </div>
         {loading && (
          <div className="overlay-fallback">
            <div className="w-20 h-20 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default RegisterForm;
