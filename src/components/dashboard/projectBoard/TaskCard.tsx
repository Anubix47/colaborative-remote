// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TaskCard = ({ task }: any) => {
  return (
    <div
      key={task.id}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <h4 className="font-medium text-gray-900">{task.title}</h4>
      <div className="mt-3 flex justify-between items-center text-sm">
        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
          {task.profile["full_name"]}
        </span>
        <span className="text-gray-500">{task.due_date}</span>
      </div>
    </div>
  );
};

export default TaskCard;
