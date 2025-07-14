import LoginForm from "../components/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">TeamCollab</h1>
          <p className="mt-2 text-gray-600">Colaboración remota para equipos</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
