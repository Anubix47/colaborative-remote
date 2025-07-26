import {
  HiOutlineDocumentDownload,
  HiOutlineFolder,
  HiOutlineDocumentText,
  HiOutlinePhotograph,
  HiOutlineDocument,
} from "react-icons/hi";
import { useState } from "react";

const FileExplorer = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Documento de requerimientos.pdf",
      type: "pdf",
      size: "2.4 MB",
      date: "2023-06-10",
    },
    {
      id: 2,
      name: "Diseño de interfaz.fig",
      type: "design",
      size: "5.7 MB",
      date: "2023-06-12",
    },
    {
      id: 3,
      name: "Capturas de pantalla",
      type: "folder",
      size: "8.2 MB",
      date: "2023-06-15",
    },
    {
      id: 4,
      name: "Presentación final.pptx",
      type: "presentation",
      size: "3.1 MB",
      date: "2023-06-18",
    },
    {
      id: 5,
      name: "Informe de progreso.docx",
      type: "document",
      size: "1.2 MB",
      date: "2023-06-20",
    },
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <HiOutlineDocumentText className="h-6 w-6 text-red-500" />;
      case "folder":
        return <HiOutlineFolder className="h-6 w-6 text-yellow-500" />;
      case "design":
        return <HiOutlinePhotograph className="h-6 w-6 text-purple-500" />;
      case "document":
        return <HiOutlineDocument className="h-6 w-6 text-blue-500" />;
      default:
        return <HiOutlineDocument className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Archivos del Proyecto
        </h2>
        <button className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
          <HiOutlineDocumentDownload className="mr-1" />
          Subir archivo
        </button>
      </div>

      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-shrink-0 mr-4">{getFileIcon(file.type)}</div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 truncate">{file.name}</p>
              <div className="flex text-sm text-gray-500">
                <span className="mr-3">{file.size}</span>
                <span>{file.date}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <HiOutlineDocumentDownload className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
