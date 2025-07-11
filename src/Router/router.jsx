import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import ClassDetails from "../pages/ClassDetails/ClassDetails";
import TeachForm from "../pages/TeachForm/TeachForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: 'AllClasses',
        element: <AllClasses /> 
      },
      {
        path: 'classDetails/:id',
        element: <ClassDetails /> 
      },
      {
        path: 'techOn',
        element: <TeachForm /> 
      }
    ]

  },
]);
