import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { THEMES } from "./palette";

// Mecanismo-firma de Monks: el fondo y el texto se animan en el <main> mismo
// (cubre todo el documento → color correcto a cualquier scroll, sin
// position:fixed ni artefactos). El cross-fade se hace con TRANSICIÓN CSS, no
// con framer: maneja interrupciones de scroll rápidas y SIEMPRE asienta en el
// valor final (framer se trababa en gris al re-disparar el tween). La sección
// que cruza el centro del viewport define el tema.
const ThemeContext = createContext({ register: () => {}, theme: THEMES.bone });

export const ThemeRoot = ({ initial = THEMES.bone, children }) => {
  const [theme, setTheme] = useState(initial);
  const reduced = useReducedMotion();
  const observerRef = useRef(null);
  const map = useRef(new Map()); // el -> theme (Map para poder iterar)

  // Selección determinística: la sección cuyo box cruza el centro del viewport
  // gana (independiente del orden de entries del observer). Robusto en scroll
  // humano y en saltos programáticos.
  const recompute = useCallback(() => {
    const centerY = window.innerHeight / 2;
    let best = null;
    let bestDist = Infinity;
    map.current.forEach((themeObj, el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= centerY && r.bottom >= centerY) {
        const dist = Math.abs((r.top + r.bottom) / 2 - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          best = themeObj;
        }
      }
    });
    if (best) setTheme(best);
  }, []);

  useEffect(() => {
    // rAF-throttle: a lo sumo un recompute por frame (9 rects, barato)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        recompute();
        ticking = false;
      });
    };
    const io = new IntersectionObserver(onScroll, {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    });
    observerRef.current = io;
    // Enganchar lo ya registrado: los efectos de los HIJOS corren antes que el
    // del PADRE, así que para cuando se crea el observer las secciones ya están
    // en el mapa pero sin observar. Sin esto, en producción (efectos una sola
    // vez, sin el doble-invoke de StrictMode) el mapa quedaba vacío y el tema se
    // clavaba en el inicial (negro). El scroll listener + recompute usan el mapa.
    map.current.forEach((_, el) => io.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    recompute();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [recompute]);

  const register = useCallback((el, themeObj) => {
    if (!el) return;
    map.current.set(el, themeObj); // SIEMPRE al mapa (recompute lo recorre)
    observerRef.current?.observe(el); // observar si el observer ya existe
  }, []);

  return (
    <ThemeContext.Provider value={{ register, theme }}>
      <main
        className="monks-root relative min-h-screen"
        data-active-bg={theme.bg}
        data-testid="v3-page"
        style={{
          backgroundColor: theme.bg,
          color: theme.fg,
          transition: reduced
            ? "none"
            : "background-color 0.55s cubic-bezier(0.22,1,0.36,1), color 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {children}
      </main>
    </ThemeContext.Provider>
  );
};

export const useThemeRegister = () => useContext(ThemeContext).register;
export const useActiveTheme = () => useContext(ThemeContext).theme;
