import "@/App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import V3Page from "./v3/V3Page";

// Rutas de respaldo (película y comparativa Monks): code-split para no inflar el
// bundle inicial de la home (V3Page = ruta principal, se carga eager).
const LandingPage = lazy(() => import("./pages/LandingPage"));
const MonksPage = lazy(() => import("./monks/MonksPage"));

function App() {
  return (
    <div className="App">
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          {/* OJO: el <Suspense> NO puede envolver las rutas prerenderizadas. El HTML
              SSG es un snapshot de Puppeteer sin los marcadores de boundary que
              React 19 espera al hidratar un Suspense (<!--$-->), y ese mismatch
              (error #418) hacía descartar TODO el prerender y re-renderizar en
              cliente. La home va eager y sin boundary; cada ruta lazy lleva el suyo. */}
          <Routes>
            {/* v3 = versión principal */}
            <Route path="/" element={<V3Page />} />
            <Route path="/en/" element={<V3Page />} />
            <Route path="/pt/" element={<V3Page />} />
            <Route path="/v3" element={<V3Page />} />
            {/* respaldos (no se borran archivos: la película la edita otro chat) */}
            <Route
              path="/pelicula"
              element={
                <Suspense fallback={null}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path="/v2"
              element={
                <Suspense fallback={null}>
                  <MonksPage />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </div>
  );
}

export default App;
