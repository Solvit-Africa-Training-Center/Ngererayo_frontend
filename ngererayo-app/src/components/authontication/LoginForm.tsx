import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./AuthHeader";
import Footer from "../landingpage/Footer";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { api } from "../../utilis/api";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/accounts/login/", { email, password });
      sessionStorage.setItem("token", res.data.access);
      navigate("/buyer");
    } catch (err: any) {
      setError(err.response?.data?.detail || t("invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Header />
      <div
        className="relative bg-cover bg-center text-white py-25 min-h-screen"
        style={{ backgroundImage: `url('/loginBg.jpg')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-yellow-900 opacity-80"></div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="py-15">
            <form
              onSubmit={handleLogin}
              className="max-w-md mx-auto bg-white rounded-xl border border-green-600 p-6 shadow space-y-6"
            >
              <h2 className="text-2xl text-black font-bold text-center">
                {t("loginTitle")}
              </h2>
              <p className="text-sm text-gray-500 text-center">
                {t("loginSubtitle")}
              </p>

              <AuthButton text={t("continueWithGoogle")} variant="secondary" />

              <div className="relative text-center text-sm text-gray-400">
                <span className="absolute left-0 top-1/2 h-px w-full bg-gray-200"></span>
                <span className="relative bg-white px-2">{t("orLogin")}</span>
              </div>

              <AuthInput
                placeholder={t("emailPlaceholder")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <AuthInput
                placeholder={t("passwordPlaceholder")}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-black">
                  <input type="checkbox" className="h-4 w-4 " />{" "}
                  {t("rememberMe")}
                </label>
                <a href="#" className="text-green-600 hover:underline">
                  {t("forgotPassword")}
                </a>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <AuthButton text={t("loginButton")} type="submit" />

              <p className="text-sm text-center text-gray-600">
                {t("noAccount")}{" "}
                <a href="/register" className="text-green-600 hover:underline">
                  {t("createAccount")}
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="overlay-fallback">
            <div className="w-20 h-20 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
