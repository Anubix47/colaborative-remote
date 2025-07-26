// src/components/dashboard/Header.tsx
import { HiBell, HiSearch, HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar proyectos, tareas, archivos..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="ml-4 flex items-center space-x-4">
          <button className="p-1 text-gray-500 hover:text-gray-700 relative">
            <HiBell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <HiPlus className="mr-1" />
            Nuevo
          </button>

          <div className="flex items-center">
            <div className="mr-3 text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.full_name || "Usuario"}
              </p>
              <p className="text-xs text-gray-500">{user?.role || "Miembro"}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <span className="text-gray-600 font-medium">
                  {user?.full_name?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
