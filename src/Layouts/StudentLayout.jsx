import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";

const StudentLayout = () => {
  return (
    <>
      
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default StudentLayout;
