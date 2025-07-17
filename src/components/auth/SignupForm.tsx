import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { GoogleIcon, GitHubIcon } from "../ui/Icons";
import { HiMail, HiLockClosed, HiUser } from "react-icons/hi";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validación básica
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },

          emailRedirectTo: window.location.origin + "/auth/callback",
        },
      });

      console.log(data, error);

      if (error?.message.includes("already registered")) {
        setError("Este email ya está registrado");
      }

      if (error) {
        throw error;
      }

      if (data.user?.confirmation_sent_at) {
        alert("¡Email de confirmación enviado! Revisa tu bandeja de entrada");
        navigate("/login");
      } else {
        throw new Error("No se pudo enviar el email de confirmación");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Error al registrarse ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-pink-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Crear Cuenta</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="fullname"
          label="Full name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Tu nombre completo"
          required
          autoComplete="Tu nombre completo"
          autoCapitalize="words"
          icon={<HiUser className="w-5 h-5 fill-gray-600" />}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          autoComplete="email"
          icon={<HiMail className="w-5 h-5 fill-gray-600" />}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          required
          autoComplete="password"
          icon={<HiLockClosed className="w-5 h-5 fill-gray-600" />}
        />

        <Input
          id="confirmPassword"
          label="Confrim password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••"
          required
          autoComplete="Confrim Password"
          icon={<HiLockClosed className="w-5 h-5 fill-gray-600" />}
        />

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            Acepto los{" "}
            <a href="#" className="text-emerald-700 hover:underline">
              Términos y Condiciones
            </a>
          </label>
        </div>

        <Button
          type="submit"
          loading={loading}
          onClick={() => handleSubmit}
          className="w-full py-2 bg-emerald-400 text-white  hover:bg-emerald-700"
        >
          Registrarse
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-pink-50 text-gray-500 text-sm">
              O regístrate con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: window.location.origin + "/auth/callback",
                },
              })
            }
            className="flex items-center justify-center gap-2 py-2  border border-gray-300 rounded-r-md hover:bg-gray-50"
          >
            <GoogleIcon />
            Google
          </Button>

          <Button
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                  redirectTo: window.location.origin + "/auth/callback",
                },
              })
            }
            className="flex items-center justify-center gap-2 py-2  border border-gray-300 rounded-l-md hover:bg-gray-50"
          >
            <GitHubIcon />
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-emerald-700 hover:underline">
          Inicia sesión
        </a>
      </div>
    </div>
  );
};

export default SignupForm;
