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
import AddClass from "../pages/AddClass/AddClass";
import MyClasses from "../pages/MyClasses/MyClasses";
import AdminProfile from "../Dashboards/Admin/pages/AdminProfile";
import AdminAllClasses from "../Dashboards/Admin/pages/AllClasses";
import Users from "../Dashboards/Admin/pages/Users";
import TeacherRequest from "../Dashboards/Admin/pages/TeacherRequest";
import Dashboard from "../Dashboards/Teacher/pages/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AuthLayout from "../Layouts/AuthLayout";
import PaymentPage from "../pages/Payment/PaymentPage";
import MyRequestPage from "../Dashboards/Student/pages/MyRequestPage";
import MyClassDetails from "../Dashboards/Student/pages/MyClassDetails";
import MyEnrollClassDetails from "../pages/MyEnrollClassDetails/MyEnrollClassDetails";
import ClassProgreess from "../Dashboards/Admin/pages/ClassProgreess";
import AdminRoutes from "./AdminRoutes";
import DriverRoute from "./DriverRoutes";
import UserRoutes from "./UserRoutes";

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
        element: (
          <PrivateRoute>
            <ClassDetails />,
          </PrivateRoute>
        ),
      },
      {
        path: "payFor/:id",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "techOn",
        element: (
          <PrivateRoute>
            {" "}
            <TeachForm />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <UserRoutes>
        <StudentLayout />
      </UserRoutes>
    ),
    children: [
      {
        path: "My-enroll-class",
        element: <MyEnrollClasses />,
      },
      {
        path: "myenroll-class/:id",
        element: <MyEnrollClassDetails />,
      },
      {
        path: "my-profile",
        element: <StudentProfile />,
      },
      {
        path: "my-request",
        element: <MyRequestPage />,
      },
    ],
  },
  {
    path: "teacher-dashboard",
    element: (
      <DriverRoute>
        <TeacherLayout />
      </DriverRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "addClass",
        element: <AddClass />,
      },
      {
        path: "myClass",
        element: <MyClasses />,
      },
      {
        path: "classDetails/:id",
        element: <MyClassDetails />,
      },
      {
        path: "myProfile",
        element: <StudentProfile />,
      },
    ],
  },
  {
    path: "admin-dashboard",
    element: (
      <AdminRoutes>
        <AdminLayout />
      </AdminRoutes>
    ),
    children: [
      {
        path: "Teacher-Request",
        Component: TeacherRequest,
      },
      {
        path: "Users",
        Component: Users,
      },
      {
        path: "AllClasses",
        Component: AdminAllClasses,
      },
      {
        path: "class-progress/:id",
        Component: ClassProgreess,
      },
      {
        path: "Profile",
        Component: AdminProfile,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: (
      <PrivateRoute>
        <Unauthorized />,
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
