import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/auth-context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50 h-18 text-white">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-500">
          Tech Path Finder
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">

          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-400 transition">
                Dashboard
              </Link>

              <Link to="/profile" className="hover:text-indigo-400 transition">
                Profile
              </Link>

              <span className="text-sm text-gray-400">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-400 transition">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden text-2xl cursor-pointer">
          {isOpen ? (
            <FaTimes onClick={() => setIsOpen(false)} />
          ) : (
            <FaBars onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4">

          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>

              <Link to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>

              <div className="text-sm text-gray-400">
                {user?.name}
              </div>

              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
