import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import { ChapterProvider } from "../components/motion/ChapterContext";
import ScrollProgress from "../components/motion/ScrollProgress";
import Cap00Hero from "../chapters/Cap00Hero";
import Cap01Quienes from "../chapters/Cap01Quienes";
import Cap02Pensamos from "../chapters/Cap02Pensamos";
import Cap03Trabajo from "../chapters/Cap03Trabajo";
import Cap04Sistema from "../chapters/Cap04Sistema";
import Cap05Entra from "../chapters/Cap05Entra";

// WTF/OS v7 "La Película" (ver STORYTELLING.md):
// CAP 00 APERTURA → CAP 01 QUIÉNES SOMOS → CAP 02 CÓMO PENSAMOS →
// CAP 03 CON QUIÉN TRABAJAMOS → CAP 04 EL SISTEMA (clímax) → CAP 05 ENTRÁ
const LandingPage = () => (
  <ChapterProvider>
    <main className="overflow-x-clip" data-testid="landing-page">
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navigation />
      <Cap00Hero />
      <Cap01Quienes />
      <Cap02Pensamos />
      <Cap03Trabajo />
      <Cap04Sistema />
      <Cap05Entra />
      <Footer />
    </main>
  </ChapterProvider>
);

export default LandingPage;
