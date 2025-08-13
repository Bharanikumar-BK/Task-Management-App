import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import TaskTable from "../components/TaskTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Alert from "../components/Alert";
import { Link, Navigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const Home = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [alert, setAlert] = useState(null);

  // Filter and sort tasks
  useEffect(() => {
    let result = [...tasks];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredTasks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [tasks, searchTerm, sortConfig]);

  // Handle task deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      setAlert({ type: "success", message: "Task deleted successfully!" });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle filtering
  const handleFilter = (key, value) => {
    if (value === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task[key] === value));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <TaskTable
        tasks={paginatedTasks}
        onDelete={handleDelete}
        onSort={handleSort}
        onFilter={handleFilter}
      />
      {filteredTasks.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;
