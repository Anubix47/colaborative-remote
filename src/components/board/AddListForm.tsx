/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/board/AddListForm.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface ListType {
  id: string;
  name: string;
  order: number;
  board_id: string;
  cards: any[];
}

interface Props {
  boardId: string;
  onAddList: (list: ListType) => void;
}

export default function AddListForm({ boardId, onAddList }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("lists")
      .insert({
        name,
        board_id: boardId,
        order: 0,
      })
      .select()
      .single();

    if (error) {
      alert("Error al crear lista");
    } else {
      onAddList({
        ...data,
        cards: [],
      });
      setName("");
      setIsAdding(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex-shrink-0 w-72">
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full text-sm text-gray-500 hover:text-gray-700 border-2 border-dashed border-gray-300 rounded-lg p-4 text-left hover:border-gray-400 transition"
        >
          + Añadir lista
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg p-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la lista"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? "Guardando..." : "Añadir"}
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-gray-500 text-sm px-4 py-1 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
