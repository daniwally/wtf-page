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
          <Suspense fallback={null}>
            <Routes>
              {/* v3 = versión principal */}
              <Route path="/" element={<V3Page />} />
              <Route path="/en/" element={<V3Page />} />
              <Route path="/pt/" element={<V3Page />} />
              <Route path="/v3" element={<V3Page />} />
              {/* respaldos (no se borran archivos: la película la edita otro chat) */}
              <Route path="/pelicula" element={<LandingPage />} />
              <Route path="/v2" element={<MonksPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </div>
  );
}

export default App;
