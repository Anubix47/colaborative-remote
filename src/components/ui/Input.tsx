import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      labelClassName = "block mb-1 text-sm font-medium text-gray-700",
      containerClassName = "mb-4",
      error,
      icon,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        {/* Etiqueta condicional */}
        {label && (
          <label htmlFor={id} className={labelClassName}>
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {/* Icono opcional */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {/* Campo de entrada */}
          <input
            ref={ref}
            id={id}
            className={`w-full px-10 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              props.disabled ? "bg-gray-100 cursor-not-allowed" : ""
            } ${className}`}
            {...props}
          />
        </div>

        {/* Mensaje de error */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
