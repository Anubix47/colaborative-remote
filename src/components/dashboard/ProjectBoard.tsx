/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { supabase } from "../../lib/supabaseClient";
import ProjectCard from "./projectBoard/ProjectCard";
import TaskCard from "./projectBoard/TaskCard";

export interface Project {
  id: number;
  name: string;
  progress: number;
  tasks_count: number;
  updated_at: string;
}

interface Task {
  id: number;
  title: string;
  profile: string;
  due_date: string;
  column: string;
}

interface ProjectBoardProps {
  view?: "projects" | "tasks";
  search?: string;
}

const ProjectBoard = ({ view = "projects", search }: ProjectBoardProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasksColumns, setTasksColumns] = useState<
    { id: number; title: string; tasks: Task[] }[] | any
  >([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar proyectos filtrados por nombre
  const fetchProjects = async (filter?: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("id, name, progress, tasks_count, updated_at")
      .ilike("name", `%${filter}%`)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  // Función para cargar tareas de las columnas, filtrando por título si aplica
  const fetchTasks = async (filter?: string) => {
    setLoading(true);
    // Ojo: Este ejemplo asume que tienes una tabla tasks con columna 'column' que indica status
    const columns = [
      { id: 1, title: "Por hacer" },
      { id: 2, title: "En progreso" },
      { id: 3, title: "Revisión" },
      { id: 4, title: "Completado" },
    ];

    // Para cada columna, consultar tareas filtradas
    const tasksByColumn = await Promise.all(
      columns.map(async (col) => {
        const { data, error } = await supabase
          .from("tasks")
          .select(
            `
    id,
    title,
    due_date,
    column,
    project_id,
    profile:assignee (
      full_name
    )
  `
          )
          .eq("column", col.title)
          .ilike("title", `%${filter}%`)
          .order("due_date", { ascending: true });

        console.log(data);

        if (error) {
          console.error(`Error fetching tasks for column ${col.title}:`, error);
          return { ...col, tasks: [] };
        }

        const tasksNormalized = (data || []).map((task) => ({
          ...task,
          due_date: new Date(task.due_date).toLocaleDateString(),
        }));
        return { ...col, tasks: tasksNormalized };
      })
    );

    setTasksColumns(tasksByColumn);
    setLoading(false);
  };

  // Efecto para cargar datos según el view y el filtro search
  useEffect(() => {
    if (view === "projects") {
      fetchProjects(search);
    } else {
      fetchTasks(search);
    }
  }, [view, search]);

  if (loading) {
    return <p>Cargando...</p>;
  }

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
          {projects.length === 0 ? (
            <p className="text-gray-500">No se encontraron proyectos.</p>
          ) : (
            projects.map((project) => <ProjectCard project={project} />)
          )}
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 space-x-4">
          {tasksColumns.length === 0 ? (
            <p>No se encontraron tareas.</p>
          ) : (
            tasksColumns.map((column: any) => (
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
                  {column.tasks.map((task: any) => (
                    <TaskCard task={task} />
                  ))}

                  <button className="w-full flex items-center justify-center text-gray-500 hover:text-indigo-600 p-2 rounded-lg border border-dashed border-gray-300 hover:border-indigo-300">
                    <HiPlus className="mr-1" />
                    Añadir tarea
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;
