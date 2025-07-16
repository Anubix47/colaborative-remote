import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");
    const error = searchParams.get("error");
    const handleAuth = async () => {
      console.log(token);
      console.log(type);
      console.log(error);

      try {
        // 1. Manejar errores de OAuth
        if (error) {
          throw new Error(error || "Error de autenticación");
        }

        // 2. Verificar registro por email
        if (type === "signup" && token) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "signup",
          });

          if (verifyError) throw verifyError;
        }

        // 3. Obtener sesión actualizada
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        // 4. Redirigir según sesión
        if (session) {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error en callback:", err);
        navigate(`/login?error=${encodeURIComponent(err.message)}`);
      }
    };

    handleAuth();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Completando autenticación...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
