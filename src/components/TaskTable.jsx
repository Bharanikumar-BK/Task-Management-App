import { useState } from "react";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const TaskTable = ({ tasks, onDelete, onSort, onFilter }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    onFilter("status", e.target.value);
  };

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value);
    onFilter("priority", e.target.value);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Task List</h2>
        <div className="flex space-x-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={handlePriorityFilter}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("title")}
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("description")}
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("status")}
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("priority")}
            >
              Priority
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("dueDate")}
            >
              Due Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                  {task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.status === "completed"
                        ? "bg-success-100 text-success-800"
                        : task.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.priority === "high"
                        ? "bg-danger-100 text-danger-800"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/edit/${task.id}`}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5 inline" />
                  </Link>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-danger-600 hover:text-danger-900"
                  >
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No tasks found. Create a new task to get started!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
