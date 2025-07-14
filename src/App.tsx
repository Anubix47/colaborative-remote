import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, type ReactElement } from "react";
import { supabase } from "./lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import AuthCallback from "./pages/AuthCallback";

//Componentes de paginas
import LoginPage from "./pages/LoginPage";

//Componentes Layout
import MainLayout from "./layouts/MainLayout";
import LoadingSpinner from "./components/auth/ui/LoadingSpinner";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Verificar sesion cargada
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (e, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  //Proteger rutas
  const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    return session ? children : <Navigate to="/login" />;
  };

  //Redirigir si ya esta autenticado
  const AuthRoute = ({ children }: { children: ReactElement }) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    return !session ? children : <Navigate to="/dashboard" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/auth/callback"
          element={
            <AuthRoute>
              <AuthCallback />
            </AuthRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
