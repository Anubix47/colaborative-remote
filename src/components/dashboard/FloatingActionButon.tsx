/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/dashboard/FloatingActionButton.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface Props {
  onCreate: (board: any) => void;
}

export default function FloatingActionButton({ onCreate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const createBoard = async () => {
    if (!name.trim()) return;
    setCreating(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newBoard = {
      name,
      user_id: user?.id,
      created_at: new Date().toISOString(),
      background: getRandomBackground(),
    };

    const { data, error } = await supabase
      .from("boards")
      .insert([newBoard])
      .select()
      .single();

    if (error) {
      alert("Error: " + error.message);
    } else {
      onCreate(data);
      setName("");
      setIsOpen(false);
    }
    setCreating(false);
  };

  const getRandomBackground = () => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-purple-600",
      "bg-gradient-to-br from-green-400 to-blue-500",
      "bg-gradient-to-br from-pink-500 to-orange-400",
      "bg-gradient-to-br from-teal-400 to-blue-500",
      "bg-gradient-to-br from-indigo-500 to-purple-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 active:scale-95 transition-transform focus:outline-none"
        aria-label="Crear nuevo tablero"
      >
        +
      </button>

      {/* Modal de creación */}
      {isOpen && (
        <div className="fixed inset-0  bg-gray-800  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xs p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Nuevo tablero
            </h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del tablero"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
              onKeyUp={(e) => e.key === "Enter" && createBoard()}
            />
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={createBoard}
                disabled={creating || !name.trim()}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
              >
                {creating ? "Creando..." : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
