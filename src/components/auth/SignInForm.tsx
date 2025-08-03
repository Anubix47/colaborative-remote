/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/auth/SignInForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../hooks/useSupabase";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error, data } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Iniciar sesión
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Campo Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Correo
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          placeholder="tu@correo.com"
        />
      </div>

      {/* Campo Contraseña */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          placeholder="••••••••"
        />
      </div>

      {/* Botón de acceso */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-base hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed active:scale-98 transition-transform"
      >
        {loading ? "Cargando..." : "Ingresar"}
      </button>

      {/* Enlaces secundarios */}
      <div className="text-center space-y-3 text-sm pt-2 border-t border-gray-100">
        <p>
          ¿No tienes cuenta?{" "}
          <a
            href="/signup"
            className="text-blue-600 text-sm hover:underline font-medium"
          >
            Regístrate
          </a>
        </p>
        <p>
          <a href="/reset" className="text-gray-500 text-sm hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </form>
  );
};
