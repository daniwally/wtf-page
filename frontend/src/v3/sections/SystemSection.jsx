import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

const ENGINE_HORSE_BG = "/assets/hero/engine-horse.jpg"; // caballo negro en humo (motivo de marca WTF)
const ENGINE_RED_BG = "/assets/hero/engine-red-helmet.jpg"; // casco rojo retro motorsport (prueba Infinity Engine)
const EASE = [0.22, 1, 0.36, 1];

// Sección 3 — INFINITY ENGINE. El reveal del sistema operativo creativo de WTF:
// el nombre + la definición, centrados; los 5 verbos anclados al pie (tease de
// The model). (archivo histórico SystemSection.jsx; ahora es "Infinity Engine")
// Copy bilingüe (es | en): se consume con useLang(). El nombre "Infinity Engine"
// y la firma EN se mantienen idénticos en ambos idiomas.
const COPY = {
  es: {
    kicker: "No es una herramienta. Es el sistema.",
    definition:
      "WTF integra estrategia, creatividad, producción, tecnología, data e inteligencia artificial en un modelo operativo diseñado para acelerar la comunicación de las marcas sin perder profundidad, criterio ni consistencia.",
    verbs: ["Pensar", "Crear", "Producir", "Mover", "Aprender"],
  },
  en: {
    kicker: "Not a tool. The system.",
    definition:
      "WTF integrates strategy, creativity, production, technology, data and artificial intelligence into one operating model built to accelerate brand communication without losing depth, judgment or consistency.",
    verbs: ["Think", "Create", "Produce", "Move", "Learn"],
  },
  pt: {
    kicker: "Não é uma ferramenta. É o sistema.",
    definition:
      "A WTF integra estratégia, criatividade, produção, tecnologia, dados e inteligência artificial em um modelo operacional criado para acelerar a comunicação das marcas sem perder profundidade, critério ou consistência.",
    verbs: ["Pensar", "Criar", "Produzir", "Mover", "Aprender"],
  },
};

const BG_VARIANTS = {
  horse: {
    src: ENGINE_HORSE_BG,
    scrims: (
      <>
        <div className="absolute inset-0 bg-[#0A0A0C]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 via-transparent to-[#0A0A0C]/95" />
      </>
    ),
  },
  red: {
    src: ENGINE_RED_BG,
    scrims: (
      <>
        <div className="absolute inset-0 bg-[#0A0A0C]/66" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/82 via-[#0A0A0C]/52 to-[#0A0A0C]/96" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/72" />
      </>
    ),
  },
};

const SystemSection = ({ variant = "horse", id = "v3-engine" }) => {
  const { lang } = useLang();
  const c = COPY[lang];
  const bg = BG_VARIANTS[variant] || BG_VARIANTS.horse;
  const isRedVariant = variant === "red";
  const definition =
    !isRedVariant && lang === "es"
      ? c.definition.replace("modelo operativo", "sistema operativo")
      : c.definition;
  return (
  <ThemeSection theme={THEMES.night} id={id} className="flex flex-col overflow-hidden">
    {/* Fondo: caballo negro en humo (motivo de marca), con scrim para legibilidad */}
    <div className="absolute inset-0 z-0">
      <img src={bg.src} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
      {bg.scrims}
    </div>

    {/* Bloque centrado */}
    <div className="relative z-10 flex-1 container mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center">
      {/* Kicker */}
      <motion.p
        {...fadeUp}
        className={`font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase ${
          isRedVariant ? "mb-6 translate-y-3 text-white/80" : "mb-8 w-full max-w-[min(88vw,1120px)] text-left text-volt"
        }`}
      >
        {c.kicker}
      </motion.p>

      {isRedVariant ? (
        <div className="inline-flex flex-col items-stretch">
          {/* Nombre grande (reveal del OS) */}
          <motion.h2
            initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.95, ease: EASE }}
            className="font-thin uppercase tracking-[0.02em] leading-[0.95] text-[clamp(46px,9vw,140px)]"
          >
            Infinity <span className="italic font-bold text-volt">Engine</span>
          </motion.h2>

          {/* Firma EN */}
          <motion.p
            {...fadeUp}
            className="mt-6 text-left font-hud text-xs md:text-[14px] tracking-[0.22em] uppercase opacity-40"
          >
            The AI creative operating system for modern brands
          </motion.p>
        </div>
      ) : (
        <>
        {/* Nombre grande (reveal del OS) */}
        <motion.h2
          initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.95, ease: EASE }}
          className="font-thin uppercase tracking-[0.02em] leading-[0.95] text-[clamp(46px,9vw,140px)]"
        >
          Infinity <span className="italic font-bold text-volt">Engine</span>
        </motion.h2>

        {/* Firma EN */}
        <motion.p
          {...fadeUp}
          className="mt-6 w-full max-w-[min(88vw,1120px)] text-right font-hud text-[10px] md:text-xs tracking-[0.22em] uppercase opacity-40"
        >
          The AI creative operating system for modern brands
        </motion.p>
        </>
      )}

      {isRedVariant && (
        <motion.p
          {...fadeUp}
          className="mt-10 w-full max-w-5xl text-right text-[17px] md:text-[21px] font-light leading-relaxed text-cream"
        >
          {definition}
        </motion.p>
      )}
    </div>

    {isRedVariant ? (
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
    ) : (
      <div className="relative z-10 container mx-auto px-6 md:px-12 pb-4 md:pb-5">
        <motion.p
          {...fadeUp}
          className="mx-auto max-w-5xl text-left text-[13px] md:text-[16px] font-light uppercase leading-relaxed text-cream/52"
        >
          {definition}
        </motion.p>
      </div>
    )}
  </ThemeSection>
  );
};

export default SystemSection;
