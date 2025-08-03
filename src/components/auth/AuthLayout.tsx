// src/components/auth/AuthLayout.tsx
import type { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col px-4 py-8">
      {/* Logo y encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Boardly</h1>
        <p className="text-sm text-gray-500 mt-1">
          Tu espacio de trabajo en equipo
        </p>
      </div>

      {/* Contenedor principal – adaptado a móvil */}
      <div className="w-full max-w-xs mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">{children}</div>
      </div>

      {/* Footer opcional */}
      <p className="text-center text-xs text-gray-400 mt-8">
        © 2025 Boardly. Todo en un solo lugar.
      </p>
    </div>
  );
};
