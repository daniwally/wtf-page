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
    kicker: "Qué resuelve",
    headline: [<>Lo que las marcas ganan</>, <b key="o">cuando operan como sistema.</b>],
    subPre:
      "Operar como sistema no es una mejora incremental. Es ",
    subEmph: "otra forma de construir marca",
    points: [
      { label: "Más velocidad", desc: "Del brief a la primera entrega con mayor agilidad." },
      { label: "Más consistencia", desc: "Una marca más clara en todos sus canales, mercados y formatos." },
      { label: "Más adaptación", desc: "Creatividad que se ajusta a audiencias, contextos y necesidades." },
      { label: "Menos fricción", desc: "Un modelo integrado de estrategia, creatividad, producción y ejecución." },
      { label: "Mejor presupuesto", desc: "Más inteligencia aplicada a cada output." },
      { label: "Más aprendizaje", desc: "Un sistema que mejora con cada ciclo, no que termina en la entrega." },
    ],
  },
  en: {
    kicker: "What it solves",
    headline: [<>What brands gain</>, <b key="o">when they operate as a system.</b>],
    subPre:
      "Operating as a system is not an incremental upgrade. It is ",
    subEmph: "another way to build a brand",
    points: [
      { label: "More speed", desc: "From brief to first delivery with more agility." },
      { label: "More consistency", desc: "A clearer brand across every channel, market and format." },
      { label: "More adaptability", desc: "Creative that adjusts to audiences, contexts and needs." },
      { label: "Less friction", desc: "An integrated model of strategy, creativity, production and execution." },
      { label: "Better budget", desc: "More intelligence applied to every output." },
      { label: "More learning", desc: "A system that improves every cycle, it doesn't end at delivery." },
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

        <Headline size="section" className="max-w-6xl !text-[clamp(27px,4.25vw,61px)]" lines={c.headline} />

        <motion.p
          {...fadeUp}
          className="mt-6 max-w-3xl text-base md:text-lg font-light leading-relaxed text-white/80"
        >
          {c.subPre}
          <span className="text-volt font-bold">{c.subEmph}</span>.
        </motion.p>

        <div className="mt-8 max-w-5xl">
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
