import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./authContext.js";
import ProjectRoutes from "./routes.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProjectRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
