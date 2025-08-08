import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import BoardCard from "../components/dashboard/BoardCard";
import EmptyState from "../components/dashboard/EmptyState";
import FloatingActionButon from "../components/dashboard/FloatingActionButon";
import DashboardHeader from "../components/dashboard/DashboardHeader";

interface Board {
  id: string;
  name: string;
  created_at: string;
  user_id: string;
  background?: string;
}

export default function Dashboard() {
  const { session } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBoards(session.user.id);
    }
  }, [session]);

  const fetchBoards = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al cargar tableros:", error);
    } else {
      setBoards(data || []);
    }
    setLoading(false);
  };

  const handleNewBoard = (newBoard: Board) => {
    setBoards([newBoard, ...boards]);
  };

  if (!session) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Cargando tableros...</span>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-gray-50 pb-20 pt-16">
        <div className="px-4 py-6 max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Tus tableros</h1>

          {boards.length === 0 ? (
            <EmptyState onBoardCreated={handleNewBoard} />
          ) : (
            <div className="grid gap-4">
              {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          )}
        </div>

        <FloatingActionButon onCreate={handleNewBoard} />
      </main>
    </>
  );
}
