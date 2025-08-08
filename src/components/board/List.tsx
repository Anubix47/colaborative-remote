// src/components/board/List.tsx
import { useState } from "react";
import AddCardForm from "./AddCardForm";
import { supabase } from "../../lib/supabase";

export interface Card {
  id: string;
  title: string;
  description: string;
  order: number;
  list_id: string;
}

interface ListType {
  id: string;
  name: string;
  order: number;
  cards: Card[];
}

interface Props {
  list: ListType;
  onUpdateName: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onCardClick: (card: { id: string; title: string }) => void;
  onNewCard: (card: Card) => void;
}

export default function List({
  list,
  onUpdateName,
  onDelete,
  onCardClick,
  onNewCard,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(list.name);
  const [showAddCard, setShowAddCard] = useState(false);

  const handleUpdate = async () => {
    if (!name.trim()) return;
    const { error } = await supabase
      .from("lists")
      .update({ name })
      .eq("id", list.id);

    if (error) {
      alert("Error al actualizar nombre");
    } else {
      onUpdateName(list.id, name);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Eliminar lista y todas sus tarjetas?")) {
      const { error } = await supabase.from("lists").delete().eq("id", list.id);

      if (error) {
        alert("Error al eliminar");
      } else {
        onDelete(list.id);
      }
    }
  };

  const handleAddCard = (newCard: Card) => {
    onNewCard(newCard);
    setShowAddCard(false);
  };

  return (
    <div className="flex-shrink-0 w-72 bg-gray-100 rounded-lg p-2 flex flex-col h-auto">
      {/* Encabezado de lista */}
      <div className="flex justify-between items-start mb-2">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleUpdate}
            onKeyUp={(e) => e.key === "Enter" && handleUpdate()}
            autoFocus
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="font-medium text-gray-800 text-sm p-1 flex-1 cursor-pointer hover:bg-gray-200 rounded"
          >
            {name}
          </h3>
        )}
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500 text-xs ml-1"
          aria-label="Eliminar lista"
        >
          ×
        </button>
      </div>

      {/* Tarjetas */}
      <div className="flex-1 min-h-0">
        {list.cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-3 rounded mb-2 shadow-sm cursor-pointer hover:shadow transition text-sm"
            onClick={() => onCardClick({ id: card.id, title: card.title })}
          >
            {card.title}
          </div>
        ))}
      </div>

      {/* Botón: Añadir tarjeta */}
      {showAddCard ? (
        <AddCardForm
          listId={list.id}
          onAddCard={handleAddCard}
          onCancel={() => setShowAddCard(false)}
        />
      ) : (
        <button
          onClick={() => setShowAddCard(true)}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          + Añadir tarjeta
        </button>
      )}
    </div>
  );
}
