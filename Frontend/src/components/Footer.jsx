const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Tech Path Finder
          </h2>
          <p className="text-sm">
            Discover the right technology path for your career.
            Learn, practice, and track your growth.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Quiz</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Contact
          </h2>
          <p className="text-sm">Email: support@techpathfinder.com</p>
          <p className="text-sm">Built for Final Year Project 🚀</p>
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-gray-700">
        © {new Date().getFullYear()} Tech Path Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
