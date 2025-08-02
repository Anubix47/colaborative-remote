import { HiDotsVertical } from "react-icons/hi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project }: any) => {
  return (
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
        <span>{project.tasks_count} tareas</span>
        <span>
          Última actualización:{" "}
          {new Date(project.updated_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
