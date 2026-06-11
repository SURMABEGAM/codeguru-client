import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import Router from "./component/Routes/Router";
import "./index.css";

import AuthProvider from "./component/context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={Router} />
  </AuthProvider>,
);
