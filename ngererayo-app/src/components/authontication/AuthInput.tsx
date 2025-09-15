import React from "react";

interface AuthInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightIcon,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-green-500">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 outline-none text-sm bg-transparent"
        />
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </div>
  );
};

export default AuthInput;
