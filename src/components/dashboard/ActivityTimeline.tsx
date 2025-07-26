import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineChatAlt,
  HiOutlineDocumentAdd,
} from "react-icons/hi";
import { useState } from "react";

const ActivityTimeline = () => {
  const [activities] = useState([
    {
      id: 1,
      type: "comment",
      user: "Ana López",
      action: "comentó en la tarea",
      target: "Diseño de interfaz",
      time: "Hace 15 minutos",
    },
    {
      id: 2,
      type: "file",
      user: "Carlos Martínez",
      action: "subió un archivo",
      target: "Requerimientos.pdf",
      time: "Hace 2 horas",
    },
    {
      id: 3,
      type: "task",
      user: "Juan Pérez",
      action: "completó la tarea",
      target: "Implementar autenticación",
      time: "Ayer",
    },
    {
      id: 4,
      type: "project",
      user: "María González",
      action: "creó el proyecto",
      target: "Rediseño de plataforma",
      time: "5 de Junio",
    },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <HiOutlineChatAlt className="h-5 w-5 text-blue-500" />;
      case "file":
        return <HiOutlineDocumentAdd className="h-5 w-5 text-purple-500" />;
      case "task":
        return <HiOutlineCalendar className="h-5 w-5 text-green-500" />;
      default:
        return <HiOutlineUser className="h-5 w-5 text-indigo-500" />;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Actividad Reciente
      </h2>

      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-900">
                          {activity.user}
                        </span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium text-gray-900">
                          {activity.target}
                        </span>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityTimeline;
