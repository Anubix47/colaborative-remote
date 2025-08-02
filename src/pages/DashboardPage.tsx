// src/pages/DashboardPage.tsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import Header from "../components/dashboard/Header";
import UserProfileCard from "../components/dashboard/UserProfileCard";
import ProjectBoard from "../components/dashboard/ProjectBoard";
import FileExplorer from "../components/dashboard/FileExplorer";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import StatsOverview from "../components/dashboard/StatsOverview";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import {
  ChatIcon,
  FileIcon,
  ProjectIcon,
  TaskIcon,
} from "../components/ui/Icons";

type UserProfile = {
  id: string;
  full_name?: string;
  avatar_url?: string;
};

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<
    "projects" | "tasks" | "files" | "chat"
  >("projects");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // handler de búsqueda (pendiente)
  const handleSearch = useCallback((query: string) => {
    setSearchText(query);
  }, []);

  // Cargar sesión y escuchar cambios de auth
  useEffect(() => {
    let ignore = false;

    const getInitialSessionAndUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session) {
        navigate("/login");
        return;
      }
      if (ignore) return;
      setSession(session);
      await fetchUserData(session.user.id);
    };

    getInitialSessionAndUser();

    // Escucha cambios (login/logout/refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          navigate("/login");
        } else {
          setSession(session);
          await fetchUserData(session.user.id);
        }
      }
    );

    return () => {
      ignore = true;
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    } else {
      setUserData(data as UserProfile);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar mobile: Mostrar arriba y ocultar scrollbar */}
      {/* En md+ sidebar fija a la izquierda */}
      <aside className="bg-white border-b border-gray-200 md:border-r md:border-b-0 md:w-64 flex-shrink-0 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between md:justify-center">
          <h1 className="text-xl font-bold text-indigo-600">TeamCollab</h1>
          {/* En mobile puedes agregar aquí un boton para toggle sidebar (opcional) */}
        </div>

        <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
          {[
            { id: "projects", label: "Proyectos", icon: <ProjectIcon /> },
            { id: "tasks", label: "Tareas", icon: <TaskIcon /> },
            { id: "files", label: "Archivos", icon: <FileIcon /> },
            { id: "chat", label: "Chat", icon: <ChatIcon /> },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as typeof activeView)}
              className={`flex items-center flex-shrink-0 md:flex-shrink md:w-full py-3 px-7 md:py-4 text-left whitespace-nowrap md:whitespace-normal ${
                activeView === id
                  ? "bg-indigo-50 text-indigo-600 border-r-4 md:border-r-0 md:border-l-4 md:border-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{icon}</span>{" "}
              <p className="hidden md:inline">{label}</p>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 mt-auto">
          <UserProfileCard user={userData} onLogout={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header user={userData} onSearch={handleSearch} />

        <section className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <StatsOverview />

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {activeView === "projects" && (
                  <ProjectBoard search={searchText} />
                )}
                {activeView === "tasks" && (
                  <ProjectBoard view="tasks" search={searchText} />
                )}
                {activeView === "files" && <FileExplorer />}
                {activeView === "chat" && (
                  <div>
                    {/* Aquí pon tu componente de chat integrado, si tienes uno */}
                    <div>Chat integrado (componente pendiente)</div>
                  </div>
                )}
              </div>

              <div className="space-y-8 mt-6 lg:mt-0">
                <ActivityTimeline />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
