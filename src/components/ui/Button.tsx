import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  className = "",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center rounded-2xl transition-colors ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
