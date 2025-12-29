import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

import MyCoues from "../Deshboad/MyCoues";
import AddCouse from "../Deshboad/AddCouse";
import MyAdded from "../Deshboad/MyAdded";
import Register from "../Pages/Register";
import DashBoad from "../Pages/DashBoad";
import PriviteRoutes from "./PriviteRoutes";
import Error from "../Pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error></Error>,
    children: [
      { index: true, Component: Home },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/dashboad",
        element: (
          <PriviteRoutes>
            <DashBoad />
          </PriviteRoutes>
        ),
      },

      {
        path: "/add-course",
        element: (
          <PriviteRoutes>
            <AddCouse />
          </PriviteRoutes>
        ),
      },
      {
        path: "/my-enrolled",
        Component: MyCoues,
      },
      {
        path: "/my-added",
        Component: MyAdded,
      },
    ],
  },
]);
