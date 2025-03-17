import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import UserContextProvider from "./contexts/UserContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </AuthProvider>
);
