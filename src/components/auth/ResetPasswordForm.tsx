/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/auth/ResetPasswordForm.tsx
import { useState } from "react";
import { resetPassword } from "../../hooks/useSupabase";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error }: any = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Revisa tu correo para restablecer la contraseña.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Restablecer contraseña
      </h2>

      <p className="text-sm text-gray-500 text-center">
        Ingresa tu correo y te enviaremos un enlace para recuperar tu cuenta.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-600 text-sm p-3 rounded-lg">
          {message}
        </div>
      )}
      {/* Campo Email */}
      <div className="space-y-2">
        <label
          htmlFor="reset-email"
          className="block text-sm font-medium text-gray-600"
        >
          Correo electrónico
        </label>
        <input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          placeholder="tu@correo.com"
        />
      </div>
      {/* Botón de envío */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium text-base active:scale-98 hover:bg-yellow-600 disabled:opacity-70 transition-transform"
      >
        {loading ? "Enviando..." : "Enviar enlace"}
      </button>

      {/* Volver al login */}
      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          <a
            href="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            ← Volver al inicio de sesión
          </a>
        </p>
      </div>
    </form>
  );
};
