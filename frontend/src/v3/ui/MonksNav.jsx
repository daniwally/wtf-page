import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useActiveTheme } from "../theme/ThemeContext";
import { useLang } from "../i18n/LangContext";
import { useContactModal } from "./ContactModal";

const LOGO_LOCKUP = "/assets/logos/logo-wtf-lockup.png"; // lockup WTF+Brief (igual al home)

const NAV_ITEMS = [
  { es: "Engine", en: "Engine", pt: "Engine", href: "v3-engine" },
  { es: "Servicios", en: "Services", pt: "Serviços", href: "v3-soluciones" },
  { es: "Trabajo", en: "Work", pt: "Trabalho", href: "v3-galeria" },
];

const CTA = {
  es: "Hablemos",
  en: "Let's talk",
  pt: "Vamos conversar",
};
const IG_LABEL = {
  es: "WTF Agency en Instagram",
  en: "WTF Agency on Instagram",
  pt: "WTF Agency no Instagram",
};

// luminancia simple (0 negro → 1 blanco) para decidir oscuro/claro
const lum = (hex) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};
// Nav Monks theme-aware, SIEMPRE transparente (sin barra): el menú flota sobre
// la imagen. Solo el color del texto/logo sigue el tema — claro sobre fondo
// oscuro, negro sobre fondo claro. Cross-fade en sync con el color-swap.
const MonksNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigationCleanup = useRef(null);
  const theme = useActiveTheme();
  const { lang, setLang } = useLang();
  const { openContact } = useContactModal();
  const darkBg = lum(theme.bg) < 0.55; // fondo oscuro → logo/letras claras

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => navigationCleanup.current?.(), []);

  // La galería carga medios de forma diferida y puede crecer después de un
  // salto. Mientras el layout se estabiliza, mantenemos el destino elegido en
  // el borde superior para que "Trabajo" llegue realmente a los casos.
  const navigateToSection = useCallback((event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    navigationCleanup.current?.();
    window.history.pushState(null, "", `#${id}`);

    let maxTimer;
    const align = () => {
      const top = window.scrollY + target.getBoundingClientRect().top;
      window.scrollTo({ top, behavior: "auto" });
    };
    const finish = () => {
      observer.disconnect();
      window.clearTimeout(maxTimer);
      if (navigationCleanup.current === finish) navigationCleanup.current = null;
    };
    const observer = new ResizeObserver(() => {
      align();
    });

    observer.observe(document.body);
    navigationCleanup.current = finish;
    align();
    window.requestAnimationFrame(align);
    maxTimer = window.setTimeout(finish, 5000);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 ${scrolled ? "py-3" : "py-5"}`}
      style={{
        color: theme.fg,
        transition:
          "color 0.55s cubic-bezier(0.22,1,0.36,1), padding 0.3s ease",
      }}
      data-testid="monks-nav"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#v3-hero"
          onClick={(event) => navigateToSection(event, "v3-hero")}
          className={`flex items-center gap-3 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={LOGO_LOCKUP}
            alt="WTF · Brief Destroyers"
            width="720"
            height="363"
            className="h-12 md:h-14 w-auto"
            style={{ filter: darkBg ? "none" : "brightness(0)" }}
          />
        </a>
        <div
          className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(event) => navigateToSection(event, item.href)}
              className="text-sm font-semibold uppercase tracking-wide rounded-full px-3 py-1.5 opacity-80 transition-all hover:opacity-100 hover:bg-[#FF3B30] hover:text-[#F4F1E8]"
            >
              {item[lang]}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          {/* Selector de idioma (funcional) */}
          <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wide select-none">
            <button
              type="button"
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
              aria-label="Ver el sitio en español"
              className={`uppercase transition-opacity ${lang === "es" ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
            >
              ES
            </button>
            <span aria-hidden="true" className="opacity-30">/</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              aria-label="View the site in English"
              className={`uppercase transition-opacity ${lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
            >
              EN
            </button>
            <span aria-hidden="true" className="opacity-30">/</span>
            <button
              type="button"
              onClick={() => setLang("pt")}
              aria-pressed={lang === "pt"}
              aria-label="Ver o site em português"
              className={`uppercase transition-opacity ${lang === "pt" ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
            >
              PT
            </button>
          </div>
          <button
            type="button"
            onClick={openContact}
            className="inline-flex items-center whitespace-nowrap rounded-full px-3 md:px-5 py-2 text-[10px] md:text-xs font-bold transition-colors hover:!bg-[#FF3B30] hover:!text-[#F4F1E8]"
            style={{ backgroundColor: theme.fg, color: theme.bg }}
          >
            {CTA[lang]}
          </button>
          <a
            href="https://www.instagram.com/wtf.agency/"
            target="_blank"
            rel="noreferrer"
            aria-label={IG_LABEL[lang]}
            title={IG_LABEL[lang]}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/30 transition-colors hover:border-[#FF3B30] hover:bg-[#FF3B30] hover:text-[#F4F1E8]"
          >
            <Instagram size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default MonksNav;
