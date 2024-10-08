import React from 'react';
import { createRoot }from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from "./contexts/AuthProvider";
  
const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  
);
