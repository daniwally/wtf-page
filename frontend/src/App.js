import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import MonksPage from "./monks/MonksPage";
import V3Page from "./v3/V3Page";

function App() {
  return (
    <div className="App">
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            {/* v3 = versión principal */}
            <Route path="/" element={<V3Page />} />
            <Route path="/v3" element={<V3Page />} />
            {/* respaldos (no se borran archivos: la película la edita otro chat) */}
            <Route path="/pelicula" element={<LandingPage />} />
            <Route path="/v2" element={<MonksPage />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </div>
  );
}

export default App;
