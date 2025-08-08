/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/dashboard/EmptyState.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface Props {
  onBoardCreated: (board: any) => void;
}

export default function EmptyState({ onBoardCreated }: Props) {
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const createFirstBoard = async () => {
    if (!name.trim()) return;
    setCreating(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newBoard = {
      name,
      user_id: user.id,
      created_at: new Date().toISOString(),
      background: "bg-gradient-to-br from-green-400 to-blue-500",
    };

    const { data, error } = await supabase
      .from("boards")
      .insert([newBoard])
      .select()
      .single();

    if (error) {
      alert("Error al crear el tablero");
    } else {
      onBoardCreated(data);
    }
    setCreating(false);
  };

  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">📋</span>
      </div>
      <h2 className="text-lg font-medium text-gray-700">
        Aún no tienes tableros
      </h2>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Crea tu primer tablero para comenzar
      </p>

      <div className="max-w-xs mx-auto space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del tablero"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          onKeyPress={(e) => e.key === "Enter" && createFirstBoard()}
        />
        <button
          onClick={createFirstBoard}
          disabled={creating || !name.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-70 active:scale-98 transition-transform"
        >
          {creating ? "Creando..." : "Crear primer tablero"}
        </button>
      </div>
    </div>
  );
}
