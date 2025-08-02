/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiPlus, HiChevronDown } from "react-icons/hi";

interface NewMenuProps {
  newMenuRef: any;
  isNewMenuOpen: any;
  setIsNewMenuOpen: any;
  navigate: any;
}

const NewMenu = ({
  newMenuRef,
  isNewMenuOpen,
  setIsNewMenuOpen,
  navigate,
}: NewMenuProps) => {
  return (
    <div className="relative" ref={newMenuRef}>
      <button
        onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
        className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isNewMenuOpen}
        type="button"
      >
        <HiPlus className="mr-1" />
        <span className="hidden sm:inline">Nuevo</span>
        <HiChevronDown className="ml-1" />
      </button>

      {isNewMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5"
          style={{
            maxWidth: "90vw",
            top: "calc(100% + 0.5rem)",
            right: 0,
            left: "auto",
          }}
        >
          <button
            onClick={() => {
              navigate("/projects/new");
              setIsNewMenuOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            type="button"
          >
            Nuevo Proyecto
          </button>
          <button
            onClick={() => {
              navigate("/tasks/new");
              setIsNewMenuOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            type="button"
          >
            Nueva Tarea
          </button>
          <button
            onClick={() => {
              navigate("/teams/new");
              setIsNewMenuOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            type="button"
          >
            Nuevo Equipo
          </button>
        </div>
      )}
    </div>
  );
};

export default NewMenu;
