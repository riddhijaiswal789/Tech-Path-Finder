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
    <nav className="fixed z-50 h-16 md:h-18 w-full border-b border-white/10 bg-slate-950/90 text-white backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="max-w-[75%] text-lg font-bold leading-tight tracking-tight text-cyan-300 sm:text-2xl md:max-w-none"
        >
          Tech Path Finder
        </Link>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
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

              <span className="hidden text-sm text-slate-400 lg:block">
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

        <div className="cursor-pointer text-2xl md:hidden">
          {isOpen ? (
            <FaTimes onClick={() => setIsOpen(false)} />
          ) : (
            <FaBars onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="space-y-3 border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden sm:px-6">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl border border-white/10 px-4 py-3 text-slate-200"
          >
            Learning Paths
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl border border-white/10 px-4 py-3 text-slate-200"
              >
                My Learning
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl border border-white/10 px-4 py-3 text-slate-200"
              >
                Profile
              </Link>

              <div className="px-1 text-sm text-slate-400">
                {user?.name}
              </div>

              <button
                onClick={handleLogout}
                className="block w-full rounded-xl border border-rose-500/30 px-4 py-3 text-left text-rose-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl border border-white/10 px-4 py-3 text-slate-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl bg-cyan-400 px-4 py-3 font-medium text-slate-950"
              >
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
