import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Login from "../Pages/Login";
import Home from "../Pages/Home";

import MyCoues from "../Deshboad/MyCoues";
import AddCouse from "../Deshboad/AddCouse";
import MyAdded from "../Deshboad/MyAdded";
import Register from "../Pages/Register";
import PriviteRoutes from "./PriviteRoutes";
import Error from "../Pages/Error";
import DashboardLayout from "../Pages/DashboardLayout";
import DashboardHome from "../Deshboad/DashboardHome";
import Profile from "../Deshboad/Profile ";
import InstructorRoute from "./InstructorRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Deshboad/ManageUsers";
import AdminManageCourses from "../Deshboad/AdminManageCourses";

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
        path: "/dashboard",
        element: (
          <PriviteRoutes>
            <DashboardLayout />
          </PriviteRoutes>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "profile", element: <Profile /> },
          {
            path: "add-course",
            element: (
              <InstructorRoute>
                <AddCouse />
              </InstructorRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "manage-courses",
            element: (
              <AdminRoute>
                <AdminManageCourses />
              </AdminRoute>
            ),
          },
        ],
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
