import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LOGOS, CONTACT_EMAIL, Timecode } from "./shared";
import { useActiveChapter } from "../components/motion/ChapterContext";

const NAV_ITEMS = [
  { label: "Quiénes", href: "cap-01" },
  { label: "Pensamos", href: "cap-02" },
  { label: "Trabajo", href: "cap-03" },
  { label: "Sistema", href: "cap-04" },
  { label: "Entrá", href: "cap-05" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveChapter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-lg py-4" : "bg-transparent py-6"
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#cap-00" className="flex items-center gap-4" data-testid="nav-logo">
          <img src={LOGOS.wtfWhite} alt="WTF Logo" className="h-10 md:h-12 w-auto" />
          <span className="hidden md:block text-white/30">|</span>
          <img
            src={LOGOS.briefWhite}
            alt="Brief Destroyers"
            className="h-8 md:h-10 w-auto hidden md:block"
          />
        </a>
        <div className="hidden md:flex gap-7 items-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className={`nav-link text-sm font-medium uppercase tracking-widest transition-colors ${
                active === item.href.slice(4) ? "text-volt" : "text-white/70 hover:text-white"
              }`}
              data-testid={`nav-${item.href}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <span
            className="hidden lg:block font-hud text-[11px] tracking-[0.25em] text-volt/80"
            data-testid="nav-chapter"
          >
            CAP {active}/05
          </span>
          <Timecode className="hidden lg:block text-[11px] text-white/40" />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden md:block text-[10px] px-3 py-1.5 border border-white text-white font-bold uppercase tracking-wider hover:bg-volt hover:text-black hover:border-volt transition-colors"
            data-testid="nav-cta"
          >
            Hablemos
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
