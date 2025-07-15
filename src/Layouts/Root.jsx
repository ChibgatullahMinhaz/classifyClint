import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer";

const Root = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar user={null} onLogout={() => {}} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
