import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { GitHubIcon, GoogleIcon } from "../ui/Icons";
import { HiMail, HiLockClosed } from "react-icons/hi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: "google" | "github") => {
    setLoading(true);
    setError("");

    supabase.auth
      .signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      })
      .catch((err) => {
        setError(`Error con ${provider}: ${err.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-pink-50 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Iniciar Sesión</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <Input
          id="email"
          label="Correo electrónico"
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

        <Button
          type="submit"
          loading={loading}
          className="w-full py-2 bg-emerald-400 text-white  hover:bg-emerald-700 "
        >
          Iniciar sesión
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-pink-50 text-gray-500 text-sm">
              O continúa con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleOAuthLogin("google")}
            loading={loading}
            className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
          >
            <GoogleIcon />
            Google
          </Button>

          <Button
            onClick={() => handleOAuthLogin("github")}
            loading={loading}
            className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
          >
            <GitHubIcon />
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <a href="/signup" className="text-emerald-700 hover:underline">
          Regístrate
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
