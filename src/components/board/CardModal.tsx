/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
//import { useAuth } from "../../contexts/AuthContext";

interface Comment {
  id: string;
  content: string;
  user_email: string;
  created_at: string;
}

interface CheckListItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Props {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
  initialTitle: string;
}

export default function CardModal({
  cardId,
  isOpen,
  onClose,
  initialTitle,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [checklist, setChecklist] = useState<CheckListItem[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchCardData();
      setupRealtime();
    }
  }, [isOpen, cardId]);

  const fetchCardData = async () => {
    setLoading(true);

    const { data: card } = await supabase
      .from("cards")
      .select("title, description")
      .eq("id", cardId)
      .single();

    if (card) {
      setTitle(card.title);
      setDescription(card.description || "");
    }

    const { data: checklistData, error: checklistError } = await supabase
      .from("checklist_items")
      .select("id, text, checked")
      .eq("card_id", cardId)
      .order("created_at");

    if (checklistError) {
      console.error(checklistError);
    } else {
      setChecklist(checklistData || []);
      console.log("CHECKLIST\n", checklistData);
    }

    const { data: commentsData, error: commentsError } = await supabase
      .from("comments")
      .select("id, content, user_email, created_at")
      .eq("card_id", cardId)
      .order("created_at", { ascending: true });

    if (commentsError) {
      console.error(commentsError);
    } else {
      setComments(commentsData || []);
    }

    setLoading(false);
  };

  const setupRealtime = () => {
    const channel = supabase
      .channel(`card-${cardId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `card_id=eq.${cardId}`,
        },
        (payload) => {
          setComments((prev) => [payload.new as Comment, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "checklist_items",
          filter: `card_id=eq.${cardId}`,
        },
        (payload) => {
          setChecklist((prev) => [...prev, payload.new as CheckListItem]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const saveCard = async () => {
    const { error } = await supabase
      .from("cards")
      .update({ title, description })
      .eq("id", cardId);

    if (error) console.error("Error al guardar tarjeta:", error);
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    const { user } = (await supabase.auth.getUser()).data;

    const comment = {
      card_id: cardId,
      content: newComment,
      user_email: user?.email || "usuario@anonimo.com",
    };

    const { error } = await supabase.from("comments").insert([comment]);

    if (!error) {
      setComments([comment as unknown as Comment, ...comments]);
      setNewComment("");
    }
  };

  const addChecklistItem = async () => {
    if (!newChecklistItem.trim()) return;

    const item = {
      card_id: cardId,
      text: newChecklistItem,
      checked: false,
    };

    const { data, error } = await supabase
      .from("checklist_items")
      .insert([item])
      .select()
      .single();

    if (!error && data) {
      setChecklist([...checklist, data]);
      setNewChecklistItem("");
    }
  };

  const toggleChecklistItem = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("checklist_items")
      .update({ checked: !current })
      .eq("id", id);

    if (!error) {
      setChecklist(
        checklist.map((item) =>
          item.id === id ? { ...item, checked: !current } : item
        )
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center p-4 z-50">
      <div className=" bg-white rounded-xl shadow-xl w-lg max-w-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">Tarjeta</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {loading ? (
            <p className="text-gray-500">Cargando...</p>
          ) : (
            <>
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={saveCard}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                  placeholder="Título de la tarjeta"
                />
              </div>
              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={saveCard}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                  rows={3}
                  placeholder="Agrega una descripción detallada..."
                />
              </div>
              {/* Checklist */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Checklist
                </h3>
                <ul className="space-y-1 mb-2">
                  {checklist.map((item) => (
                    <li key={item.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() =>
                          toggleChecklistItem(item.id, item.checked)
                        }
                        className="w-4 h-4"
                      />
                      <span
                        className={`text-sm ${
                          item.checked
                            ? "text-gray-400 line-through"
                            : "text-gray-700"
                        }`}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex space-x-1">
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && addChecklistItem()}
                    placeholder="Nuevo item"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none"
                  />
                  <button
                    onClick={addChecklistItem}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Comentarios */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Comentarios
                </h3>
                <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
                  {comments.length === 0 ? (
                    <p className="text-sm text-gray-400">Sin comentarios</p>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-2 rounded text-sm"
                      >
                        <p className="text-gray-800">{comment.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {comment.user_email} •{" "}
                          {new Date(comment.created_at).toLocaleString("es-ES")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex space-x-1 mt-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && addComment()}
                    placeholder="Añadir un comentario"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none"
                  />
                  <button
                    onClick={addComment}
                    className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Footer (opcional) */}
        <div className="border-t border-gray-200 px-4 py-3 text-right">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm hover:bg-gray-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
