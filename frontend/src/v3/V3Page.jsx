import { useEffect } from "react";
import { ThemeRoot } from "./theme/ThemeContext";
import { THEMES } from "./theme/palette";
import { LangProvider } from "./i18n/LangContext";
import MonksNav from "./ui/MonksNav";
import HeroSection from "./sections/HeroSection";
import ThesisSection from "./sections/ThesisSection"; // The shift
import SystemSection from "./sections/SystemSection"; // Infinity Engine
import ClientsSection from "./sections/ClientsSection"; // Nuestros clientes
import OrchestrateSection from "./sections/OrchestrateSection"; // The model
import SolutionsSection from "./sections/SolutionsSection"; // What we do
import WhySection from "./sections/WhySection"; // Why WTF
import StatementSection from "./sections/StatementSection"; // Slide manifiesto
import WorkSection from "./sections/WorkSection"; // Proof · Then
import GallerySection from "./sections/GallerySection"; // Proof · Now
import ContactSection from "./sections/ContactSection"; // Closing
import { ContactModalProvider } from "./ui/ContactModal";
import { trackEvent } from "./utils/analytics";

const TRACKED_SECTIONS = [
  { id: "v3-engine", name: "Infinity Engine" },
  { id: "v3-soluciones", name: "Servicios" },
  { id: "v3-galeria", name: "La prueba Now" },
  { id: "v3-contacto", name: "Contacto" },
];

// Versión B "Monks" — estructura Monks (bloques de color que rotan, aire,
// píldoras, cards) con ADN WTF (crema/negro/volt, Inter en registro bold).
// Cadencia: claro → oscuro → claro → VOLT → oscuro → claro → claro → oscuro → claro.
const V3Page = () => {
  // Scroll tipo slides (scroll-snap) scopeado a esta ruta vía clase en <html>.
  useEffect(() => {
    document.documentElement.classList.add("v3-snap");
    return () => document.documentElement.classList.remove("v3-snap");
  }, []);

  useEffect(() => {
    const seenSections = new Set();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seenSections.has(entry.target.id)) return;
          const section = TRACKED_SECTIONS.find((item) => item.id === entry.target.id);
          if (!section) return;
          seenSections.add(entry.target.id);
          trackEvent("section_view", {
            event_category: "engagement",
            section_id: section.id,
            section_name: section.name,
          });
        });
      },
      { threshold: 0.45 }
    );

    TRACKED_SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    const depthMarks = [25, 50, 75, 90];
    const seenDepths = new Set();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      depthMarks.forEach((mark) => {
        if (depth >= mark && !seenDepths.has(mark)) {
          seenDepths.add(mark);
          trackEvent("scroll_depth", {
            event_category: "engagement",
            percent_scrolled: mark,
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.requestAnimationFrame(onScroll);

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <LangProvider>
      <ContactModalProvider>
        <ThemeRoot initial={THEMES.night}>
          <MonksNav />
          {/* Arco narrativo "sistema operativo creativo": Hero · Problema · Solución ·
              Cómo funciona · Qué resuelve · Diferencial humano · Credenciales ·
              Sistemas/servicios · Outputs AI · Casos · Cierre */}
          <HeroSection />
          <ThesisSection />
          <SystemSection id="v3-engine" />
          <OrchestrateSection />
          <WhySection />
          <StatementSection />
          <ClientsSection />
          <SolutionsSection />
          <GallerySection />
          <WorkSection />
          <ContactSection />
        </ThemeRoot>
      </ContactModalProvider>
    </LangProvider>
  );
};

export default V3Page;
