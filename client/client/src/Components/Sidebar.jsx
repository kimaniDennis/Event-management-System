import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-indigo-700 text-white min-h-screen p-6 w-full">
      <h2 className="text-2xl font-bold mb-6">EventElevate</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li>
          <Link to="/eventform" className="hover:text-gray-300">Create Event</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>
        </li>
        <li>
          <Link to="/logout" className="hover:text-gray-300">Logout</Link>
        </li>
        <li>
          <Link to="/logout" className="hover:text-gray-300">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
