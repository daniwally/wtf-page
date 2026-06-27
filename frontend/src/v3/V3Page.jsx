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

// Versión B "Monks" — estructura Monks (bloques de color que rotan, aire,
// píldoras, cards) con ADN WTF (crema/negro/volt, Inter en registro bold).
// Cadencia: claro → oscuro → claro → VOLT → oscuro → claro → claro → oscuro → claro.
const V3Page = () => {
  // Scroll tipo slides (scroll-snap) scopeado a esta ruta vía clase en <html>.
  useEffect(() => {
    document.documentElement.classList.add("v3-snap");
    return () => document.documentElement.classList.remove("v3-snap");
  }, []);

  return (
    <LangProvider>
    <ThemeRoot initial={THEMES.night}>
      <MonksNav />
      {/* Arco: Hero · The shift · Why WTF · Statement · Infinity Engine · The model · What we do · Proof Then/Now · Closing */}
      <HeroSection />
      <ThesisSection />
      <WhySection />
      <StatementSection />
      <SystemSection />
      <ClientsSection />
      <OrchestrateSection />
      <SolutionsSection />
      <GallerySection />
      <WorkSection />
      <ContactSection />
    </ThemeRoot>
    </LangProvider>
  );
};

export default V3Page;
