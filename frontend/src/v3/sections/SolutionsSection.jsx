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
      <>Qué hace</>,
      <b key="s" className="inline-block bg-volt text-[#0A0A0C] px-3 py-1 leading-[1.0]">
        nuestro sistema.
      </b>,
    ],
    intro:
      "Diez capacidades. Un sistema operativo creativo propio, construido con 15 años de oficio, estrategia y producción; impulsado por IA y operado por un equipo senior para pensar mejor, moverse más rápido y hacer crecer marcas sin perder criterio.",
    services: [
      { name: "Brand Platforms", outcome: "El sistema operativo de la marca." },
      { name: "Contenido AI-first", outcome: "Volumen nativo, sin perder marca." },
      { name: "Creative Pods always-on", outcome: "Equipo dedicado, siempre encendido." },
      { name: "Contenido regional", outcome: "Una marca, varios mercados." },
      { name: "Campañas 360", outcome: "Del concepto al spot." },
      { name: "Social & Creators", outcome: "Operados como sistema, no posteo suelto." },
      { name: "Performance creativo", outcome: "Iteración guiada por data, no por ego." },
      { name: "Retail & E-commerce", outcome: "Contenido que vende en la conversión." },
      { name: "Brand Design Systems", outcome: "Diseño vivo que escala a cualquier mercado." },
      { name: "Adaptación regional", outcome: "Una idea, adaptada a cada mercado." },
    ],
  },
  en: {
    headline: [
      <>What our</>,
      <b key="s" className="inline-block bg-volt text-[#0A0A0C] px-3 py-1 leading-[1.0]">
        system does.
      </b>,
    ],
    intro:
      "Ten capabilities. Our own creative operating system, built on 15 years of craft, strategy and production; powered by AI and run by a senior team to think better, move faster and grow brands without losing judgment.",
    services: [
      { name: "Brand Platforms", outcome: "The brand's operating system." },
      { name: "AI-first Content", outcome: "Native volume, without losing the brand." },
      { name: "Always-on Creative Pods", outcome: "Dedicated team, always switched on." },
      { name: "Regional Content", outcome: "One brand, many markets." },
      { name: "360 Campaigns", outcome: "From concept to spot." },
      { name: "Social & Creators", outcome: "Run as a system, not loose posts." },
      { name: "Creative Performance", outcome: "Iteration guided by data, not ego." },
      { name: "Retail & E-commerce", outcome: "Content that sells at conversion." },
      { name: "Brand Design Systems", outcome: "Living design that scales to any market." },
      { name: "Regional Adaptation", outcome: "One idea, adapted to each market." },
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
