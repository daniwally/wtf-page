import { motion, useReducedMotion } from "framer-motion";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

// Expo.out — easing premium (estilo "Modern Dark Cinema").
const EXPO = [0.16, 1, 0.3, 1];
const FALL_VIDEO = "/assets/hero/dog-loop.mp4"; // perro con antiparras (video de marca)
const FALL_POSTER = "/assets/hero/dog-loop.jpg";

// Copy bilingüe (es | en): se consume con useLang(). Las líneas del díptico van como
// JSX (con sus <span className="font-bold">/<br/>) duplicadas por idioma, misma
// estructura, solo cambian las palabras. "Eso es WTF Agency" queda igual (marca).
const COPY = {
  es: {
    kicker: "The shift",
    before: (
      <>
        El mundo no necesita
        <br />
        <span className="font-bold">más campañas.</span>
      </>
    ),
    after: (
      <>
        <span className="font-thin">
          Necesita marcas
          <br />
          que se muevan a la
        </span>
        <br />
        <span className="font-bold">velocidad de la cultura.</span>
      </>
    ),
    insight:
      "Hoy no gana quien hace más campañas, gana quien aprende antes, se mueve mejor y escala sin perder criterio.",
    sign: "Eso es WTF Agency",
  },
  en: {
    kicker: "The shift",
    before: (
      <>
        The world doesn’t need
        <br />
        <span className="font-bold">more campaigns.</span>
      </>
    ),
    after: (
      <>
        <span className="font-thin">
          It needs brands
          <br />
          that move at the
        </span>
        <br />
        <span className="font-bold">speed of culture.</span>
      </>
    ),
    insight:
      "Today the winner isn’t who makes more campaigns, it’s who learns sooner, moves better and scales without losing judgment.",
    sign: "Eso es WTF Agency",
  },
};

// Sección 2 — THE SHIFT. Compuesta como un díptico "de esto → a esto":
// a la izquierda el viejo mandato (hairline, apagado); a la derecha el nuevo
// (bold, blanco, dominante). El divisor central volt ES el shift. Footer quieto
// con el insight + qué construimos. Orquestado desde el PADRE (variants +
// staggerChildren) — confiable con scroll-snap. (archivo histórico ThesisSection.)
const ThesisSection = () => {
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const c = COPY[lang];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
  };

  const fade = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EXPO } },
      };

  const ruleV = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }
    : {
        hidden: { scaleY: 0, opacity: 0 },
        visible: { scaleY: 1, opacity: 1, transition: { duration: 0.8, ease: EXPO } },
      };

  return (
    <ThemeSection
      theme={THEMES.night}
      id="v3-shift"
      pad="pt-28 pb-16 md:pt-32 md:pb-20"
      className="overflow-hidden flex flex-col justify-center"
    >
      {/* Fondo: el perro (video de marca), con scrim para que el texto lea */}
      <div className="absolute inset-0 z-0">
        <video
          src={FALL_VIDEO}
          poster={FALL_POSTER}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A0A0C]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/40 via-transparent to-[#0A0A0C]/85" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 container mx-auto px-6 md:px-12"
      >
        {/* Kicker */}
        <motion.p
          variants={fade}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-volt text-center mb-10 md:mb-14"
        >
          {c.kicker}
        </motion.p>

        {/* Díptico: viejo mandato → nuevo mandato */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-y-7 md:gap-x-10 lg:gap-x-14">
          {/* Antes (apagado, hairline) */}
          <motion.p
            variants={fade}
            className="text-center md:text-right font-thin uppercase tracking-[0.04em] leading-[1.15] text-white text-[clamp(20px,2.64vw,31px)]"
          >
            {c.before}
          </motion.p>

          {/* El shift: divisor vertical volt (desktop) / corto (mobile). El glow
              lo hace leer sobre el fondo oscuro: ES el quiebre. */}
          <motion.div
            variants={ruleV}
            aria-hidden
            className="hidden md:block self-stretch w-[2px] bg-volt origin-top justify-self-center shadow-[0_0_18px_rgba(255,59,48,0.55)]"
          />
          <motion.div
            variants={ruleV}
            aria-hidden
            className="md:hidden mx-auto h-10 w-[2px] bg-volt origin-center shadow-[0_0_18px_rgba(255,59,48,0.55)]"
          />

          {/* Ahora (dominante, bold, blanco) */}
          <motion.p
            variants={fade}
            role="heading"
            aria-level={2}
            className="text-center md:text-left font-normal uppercase tracking-[0.01em] leading-[1.15] text-white text-[clamp(20px,2.64vw,31px)]"
          >
            {c.after}
          </motion.p>
        </div>
      </motion.div>

      {/* Footer al pie: insight + firma, anclado al fondo de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EXPO, delay: 0.35 }}
        className="absolute bottom-0 inset-x-0 z-10 pb-12 md:pb-16 px-6 md:px-12 text-center"
      >
        <p className="mx-auto max-w-3xl text-sm md:text-lg font-light leading-relaxed text-white/30">
          {c.insight}
        </p>
        <p className="mt-6 font-hud font-light text-sm md:text-xl tracking-[0.28em] uppercase text-white/65">
          {c.sign}
        </p>
      </motion.div>
    </ThemeSection>
  );
};

export default ThesisSection;
