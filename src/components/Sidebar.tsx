import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTasks,
  FaComments,
  FaFileAlt,
  FaUser,
  FaChartBar,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const navItems = [
    { path: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
    { path: "/tasks", icon: <FaTasks />, label: "Tareas" },
    { path: "/messages", icon: <FaComments />, label: "Mensajes" },
    { path: "/files", icon: <FaFileAlt />, label: "Archivos" },
    { path: "/profile", icon: <FaUser />, label: "Perfil" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">TeamCollab</h1>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : ""
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
