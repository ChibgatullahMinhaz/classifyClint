import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import StudentDashboard from "../Dashboards/Student/StudentDashborad";

const StudentLayout = () => {
  return (
    <>
     <StudentDashboard />
    </>
  );
};

export default StudentLayout;
