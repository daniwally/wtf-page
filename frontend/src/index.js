import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";

const rootEl = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si el HTML viene prerenderizado (SSG en build-time, ver scripts/prerender.mjs)
// hidratamos sobre el markup existente; si no, render client-side normal.
if (rootEl.childElementCount > 0) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
