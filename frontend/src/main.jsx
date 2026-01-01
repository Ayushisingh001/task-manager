// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // ✅ must match the actual file extension

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
