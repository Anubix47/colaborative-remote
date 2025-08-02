import { HiLogout } from "react-icons/hi";
import type { UserProfile } from "../interfaces/userInterface";

interface UserProfileCardProps {
  user: UserProfile;
  onLogout: () => void;
}

const UserProfileCard = ({ user, onLogout }: UserProfileCardProps) => {
  return (
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="h-12 w-12 rounded-full"
          />
        ) : (
          <span className="text-indigo-600 font-medium text-lg">
            {user?.full_name?.charAt(0) || "U"}
          </span>
        )}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user?.full_name || "Usuario"}
        </p>
      </div>

      <button
        onClick={onLogout}
        className="ml-2 p-2 text-gray-500 hover:text-gray-700"
        title="Cerrar sesión"
      >
        <HiLogout className="h-5 w-5" />
      </button>
    </div>
  );
};

export default UserProfileCard;
