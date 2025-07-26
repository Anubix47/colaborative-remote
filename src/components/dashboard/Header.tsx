import React, { useState, useRef, useEffect } from "react";
import {
  HiBell,
  HiSearch,
  HiPlus,
  HiChevronDown,
  HiUser,
  HiCog,
  HiLogout,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import useClickOutside from "../../hooks/useClickOutside";
import type { UserProfile } from "../interfaces/userInterface";

interface HeaderProps {
  user: UserProfile;
  onSearch: (term: string) => void;
}

const Header = ({ user, onSearch }: HeaderProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const newMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useClickOutside(newMenuRef, () => setIsNewMenuOpen(false));
  useClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));
  useClickOutside(notificationsRef, () => setIsNotificationsOpen(false));

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) {
        throw error;
      }

      if (data) {
        setNotifications(data);

        const unread = data.filter((notification) => !notification.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", id);
      if (error) throw error;
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
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
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="ml-4 flex items-center space-x-4">
          {/* Notificaciones */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-1 text-gray-500 hover:text-gray-700 relative"
            >
              <HiBell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {/* Menú de notificaciones */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b">
                  <h3 className="text-lg font-medium text-gray-900">
                    Notificaciones
                  </h3>
                </div>

                {notifications.length === 0 ? (
                  <p className="px-4 py-2 text-sm text-gray-500">
                    No hay notificaciones
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-2 text-sm ${
                        notification.read
                          ? "text-gray-600"
                          : "text-gray-900 bg-blue-50"
                      }`}
                    >
                      <p>{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-indigo-600 mt-1"
                        >
                          Marcar como leído
                        </button>
                      )}
                    </div>
                  ))
                )}

                <div className="border-t px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      navigate("/notifications");
                      setIsNotificationsOpen(false);
                    }}
                    className="text-indigo-600 text-sm"
                  >
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menú Nuevo */}
          <div className="relative" ref={newMenuRef}>
            <button
              onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <HiPlus className="mr-1" />
              Nuevo
              <HiChevronDown className="ml-1" />
            </button>

            {isNewMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    navigate("/projects/new");
                    setIsNewMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Nuevo Proyecto
                </button>
                <button
                  onClick={() => {
                    navigate("/tasks/new");
                    setIsNewMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Nueva Tarea
                </button>
                <button
                  onClick={() => {
                    navigate("/teams/new");
                    setIsNewMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Nuevo Equipo
                </button>
              </div>
            )}
          </div>

          {/* Perfil de usuario */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="mr-3 text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                  {user?.full_name || "Usuario"}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                  {user?.role || "Miembro"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {user?.full_name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <HiChevronDown className="ml-1 h-5 w-5 text-gray-500" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <HiUser className="mr-2" />
                  Perfil
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <HiCog className="mr-2" />
                  Configuración
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <HiLogout className="mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
