import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import { useLang } from "../i18n/LangContext";

// Sección 6 — WHY WTF. Senior thinking. Small-team speed. AI-scale output.
// Cinco puntos en lista editorial (divisorias finas) + payoff.
// Copy bilingüe (es | en): se consume con useLang(). El headline va en inglés en
// ambos idiomas (línea de marca).
const COPY = {
  es: {
    kicker: "Por qué WTF",
    headline: [<>We don’t scale teams.</>, <b key="o">We scale thinking.</b>],
    subPre:
      "Un equipo senior, compacto y conectado, diseñado para pensar mejor, moverse más rápido, con criterio, autonomía y una forma de trabajo capaz de convertir estrategia, creatividad e IA en ",
    subEmph: "impacto real",
    points: [
      { label: "Independientes", desc: "Menos estructura, más decisión." },
      { label: "AI-first", desc: "IA integrada desde el brief, no agregada al final." },
      { label: "Regional by design", desc: "Marcas hechas para moverse entre mercados." },
      { label: "Human always", desc: "La máquina acelera, el talento decide." },
      { label: "Battle-tested", desc: "15 años, marcas reales, problemas reales." },
    ],
  },
  en: {
    kicker: "Why WTF",
    headline: [<>We don’t scale teams.</>, <b key="o">We scale thinking.</b>],
    subPre:
      "A senior team, compact and connected, built to think better and move faster, with judgment, autonomy and a way of working that turns strategy, creativity and AI into ",
    subEmph: "real impact",
    points: [
      { label: "Independent", desc: "Less structure, more decision." },
      { label: "AI-first", desc: "AI built in from the brief, not bolted on at the end." },
      { label: "Regional by design", desc: "Brands made to move across markets." },
      { label: "Human always", desc: "The machine accelerates, the talent decides." },
      { label: "Battle-tested", desc: "15 years, real brands, real problems." },
    ],
  },
};

const SHEEP = "/assets/hero/why-sheep.jpg"; // oveja negra entre las blancas (los distintos)

const WhySection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection theme={THEMES.night} id="v3-why" pad="py-14 md:py-20" className="overflow-hidden flex flex-col justify-center">
      {/* Fondo: la oveja negra entre las blancas, scrim más oscuro a la izquierda (texto) */}
      <div className="absolute inset-0 z-0">
        <img src={SHEEP} alt="" aria-hidden="true" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/90 via-[#0A0A0C]/55 to-[#0A0A0C]/25" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-volt mb-6"
        >
          {c.kicker}
        </motion.p>

        <Headline size="section" className="max-w-6xl" lines={c.headline} />

        <motion.p
          {...fadeUp}
          className="mt-6 max-w-3xl text-base md:text-lg font-light leading-relaxed text-white/80"
        >
          {c.subPre}
          <span className="text-volt font-bold">{c.subEmph}</span>.
        </motion.p>

        <div className="mt-8 max-w-4xl">
          {c.points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-1 md:gap-8 py-4 border-t border-current/15 md:items-baseline"
            >
              <h3 className="text-lg md:text-2xl font-bold normal-case tracking-tight">
                <span className="font-mono text-sm text-volt mr-3 align-middle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.label}
              </h3>
              <p className="text-base md:text-lg font-light opacity-60 leading-snug">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
};

export default WhySection;
