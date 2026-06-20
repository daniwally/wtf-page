import { ThemeRoot } from "./theme/ThemeContext";
import { THEMES } from "./theme/palette";
import MonksNav from "./ui/MonksNav";
import HeroSection from "./sections/HeroSection";
import ThesisSection from "./sections/ThesisSection";
import BreakSection from "./sections/BreakSection";
import OrchestrateSection from "./sections/OrchestrateSection";
import SystemSection from "./sections/SystemSection";
import SolutionsSection from "./sections/SolutionsSection";
import WorkSection from "./sections/WorkSection";
import GallerySection from "./sections/GallerySection";
import ContactSection from "./sections/ContactSection";

// Versión B "Monks" — estructura Monks (bloques de color que rotan, aire,
// píldoras, cards) con ADN WTF (crema/negro/volt, Inter en registro bold).
// Cadencia: claro → oscuro → claro → VOLT → oscuro → claro → claro → oscuro → claro.
const MonksPage = () => (
  <ThemeRoot initial={THEMES.night}>
    <MonksNav />
    <HeroSection />
    <ThesisSection />
    <BreakSection />
    <OrchestrateSection />
    <SystemSection />
    <SolutionsSection />
    <WorkSection />
    <GallerySection />
    <ContactSection />
  </ThemeRoot>
);

export default MonksPage;
