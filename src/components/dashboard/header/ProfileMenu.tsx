/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiChevronDown, HiUser, HiCog, HiLogout } from "react-icons/hi";

interface ProfileMenuProps {
  user: any;
  profileMenuRef: any;
  isProfileMenuOpen: any;
  setIsProfileMenuOpen: any;
  navigate: any;
  handleLogout: any;
}

const ProfileMenu = ({
  user,
  profileMenuRef,
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  navigate,
  handleLogout,
}: ProfileMenuProps) => {
  return (
    <div className="relative" ref={profileMenuRef}>
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        aria-haspopup="true"
        aria-expanded={isProfileMenuOpen}
        type="button"
      >
        <div className="mr-3 text-right hidden md:block max-w-[120px] truncate">
          <p className="text-sm font-medium text-gray-900">
            {user?.full_name || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">{user?.role || "member"}</p>
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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => {
              navigate("/profile");
              setIsProfileMenuOpen(false);
            }}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            type="button"
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
            type="button"
          >
            <HiCog className="mr-2" />
            Configuración
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
            type="button"
          >
            <HiLogout className="mr-2" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
