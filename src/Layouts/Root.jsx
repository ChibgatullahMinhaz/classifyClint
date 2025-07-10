import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer";

const Root = () => {
  return (
    <>
      <Navbar user={null} onLogout={() => {}} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
