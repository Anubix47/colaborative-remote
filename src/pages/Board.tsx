/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/Board.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";
import List from "../components/board/List";
import AddListForm from "../components/board/AddListForm";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CardModal from "../components/board/CardModal";

interface Card {
  id: string;
  title: string;
  description: string;
  list_id: string;
  order: number;
}

interface ListType {
  id: string;
  name: string;
  order: number;
  cards: Card[];
}

interface SelectedCard {
  id: string;
  title: string;
}

export default function Board() {
  const { id } = useParams<{ id: string }>();
  const { session } = useAuth();
  const [boardName, setBoardName] = useState("Cargando...");
  const [lists, setLists] = useState<ListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  useEffect(() => {
    if (id && session?.user) {
      fetchBoardData();
    }
  }, [id, session]);

  const fetchBoardData = async () => {
    setLoading(true);

    // Obtener nombre del tablero
    const { data: boardData, error: boardError } = await supabase
      .from("boards")
      .select("name")
      .eq("id", id)
      .single();

    if (boardError) {
      console.error("Error al cargar tablero:", boardError);
      setBoardName("Tablero no encontrado");
    } else {
      setBoardName(boardData.name);
    }

    // Obtener listas
    const { data: listsData, error: listsError } = await supabase
      .from("lists")
      .select("*")
      .eq("board_id", id)
      .order("order");

    if (listsError) {
      console.error("Error al cargar listas:", listsError);
    } else {
      const listsWithCards = await Promise.all(
        listsData.map(async (list) => {
          const { data: cards } = await supabase
            .from("cards")
            .select("id, title, order")
            .eq("list_id", list.id)
            .order("order");
          return { ...list, cards: cards || [] };
        })
      );
      setLists(listsWithCards);
    }

    setLoading(false);
  };

  const addList = (newList: ListType) => {
    setLists([...lists, newList]);
  };

  const updateListName = (listId: string, newName: string) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, name: newName } : list
      )
    );
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter((list) => list.id !== listId));
  };

  const handleCardClick = (card: SelectedCard) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    fetchBoardData();
  };

  const addCardToList = (newCard: {
    id: string;
    title: string;
    list_id: string;
    order: number;
  }) => {
    console.log("Hola😊");
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === newCard.list_id
          ? {
              ...list,
              cards: [
                {
                  id: newCard.id,
                  title: newCard.title,
                  order: newCard.order,
                } as Card,
                ...list.cards,
              ],
            }
          : list
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span>Cargando tablero...</span>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />
      <main className="min-h-screen bg-gray-50 pt-16 pb-20">
        <div className="px-2 py-4 max-w-screen-lg mx-auto">
          {/* Nombre del tablero */}
          <h1 className="text-xl font-bold text-gray-800 mb-6 px-2">
            {boardName}
          </h1>

          {/* Contenedor de listas (scroll horizontal en móvil) */}
          <div className="flex space-x-4 pb-4 overflow-x-auto hide-scrollbar">
            {lists.map((list) => (
              <List
                key={list.id}
                list={list}
                onUpdateName={updateListName}
                onDelete={deleteList}
                onCardClick={handleCardClick}
                onNewCard={addCardToList}
              />
            ))}

            {/* Formulario para añadir nueva lista */}
            <AddListForm boardId={id!} onAddList={addList} />
          </div>
        </div>
        {/* ✅ CardModal centralizado en el Board */}
        {selectedCard && (
          <CardModal
            cardId={selectedCard.id}
            isOpen={true}
            onClose={handleCloseModal}
            initialTitle={selectedCard.title}
          />
        )}
      </main>
    </>
  );
}
