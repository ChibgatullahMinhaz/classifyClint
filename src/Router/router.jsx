import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import TeachForm from "../pages/TeachForm/TeachForm";
import StudentLayout from "../Layouts/StudentLayout";
import StudentDashboard from "../Dashboards/Student/StudentDashborad";
import TeacherLayout from "../Layouts/TeacherLayout";
import TeacherDashboard from "../Dashboards/Teacher/TeacherDashboard";
import AdminDashboard from "../Dashboards/Admin/AdminDashboard";
import AdminLayout from "../Layouts/AdminLayout";
import MyEnrollClasses from "../pages/MyEnrollClasses/MyEnrollClasses";
import StudentProfile from "../pages/StudentProfile/StudentProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "AllClasses",
        element: <AllClasses />,
      },
      {
        path: "classDetails/:id",
        element: <ClassDetails />,
      },
      {
        path: "techOn",
        element: <TeachForm />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <StudentLayout />,
    children: [
      {
        path: "My-enroll-class",
        element: <MyEnrollClasses />,
      },
      {
        path: "my-profile",
        element: <StudentProfile />,
      },
    ],
  },
  {
    path: "teacher-dashboard",
    element: <TeacherLayout />,
    children: [],
  },
  {
    path: "admin-dashboard",
    element: <AdminLayout />,
    children: [],
  },
]);
