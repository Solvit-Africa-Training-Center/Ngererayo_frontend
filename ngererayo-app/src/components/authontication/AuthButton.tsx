import React from "react";

interface AuthButtonProps {
  text: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  type = "button",
  variant = "primary",
  onClick,
}) => {
  const base =
    "w-full py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100";

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles}`}>
      {text}
    </button>
  );
};

export default AuthButton;
