import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CONTACT_EMAIL } from "../../sections/shared";
import { useActiveTheme } from "../theme/ThemeContext";

const LOGO_LOCKUP = "/assets/logos/logo-wtf-lockup.png"; // lockup WTF+Brief (igual al home)

const NAV_ITEMS = [
  { label: "Sistema", href: "v3-sistema" },
  { label: "Trabajo", href: "v3-trabajo" },
  { label: "Soluciones", href: "v3-soluciones" },
  { label: "Contacto", href: "v3-contacto" },
];

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
  const theme = useActiveTheme();
  const darkBg = lum(theme.bg) < 0.55; // fondo oscuro → logo/letras claras

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          className={`flex items-center gap-3 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={LOGO_LOCKUP}
            alt="WTF · Brief Destroyers"
            className="h-10 md:h-12 w-auto"
            style={{ filter: darkBg ? "none" : "brightness(0)" }}
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center rounded-full px-5 py-2 text-xs font-bold transition-colors hover:!bg-[#FF3B30] hover:!text-[#F4F1E8]"
          style={{ backgroundColor: theme.fg, color: theme.bg }}
        >
          Hablemos
        </a>
      </div>
    </motion.nav>
  );
};

export default MonksNav;
