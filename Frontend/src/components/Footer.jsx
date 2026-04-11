import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Tech Path Finder
          </h2>
          <p className="text-sm">
            Explore focused learning paths, study with guided video lessons,
            and reinforce each topic with MCQ practice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Navigate
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="transition hover:text-white">
                Learning Paths
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="transition hover:text-white">
                My Learning
              </Link>
            </li>
            <li>
              <Link to="/profile" className="transition hover:text-white">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
          <p className="text-sm">Email: support@techpathfinder.com</p>
          <p className="text-sm">Built for Final Year Project</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-sm sm:px-6">
        Copyright {new Date().getFullYear()} Tech Path Finder. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
