import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

const ENGINE_HORSE_BG = "/assets/hero/engine-horse.webp"; // caballo negro en humo (motivo de marca WTF)
const EASE = [0.22, 1, 0.36, 1];

// Sección 3 — INFINITY ENGINE. El reveal del sistema operativo creativo de WTF.
// Tipografía y animación adaptadas del "animated hero" de twblocks/21st.dev
// (Hero5): título text-5xl/7xl tracking-tighter con palabra rotante en
// semibold (spring stiffness 50, ciclo 2s, entra desde abajo y sale hacia
// arriba) y párrafo text-lg/xl leading-relaxed tracking-tight. Todo en Inter.
// La palabra rotante recorre los 5 verbos del sistema (Think·Create·Produce·
// Move·Learn) en el idioma activo.
const COPY = {
  es: {
    kicker: "No es una herramienta. Es el sistema.",
    words: ["piensa.", "crea.", "produce.", "mueve.", "aprende."],
    definition:
      "Un motor propio, nuestro sistema operativo que integra estrategia, creatividad, producción, tecnología, data e inteligencia artificial para acelerar la comunicación de las marcas sin perder profundidad, criterio ni consistencia.",
  },
  en: {
    kicker: "Not a tool. The system.",
    words: ["thinks.", "creates.", "produces.", "moves.", "learns."],
    definition:
      "An engine of our own, our operating system integrating strategy, creativity, production, technology, data and artificial intelligence to accelerate brand communication without losing depth, judgment or consistency.",
  },
  pt: {
    kicker: "Não é uma ferramenta. É o sistema.",
    words: ["pensa.", "cria.", "produz.", "move.", "aprende."],
    definition:
      "Um motor próprio, nosso sistema operacional que integra estratégia, criatividade, produção, tecnologia, dados e inteligência artificial para acelerar a comunicação das marcas sem perder profundidade, critério ou consistência.",
  },
};

const SystemSection = ({ id = "v3-engine" }) => {
  const { lang } = useLang();
  const c = COPY[lang];

  // Rotación de la palabra (mecánica exacta del Hero5): avanza cada 2s y
  // vuelve al inicio al llegar a la última.
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => c.words, [c.words]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWordIndex(wordIndex === words.length - 1 ? 0 : wordIndex + 1);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [wordIndex, words]);

  return (
    <ThemeSection theme={THEMES.night} id={id} className="flex flex-col overflow-hidden">
      {/* Fondo: caballo negro en humo (motivo de marca), con scrim para legibilidad */}
      <div className="absolute inset-0 z-0">
        <img src={ENGINE_HORSE_BG} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 via-transparent to-[#0A0A0C]/95" />
      </div>

      {/* Bloque centrado (layout del Hero5: título + slot rotante + párrafo) */}
      <div className="relative z-10 flex-1 container mx-auto px-6 pt-10 pb-24 md:px-12 md:pt-14 md:pb-28 text-center flex flex-col items-center justify-center">
        {/* Kicker */}
        <motion.p
          {...fadeUp}
          className="mb-8 w-full text-center font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-volt"
        >
          {c.kicker}
        </motion.p>

        {/* Nombre + verbo rotante */}
        <motion.h2
          initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.95, ease: EASE }}
          className="max-w-none text-5xl md:text-7xl tracking-tighter text-center font-normal normal-case leading-[1.02]"
        >
          {/* Nombre gigante (escala display original); el verbo rotante queda
              en la escala del Hero5 debajo, como bajada viva. */}
          <span className="block text-[clamp(56px,9.5vw,150px)] leading-[0.95]">
            Infinity <span className="italic font-bold text-volt">Engine</span>
          </span>
          <span className="relative mt-8 flex w-full justify-center overflow-hidden text-center md:mt-12 md:pb-4 md:pt-1">
            &nbsp;
            {words.map((word, index) => (
              <motion.span
                key={index}
                className="absolute font-semibold"
                initial={{ opacity: 0, y: "-100" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  wordIndex === index
                    ? { y: 0, opacity: 1 }
                    : { y: wordIndex > index ? -150 : 150, opacity: 0 }
                }
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h2>

      </div>

      {/* Al pie: firma EN + definición (tipografía del párrafo del Hero5) */}
      <div className="absolute inset-x-0 bottom-10 z-10 container mx-auto px-6 md:bottom-14 md:px-12">
        <motion.p
          {...fadeUp}
          className="w-full text-center font-hud text-xs md:text-sm tracking-[0.22em] uppercase opacity-50"
        >
          The AI creative operating system for modern brands
        </motion.p>
        <motion.p
          {...fadeUp}
          className="mx-auto mt-5 max-w-3xl text-center text-base md:text-lg leading-relaxed tracking-tight text-cream/80"
        >
          {c.definition}
        </motion.p>
      </div>
    </ThemeSection>
  );
};

export default SystemSection;
