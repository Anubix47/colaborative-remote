// src/components/board/AddCardForm.tsx
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Card } from "./List";

interface Props {
  listId: string;
  onAddCard: (newCard: Card) => void;
  onCancel: () => void;
}

export default function AddCardForm({ listId, onAddCard, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("cards")
      .insert({
        title,
        list_id: listId,
        order: 0,
      })
      .select()
      .single();

    if (error) {
      alert("Error al crear tarjeta");
      setLoading(false);
    } else {
      onAddCard({ ...data });
      setTitle("");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarjeta"
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={3}
        autoFocus
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
          onClick={onCancel}
          className="text-gray-500 text-sm px-4 py-1 rounded hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
