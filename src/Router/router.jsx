import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";

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
      }
    ]

  },
]);
