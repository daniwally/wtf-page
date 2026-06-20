import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LOGOS, CONTACT_EMAIL } from "../../sections/shared";

const NAV_ITEMS = [
  { label: "Sistema", href: "v2-sistema" },
  { label: "Trabajo", href: "v2-trabajo" },
  { label: "Soluciones", href: "v2-soluciones" },
  { label: "Contacto", href: "v2-contacto" },
];

// Nav Monks: barra slim, logo + anchors + píldora CTA. Sin timecode/CAP/volt-HUD.
const MonksNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[#F4F1E8]/80 backdrop-blur-md" : "py-5"
      }`}
      data-testid="monks-nav"
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#v2-hero" className="flex items-center gap-3">
          <img src={scrolled ? LOGOS.wtfBlack : LOGOS.wtfWhite} alt="WTF" className="h-9 md:h-10 w-auto transition-opacity" />
          <span className="hidden md:block w-px h-7 bg-current/20" />
          <img
            src={scrolled ? LOGOS.briefBlack : LOGOS.briefWhite}
            alt="Brief Destroyers"
            className="hidden md:block h-7 w-auto transition-opacity"
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
          className={`inline-flex items-center rounded-full px-5 py-2 text-xs font-bold transition-colors hover:bg-[#FF3B30] hover:text-[#F4F1E8] ${
            scrolled ? "bg-[#0A0A0C] text-[#F4F1E8]" : "bg-[#F4F1E8] text-[#0A0A0C]"
          }`}
        >
          Hablemos
        </a>
      </div>
    </motion.nav>
  );
};

export default MonksNav;
