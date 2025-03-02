// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// main app
import App from "./App.tsx";
// auth
import { AuthProvider } from "./context/AuthProvider.tsx";
// css
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </StrictMode>,
);
