import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SignInForm } from "./components/auth/SignInForm";
import { SignUpForm } from "./components/auth/SignUpForm";
import { ResetPasswordForm } from "./components/auth/ResetPasswordForm";
import { AuthLayout } from "./components/auth/AuthLayout";
import type { JSX } from "react";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (!session) return <Navigate to="/signin" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/signin"
            element={
              <AuthLayout>
                <SignInForm />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUpForm />
              </AuthLayout>
            }
          />
          <Route
            path="/reset"
            element={
              <AuthLayout>
                <ResetPasswordForm />
              </AuthLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
