import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  className = "",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`py-2 px-4 rounded text-white font-medium transition-colors ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
