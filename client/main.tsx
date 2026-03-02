import "./global.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (container) {
  // Use a unique global key to persist the root between HMR updates 
  // without triggering React's "already passed to createRoot" warning.
  const rootKey = "__REACT_ROOT__";
  let root = (window as any)[rootKey];
  
  if (!root) {
    root = createRoot(container);
    (window as any)[rootKey] = root;
  }
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

