import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

const ENGINE_BG = "/assets/hero/engine-horse.jpg"; // caballo negro en humo (motivo de marca WTF)
const EASE = [0.22, 1, 0.36, 1];

// Sección 3 — INFINITY ENGINE. El reveal del sistema operativo creativo de WTF:
// el nombre + la definición, centrados; los 5 verbos anclados al pie (tease de
// The model). (archivo histórico SystemSection.jsx; ahora es "Infinity Engine")
// Copy bilingüe (es | en): se consume con useLang(). El nombre "Infinity Engine"
// y la firma EN se mantienen idénticos en ambos idiomas.
const COPY = {
  es: {
    kicker: "El sistema operativo",
    definition:
      "15 años de estrategia, oficio y producción convertidos en nuestro propio sistema operativo creativo: un modelo AI-first que piensa, produce, mueve, aprende y crece. Con una velocidad, calidad y cantidad que antes ni soñábamos.",
    verbs: ["Piensa", "Produce", "Mueve", "Aprende", "Crece"],
  },
  en: {
    kicker: "The operating system",
    definition:
      "15 years of strategy, craft and production turned into our own creative operating system: an AI-first model that thinks, produces, moves, learns and grows. With a speed, quality and volume we once only dreamed of.",
    verbs: ["Think", "Produce", "Move", "Learn", "Grow"],
  },
};

const SystemSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
  <ThemeSection theme={THEMES.night} id="v3-engine" className="flex flex-col overflow-hidden">
    {/* Fondo: caballo negro en humo (motivo de marca), con scrim para legibilidad */}
    <div className="absolute inset-0 z-0">
      <img src={ENGINE_BG} alt="" aria-hidden className="h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[#0A0A0C]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 via-transparent to-[#0A0A0C]/95" />
    </div>

    {/* Bloque centrado */}
    <div className="relative z-10 flex-1 container mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center">
      {/* Kicker */}
      <motion.p
        {...fadeUp}
        className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-volt mb-8"
      >
        {c.kicker}
      </motion.p>

      {/* Nombre grande (reveal del OS) */}
      <motion.p
        role="heading"
        aria-level={2}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="font-thin uppercase tracking-[0.02em] leading-[0.95] text-[clamp(46px,9vw,140px)]"
      >
        Infinity <span className="italic font-bold text-volt">Engine</span>
      </motion.p>

      {/* Firma EN */}
      <motion.p
        {...fadeUp}
        className="mt-6 font-hud text-[10px] md:text-xs tracking-[0.22em] uppercase opacity-40"
      >
        The AI creative operating system for modern brands
      </motion.p>

      {/* Definición */}
      <motion.p
        {...fadeUp}
        className="mt-10 text-base md:text-lg font-light max-w-2xl opacity-60 leading-relaxed"
      >
        {c.definition}
      </motion.p>
    </div>

    {/* Los 5 verbos al pie (tease de The model) */}
    <div className="relative z-10 container mx-auto px-6 md:px-12 pt-10">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xl md:text-2xl font-bold tracking-tight">
        {c.verbs.map((v, i) => (
          <motion.span
            key={v}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-x-4"
          >
            {v}
            {i < c.verbs.length - 1 && <span className="text-volt font-normal">·</span>}
          </motion.span>
        ))}
      </div>
    </div>
  </ThemeSection>
  );
};

export default SystemSection;
