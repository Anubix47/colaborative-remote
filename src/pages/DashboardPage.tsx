// src/pages/DashboardPage.tsx
import { useState, useEffect } from "react";
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

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<
    "projects" | "tasks" | "files" | "chat"
  >("projects");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        navigate("/login");
        return;
      }

      if (!session) {
        navigate("/login");
        return;
      }

      setSession(session);
      fetchUserData(session.user.id);
    };

    fetchSession();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setUserData(data);
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">TeamCollab</h1>
        </div>

        <nav className="flex-1 py-4">
          <button
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeView === "projects"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveView("projects")}
          >
            <ProjectIcon />
            Proyectos
          </button>

          <button
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeView === "tasks"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveView("tasks")}
          >
            <TaskIcon />
            Tareas
          </button>

          <button
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeView === "files"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveView("files")}
          >
            <FileIcon />
            Archivos
          </button>
          <button
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeView === "chat"
                ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => navigate("/chat")}
          >
            <ChatIcon />
            Chat
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <UserProfileCard user={userData} onLogout={handleLogout} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={userData} />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <StatsOverview />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {activeView === "projects" && <ProjectBoard />}
                {activeView === "tasks" && <ProjectBoard view="tasks" />}
                {activeView === "files" && <FileExplorer />}
              </div>

              <div className="space-y-8">
                <ActivityTimeline />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
