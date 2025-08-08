// src/components/dashboard/BoardCard.tsx
import { Link } from "react-router-dom";

interface Board {
  id: string;
  name: string;
  created_at: string;
  background?: string;
}

export default function BoardCard({ board }: { board: Board }) {
  //const bg = board.background || "bg-blue-200";

  return (
    <Link
      to={`/board/${board.id}`}
      className="block p-5 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow transition-shadow"
    >
      <div
        className={`w-full h-3 mb-3 rounded-full bg-green-500 shadow shadow-green-300 opacity-80`}
        aria-hidden="true"
      ></div>
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {board.name}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Creado el {new Date(board.created_at).toLocaleDateString("es-ES")}
      </p>
    </Link>
  );
}
