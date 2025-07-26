import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSession } from "./hooks/useSession";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AuthCallback from "./pages/AuthCallback";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import ChatPage from "./pages/ChatPage";

function App() {
  const { session, loading } = useSession();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            session ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={session ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        <Route
          path="/signup"
          element={session ? <Navigate to={"/dashboard"} /> : <SignupPage />}
        ></Route>

        <Route
          path="/dashboard"
          element={session ? <DashboardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={session ? <ChatPage /> : <Navigate to="/login" />}
        ></Route>

        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
