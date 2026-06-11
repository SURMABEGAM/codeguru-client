import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import Router from "./component/Routes/Router";
import "./index.css";

import AuthProvider from "./component/context/AuthProvider";
import { AppProvider } from "./component/context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProvider>
      <RouterProvider router={Router} />
    </AppProvider>
  </AuthProvider>,
);
