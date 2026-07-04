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
  hydrateRoot(rootEl, app, {
    // Si la hidratación falla, React regenera todo el árbol en el cliente y el
    // prerender se tira a la basura. Este log deja el componente culpable a la
    // vista (con DISABLE_MINIMIZE=true los nombres salen sin minificar).
    onRecoverableError: (err, info) => {
      console.warn(
        "[hydration mismatch]",
        err?.message || err,
        info?.componentStack || ""
      );
    },
  });
} else {
  createRoot(rootEl).render(app);
}
