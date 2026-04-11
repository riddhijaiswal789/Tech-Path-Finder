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
    <nav className="fixed z-50 h-18 w-full border-b border-white/10 bg-slate-950/90 text-white backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-cyan-300">
          Tech Path Finder
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-300 transition hover:text-white">
            Learning Paths
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-slate-300 transition hover:text-white"
              >
                My Learning
              </Link>

              <Link
                to="/profile"
                className="text-slate-300 transition hover:text-white"
              >
                Profile
              </Link>

              <span className="text-sm text-slate-400">
                {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full border border-rose-500/40 px-4 py-2 text-rose-200 transition hover:border-rose-400 hover:bg-rose-500/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
              >
                Start Learning
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden text-2xl cursor-pointer">
          {isOpen ? (
            <FaTimes onClick={() => setIsOpen(false)} />
          ) : (
            <FaBars onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-6 py-4 space-y-4">

          <Link to="/" onClick={() => setIsOpen(false)}>
            Learning Paths
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                My Learning
              </Link>

              <Link to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </Link>

              <div className="text-sm text-slate-400">
                {user?.name}
              </div>

              <button
                onClick={handleLogout}
                className="block w-full text-left text-rose-300"
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
                Start Learning
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
