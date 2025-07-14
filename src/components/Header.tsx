import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          Panel de Control
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <FaBell size={18} />
        </button>

        <button className="p-2 text-gray-500 hover:text-gray-700">
          <FaCog size={18} />
        </button>

        <button
          onClick={handleLogout}
          className="p-2 text-gray-500 hover:text-red-600"
          title="Cerrar sesión"
        >
          <FaSignOutAlt size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
