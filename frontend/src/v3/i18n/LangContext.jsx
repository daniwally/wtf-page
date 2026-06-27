import { createContext, useContext, useState, useEffect, useCallback } from "react";

// i18n liviano para la web v3. Estado de idioma ('es' | 'en') con persistencia en
// localStorage. Cada sección define su copy bilingüe (COPY[lang]) y lo consume con
// useLang(). Default ES (idioma original del sitio).
const LangContext = createContext({ lang: "es", setLang: () => {} });

const STORAGE_KEY = "wtf-lang";

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "es";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "es" ? saved : "es";
  });

  const setLang = useCallback((next) => {
    if (next !== "es" && next !== "en") return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage no disponible: el idioma vive solo en memoria */
    }
  }, []);

  // Mantener <html lang> y la meta description en sync con el idioma activo
  // (mejora el SEO/share cuando el bot ejecuta JS y la accesibilidad).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    const desc =
      lang === "en"
        ? "Battle Tested Creativity since 2010. We operate regional brands with Infinity Engine: our AI-first creative operating system, strategy and production at scale."
        : "Battle Tested Creativity desde 2010. Operamos marcas regionales con Infinity Engine: nuestro sistema operativo creativo AI-first, estrategia y producción a escala.";
    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:description"]', desc);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
};

// Hook de consumo. Devuelve { lang, setLang }.
export const useLang = () => useContext(LangContext);

export default LangContext;
