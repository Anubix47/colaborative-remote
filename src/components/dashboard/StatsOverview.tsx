import {
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";

const StatsOverview = () => {
  const stats = [
    {
      id: 1,
      name: "Proyectos activos",
      value: "3",
      icon: HiOutlineDocumentText,
      change: "+1",
      changeType: "positive",
    },
    {
      id: 2,
      name: "Tareas pendientes",
      value: "8",
      icon: HiOutlineCheckCircle,
      change: "-2",
      changeType: "negative",
    },
    {
      id: 3,
      name: "Miembros del equipo",
      value: "5",
      icon: HiOutlineUserGroup,
      change: "+0",
      changeType: "neutral",
    },
    {
      id: 4,
      name: "Tiempo estimado",
      value: "42h",
      icon: HiOutlineClock,
      change: "+3h",
      changeType: "positive",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Resumen</h2>
      <p className="mt-1 text-sm text-gray-500">
        Estado actual de tus proyectos y tareas
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : stat.changeType === "negative"
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
