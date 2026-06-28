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
    principle: "La necesidad define el sistema. No al revés.",
    services: [
      { name: "Brand Platform System", outcome: "Para marcas que necesitan posicionamiento, narrativa y tono que conecte con la cultura." },
      { name: "Always-on Content System", outcome: "Para marcas que necesitan presencia constante sin perder consistencia." },
      { name: "Launch System", outcome: "Para productos, campañas o plataformas que necesitan salir fuerte al mercado." },
      { name: "AI Production System", outcome: "Para producir más rápido, adaptar más y bajar fricción sin perder dirección creativa." },
      { name: "Regional Rollout System", outcome: "Para marcas que necesitan operar en varios países con coherencia y velocidad." },
      { name: "Retail & E-commerce System", outcome: "Para conectar marca, conversión, canales comerciales y contenido." },
      { name: "Social & Culture System", outcome: "Para marcas que necesitan estar en la conversación, lo social y la cultura." },
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
    principle: "The need defines the system. Not the other way around.",
    services: [
      { name: "Brand Platform System", outcome: "For brands that need positioning, narrative and tone that connects with culture." },
      { name: "Always-on Content System", outcome: "For brands that need constant presence without losing consistency." },
      { name: "Launch System", outcome: "For products, campaigns or platforms that need to launch strong." },
      { name: "AI Production System", outcome: "To produce faster, adapt more and reduce friction without losing creative direction." },
      { name: "Regional Rollout System", outcome: "For brands that need to operate across countries with coherence and speed." },
      { name: "Retail & E-commerce System", outcome: "To connect brand, conversion, commercial channels and content." },
      { name: "Social & Culture System", outcome: "For brands that need to be in the conversation, social and culture." },
    ],
  },
};

const SolutionsSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection theme={THEMES.night} id="v3-soluciones" pad="py-12 md:py-16" className="overflow-hidden flex flex-col justify-center">
      {/* Fondo: figura en salto + swirl rosa (movimiento), oscurecido para leer oscuro como el resto */}
      <div className="absolute inset-0 z-0">
        <img src={SOL_BG} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/55 via-[#0A0A0C]/45 to-[#0A0A0C]/85" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <Headline
          size="section"
          className="max-w-4xl !text-[clamp(29px,4.5vw,64px)]"
          lines={c.headline}
        />
        <motion.p {...fadeUp} className="mt-6 max-w-3xl text-lg md:text-xl font-light leading-relaxed opacity-70">
          {c.intro}
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-10">
          {c.services.map((s, i) => (
            <Card
              key={s.name}
              tone="dark"
              index={i}
              className="!p-5 min-h-[150px] flex flex-col justify-between !bg-[#0A0A0C]/85 !border-white/15"
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
        <motion.p
          {...fadeUp}
          className="mt-6 text-left font-hud text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/65"
        >
          {c.principle}
        </motion.p>
      </div>
    </ThemeSection>
  );
};

export default SolutionsSection;
