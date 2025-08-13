import { useForm } from "../hooks/useForm";

const TaskForm = ({ initialValues, onSubmit, buttonText }) => {
  const validate = (values) => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = "Title is required";
    }
    if (!values.description.trim()) {
      errors.description = "Description is required";
    }
    if (!values.dueDate) {
      errors.dueDate = "Due date is required";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues || {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
    },
    validate
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.title ? "border-danger-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-danger-600">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={values.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.description ? "border-danger-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-danger-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={values.dueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.dueDate ? "border-danger-500" : "border-gray-300"
              }`}
            />
            {/* <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500  rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div> */}
            {errors.dueDate && (
              <p className="mt-1 text-sm text-danger-600">{errors.dueDate}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white   bg-slate-950 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
