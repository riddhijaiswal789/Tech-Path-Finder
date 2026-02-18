import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-18">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
