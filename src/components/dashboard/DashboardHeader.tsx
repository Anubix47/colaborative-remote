// src/components/dashboard/DashboardHeader.tsx
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardHeader() {
  const { session, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;
  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "Usuario";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 fixed top-0 right-0 left-0 z-30">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <h1 className="text-lg font-semibold text-gray-800">Boardly</h1>

        <div className="relative">
          {/* Botón de perfil */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition"
            aria-label="Menú de usuario"
          >
            <span className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center text-sm font-medium rounded-full">
              {displayName.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {displayName}
            </span>
          </button>

          {/* Menú desplegable */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-40"
              onBlur={() => setDropdownOpen(false)}
            >
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={signOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
