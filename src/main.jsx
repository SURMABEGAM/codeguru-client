import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import { router } from "./component/Routes/Router";
import Authprovider from "./component/context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <Authprovider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Authprovider>
);
