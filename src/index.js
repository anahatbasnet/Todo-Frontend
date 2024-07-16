import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Get the root element from the HTML
const container = document.getElementById("root");

// Create a root and render the app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
