import { useState } from "react";
import { HiPlus, HiDotsVertical } from "react-icons/hi";

interface ProjectBoardProps {
  view?: "projects" | "tasks";
}

const ProjectBoard = ({ view = "projects" }: ProjectBoardProps) => {
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "Por hacer",
      tasks: [
        {
          id: 1,
          title: "Diseñar nueva interfaz",
          assignee: "Ana L",
          dueDate: "2023-06-15",
        },
        {
          id: 2,
          title: "Revisar documentación API",
          assignee: "Carlos M",
          dueDate: "2023-06-18",
        },
      ],
    },
    {
      id: 2,
      title: "En progreso",
      tasks: [
        {
          id: 3,
          title: "Implementar autenticación",
          assignee: "Juan P",
          dueDate: "2023-06-20",
        },
        {
          id: 4,
          title: "Crear componente dashboard",
          assignee: "María G",
          dueDate: "2023-06-22",
        },
      ],
    },
    {
      id: 3,
      title: "Revisión",
      tasks: [
        {
          id: 5,
          title: "Pruebas de integración",
          assignee: "Luis R",
          dueDate: "2023-06-25",
        },
      ],
    },
    {
      id: 4,
      title: "Completado",
      tasks: [
        {
          id: 6,
          title: "Configurar base de datos",
          assignee: "Sofía T",
          dueDate: "2023-06-10",
        },
      ],
    },
  ]);

  const [projects] = useState([
    { id: 1, name: "Rediseño de plataforma", progress: 65, tasks: 12 },
    { id: 2, name: "Implementación API", progress: 30, tasks: 8 },
    { id: 3, name: "Documentación técnica", progress: 90, tasks: 15 },
  ]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {view === "projects" ? "Mis Proyectos" : "Tablero de Tareas"}
        </h2>
        <button className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
          <HiPlus className="mr-1" />
          {view === "projects" ? "Nuevo Proyecto" : "Nueva Tarea"}
        </button>
      </div>

      {view === "projects" ? (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <HiDotsVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progreso</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>{project.tasks} tareas</span>
                <span>Última actualización: Hoy</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="min-w-[300px] bg-gray-50 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">{column.title}</h3>
                <span className="bg-gray-200 rounded-full px-2 py-1 text-xs font-medium">
                  {column.tasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  >
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <div className="mt-3 flex justify-between items-center text-sm">
                      <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {task.assignee}
                      </span>
                      <span className="text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                ))}

                <button className="w-full flex items-center justify-center text-gray-500 hover:text-indigo-600 p-2 rounded-lg border border-dashed border-gray-300 hover:border-indigo-300">
                  <HiPlus className="mr-1" />
                  Añadir tarea
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
