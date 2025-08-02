/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiX, HiSearch } from "react-icons/hi";

interface SearchBarProps {
  searchTerm: any;
  handleSearch: any;
  handleSearchDelete: any;
}

const SearchBar = ({
  searchTerm,
  handleSearch,
  handleSearchDelete,
}: SearchBarProps) => {
  return (
    <div className="flex-1 max-w-full sm:max-w-md relative">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar proyectos, tareas, archivos..."
          className="block w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          value={searchTerm}
          onChange={handleSearch}
          aria-label="Buscar"
        />
        {searchTerm !== "" && (
          <button
            type="button"
            onClick={handleSearchDelete}
            className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Borrar búsqueda"
          >
            <HiX className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
