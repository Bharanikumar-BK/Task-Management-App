import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              TASK MANAGER
            </Link>
            <Link
              to="/create"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-primary-600"
            >
              Create Task
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
