import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import useClickOutside from "../../hooks/useClickOutside";
import type { UserProfile } from "../interfaces/userInterface";
import NewMenu from "./header/NewMenu";
import ProfileMenu from "./header/ProfileMenu";
import Notifications from "./header/Notifications";
import SearchBar from "./header/SearchBar";

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

  //Notificaciones
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

  //Notificaciones
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

  //Busqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleSearchDelete = () => {
    setSearchTerm("");
    onSearch("");
  };

  //Desautenticar
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Búsqueda */}
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSearchDelete={handleSearchDelete}
        />

        {/* Botones y menús */}
        <div className="flex items-center justify-end space-x-3 sm:space-x-4">
          {/* Notificaciones */}
          <Notifications
            notificationsRef={notificationsRef}
            notifications={notifications}
            isNotificationsOpen={isNotificationsOpen}
            setIsNotificationsOpen={setIsNotificationsOpen}
            markAsRead={markAsRead}
            unreadCount={unreadCount}
            navigate={navigate}
          />

          {/* Menú Nuevo */}
          <NewMenu
            newMenuRef={newMenuRef}
            isNewMenuOpen={isNewMenuOpen}
            setIsNewMenuOpen={setIsNewMenuOpen}
            navigate={navigate}
          />

          {/* Perfil de usuario */}
          <ProfileMenu
            user={user}
            profileMenuRef={profileMenuRef}
            isProfileMenuOpen={isProfileMenuOpen}
            setIsProfileMenuOpen={setIsProfileMenuOpen}
            navigate={navigate}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
