import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="flex-grow pt-16 md:pt-18">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
