import { motion, useReducedMotion } from "framer-motion";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";

// Expo.out — easing premium (ui-ux-pro-max, estilo "Modern Dark Cinema").
const EXPO = [0.16, 1, 0.3, 1];
const STATEMENT_BG = "/assets/hero/closing-red.jpg"; // retrato editorial rojo

// Slide-statement (después de Por qué WTF). Una línea-manifiesto en inglés con
// reveal RACK-FOCUS (blur→nítido + fade), orquestado desde el PADRE (patrón
// RevealLines, confiable con scroll-snap) y con stagger. Glow rojo estático por
// text-shadow (siempre presente, no depende de la animación). Maneja
// prefers-reduced-motion (cae a fade de opacity).
const StatementSection = () => {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
  };

  const accentV = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { scaleX: 0, opacity: 0 },
        visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: EXPO } },
      };

  const lineV = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } }
    : {
        hidden: { opacity: 0, y: 26, filter: "blur(16px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: EXPO } },
      };

  return (
    <ThemeSection
      theme={THEMES.night}
      id="v3-statement"
      className="flex items-center justify-center text-center overflow-hidden"
    >
      {/* Fondo: retrato editorial rojo, con velo para que el statement lea */}
      <div className="absolute inset-0 z-0">
        <img
          src={STATEMENT_BG}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A0A0C]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/45 via-[#0A0A0C]/25 to-[#0A0A0C]/55" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center"
      >
        {/* Acento rojo */}
        <motion.div
          variants={accentV}
          className="mb-10 md:mb-14 h-px w-20 md:w-28 bg-white/40 origin-center"
        />

        <h2 className="uppercase tracking-tight leading-[1.05] max-w-6xl">
          {/* Setup (hairline) */}
          <motion.span
            variants={lineV}
            className="block font-thin text-[clamp(20px,2.6vw,38px)] text-white/85"
          >
            AI makes us faster.
          </motion.span>

          {/* Remate (bold volt) + glow rojo estático */}
          <motion.span
            variants={lineV}
            className="mt-1 block italic font-thin text-white text-[clamp(28px,3.8vw,58px)]"
          >
            Experience makes us dangerous.
          </motion.span>
          <motion.span
            variants={lineV}
            className="mt-8 md:mt-10 block font-hud text-xs md:text-sm tracking-[0.32em] text-white/55"
          >
            #wtfrules
          </motion.span>
        </h2>
      </motion.div>
    </ThemeSection>
  );
};

export default StatementSection;
