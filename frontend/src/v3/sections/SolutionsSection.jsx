import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import Card from "../ui/Card";
import { useLang } from "../i18n/LangContext";

// Sección 5 — WHAT WE DO. Las 10 capacidades que opera el sistema, sobre la
// figura en movimiento (salto + trazo rosa): energía, el sistema que avanza.
// Sección OSCURA (coherente con el resto del sitio): velo oscuro sobre la
// figura + cards de vidrio oscuro con texto claro.
// (archivo histórico SolutionsSection.jsx; ahora es "What we do")
// Copy bilingüe (es | en): se consume con useLang().
const SOL_BG = "/assets/hero/movement-jump.jpg"; // figura en salto + swirl rosa (movimiento)

const COPY = {
  es: {
    headline: [
      <>No vendemos servicios.</>,
      <b key="s" className="inline-block bg-volt text-[#0A0A0C] px-3 py-1 leading-[1.0]">
        Operamos sistemas.
      </b>,
    ],
    intro:
      "Siete sistemas que se activan según lo que la marca necesita: construir, sostener, producir, lanzar, escalar, vender y conversar.",
    services: [
      { name: "Brand Platform System", outcome: "Posicionamiento, narrativa, identidad, tono y plataforma de marca." },
      { name: "Always-on Content System", outcome: "Ecosistemas de contenido para marcas con presencia constante." },
      { name: "AI Production System", outcome: "Producción acelerada de imagen, video, key visuals y adaptaciones con IA." },
      { name: "Launch System", outcome: "Lanzamientos de productos, campañas y plataformas comerciales." },
      { name: "Regional Rollout System", outcome: "Adaptación y ejecución para marcas que operan en varios mercados." },
      { name: "Retail & E-commerce System", outcome: "Creatividad para punto de venta, e-commerce y conversión." },
      { name: "Social & Culture System", outcome: "Contenido, conversación, social media, influencers y cultura." },
    ],
  },
  en: {
    headline: [
      <>We don't sell services.</>,
      <b key="s" className="inline-block bg-volt text-[#0A0A0C] px-3 py-1 leading-[1.0]">
        We operate systems.
      </b>,
    ],
    intro:
      "Seven systems that activate based on what the brand needs: build, sustain, produce, launch, scale, sell and converse.",
    services: [
      { name: "Brand Platform System", outcome: "Positioning, narrative, identity, tone and brand platform." },
      { name: "Always-on Content System", outcome: "Content ecosystems for brands that need constant presence." },
      { name: "AI Production System", outcome: "Accelerated production of image, video, key visuals and adaptations with AI." },
      { name: "Launch System", outcome: "Launches of products, campaigns and commercial platforms." },
      { name: "Regional Rollout System", outcome: "Adaptation and execution for brands operating across markets." },
      { name: "Retail & E-commerce System", outcome: "Creative for retail, e-commerce and conversion." },
      { name: "Social & Culture System", outcome: "Content, conversation, social media, influencers and culture." },
    ],
  },
};

const SolutionsSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection theme={THEMES.night} id="v3-soluciones" pad="py-16 md:py-24" className="overflow-hidden flex flex-col justify-center">
      {/* Fondo: figura en salto + swirl rosa (movimiento), oscurecido para leer oscuro como el resto */}
      <div className="absolute inset-0 z-0">
        <img src={SOL_BG} alt="" aria-hidden className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/55 via-[#0A0A0C]/45 to-[#0A0A0C]/85" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <Headline
          size="section"
          className="max-w-4xl"
          lines={c.headline}
        />
        <motion.p {...fadeUp} className="mt-6 max-w-3xl text-base md:text-lg font-light leading-relaxed opacity-70">
          {c.intro}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-10">
          {c.services.map((s, i) => (
            <Card
              key={s.name}
              tone="dark"
              index={i}
              className="!p-5 min-h-[150px] flex flex-col justify-between !bg-white/[0.07] !border-white/15"
            >
              <span className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-base md:text-lg font-bold normal-case tracking-tight mb-1.5 leading-tight text-white">
                  {s.name}
                </h3>
                <p className="text-xs md:text-sm font-normal text-white/65 leading-snug">{s.outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
};

export default SolutionsSection;
