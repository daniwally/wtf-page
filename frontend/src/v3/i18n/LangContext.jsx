import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// i18n liviano para la web v3. Estado de idioma ('es' | 'en') con persistencia en
// localStorage. Cada sección define su copy bilingüe (COPY[lang]) y lo consume con
// useLang(). Default ES (idioma original del sitio).
const LangContext = createContext({ lang: "es", setLang: () => {} });

const STORAGE_KEY = "wtf-lang";
const SITE_URL = "https://www.wtf-agency.com";

const SEO = {
  es: {
    path: "/",
    title: "WTF Agency | Agencia creativa, estrategia e IA",
    description:
      "WTF Agency integra estrategia senior, creatividad, producción, data e IA en sistemas que ayudan a marcas regionales a moverse más rápido.",
    locale: "es_AR",
  },
  en: {
    path: "/en/",
    title: "WTF Agency | Creative agency, strategy and AI",
    description:
      "WTF Agency combines senior strategy, creativity, production, data and AI into systems that help regional brands move faster.",
    locale: "en_US",
  },
};

const SCHEMA_COPY = {
  es: {
    organization:
      "Agencia creativa AI-first que integra estrategia, creatividad, producción, data e inteligencia artificial en sistemas para marcas.",
    service: "Sistemas creativos para marcas",
    serviceType: "Estrategia, creatividad, producción, data e inteligencia artificial",
    audience: "Marcas, CMOs, directores de marketing y founders",
    imageAlt: "WTF Agency — Battle Tested Creativity",
  },
  en: {
    organization:
      "An AI-first creative agency combining strategy, creativity, production, data and artificial intelligence into systems for brands.",
    service: "Creative systems for brands",
    serviceType: "Strategy, creativity, production, data and artificial intelligence",
    audience: "Brands, CMOs, marketing directors and founders",
    imageAlt: "WTF Agency — Battle Tested Creativity",
  },
};

const langFromPath = (pathname) => (pathname.startsWith("/en") ? "en" : "es");

export const LangProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState(() => langFromPath(location.pathname));

  const setLang = useCallback((next) => {
    if (next !== "es" && next !== "en") return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage no disponible: el idioma vive solo en memoria */
    }
    const nextPath = SEO[next].path;
    if (location.pathname !== nextPath) {
      navigate(`${nextPath}${location.hash || ""}`);
    }
  }, [location.hash, location.pathname, navigate]);

  useEffect(() => {
    setLangState(langFromPath(location.pathname));
  }, [location.pathname]);

  // Mantener el head completo en sync. El build prerenderiza / y /en/, por lo
  // que buscadores y previews reciben estos datos sin depender de JavaScript.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const seo = SEO[lang];
    const pageUrl = `${SITE_URL}${seo.path}`;
    document.documentElement.lang = lang;
    document.title = seo.title;

    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };
    const setLink = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("href", value);
    };

    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:locale"]', seo.locale);
    setMeta('meta[property="og:locale:alternate"]', lang === "es" ? "en_US" : "es_AR");
    setMeta('meta[property="og:image:alt"]', SCHEMA_COPY[lang].imageAlt);
    setMeta('meta[name="twitter:title"]', seo.title);
    setMeta('meta[name="twitter:description"]', seo.description);
    setMeta('meta[name="twitter:image:alt"]', SCHEMA_COPY[lang].imageAlt);
    setLink('link[rel="canonical"]', pageUrl);

    const schemaEl = document.getElementById("structured-data");
    if (schemaEl) {
      try {
        const schema = JSON.parse(schemaEl.textContent);
        const graph = schema["@graph"] || [];
        const organization = graph.find((item) =>
          Array.isArray(item["@type"])
            ? item["@type"].includes("Organization")
            : item["@type"] === "Organization"
        );
        const webPage = graph.find((item) => item["@type"] === "WebPage");
        const service = graph.find((item) => item["@type"] === "Service");
        if (organization) organization.description = SCHEMA_COPY[lang].organization;
        if (webPage) {
          webPage["@id"] = `${pageUrl}#webpage`;
          webPage.url = pageUrl;
          webPage.name = seo.title;
          webPage.description = seo.description;
          webPage.inLanguage = lang;
        }
        if (service) {
          service.name = SCHEMA_COPY[lang].service;
          service.serviceType = SCHEMA_COPY[lang].serviceType;
          service.audience.audienceType = SCHEMA_COPY[lang].audience;
        }
        schemaEl.textContent = JSON.stringify(schema);
      } catch {
        /* El schema estático sigue siendo válido si no se puede actualizar. */
      }
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
  );
};

// Hook de consumo. Devuelve { lang, setLang }.
export const useLang = () => useContext(LangContext);

export default LangContext;
