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
    subLine1: "Operar como sistema no es una mejora incremental.",
    subLine2: "Es otra forma de construir marca.",
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
    subLine1: "Operating as a system is not an incremental upgrade.",
    subLine2: "It is another way to build a brand.",
    points: [
      { label: "More speed", desc: "From brief to first delivery with more agility." },
      { label: "More consistency", desc: "A clearer brand across every channel, market and format." },
      { label: "More adaptability", desc: "Creative that adjusts to audiences, contexts and needs." },
      { label: "Less friction", desc: "An integrated model of strategy, creativity, production and execution." },
      { label: "Better budget", desc: "More intelligence applied to every output." },
      { label: "More learning", desc: "A system that improves every cycle, it doesn't end at delivery." },
    ],
  },
  pt: {
    kicker: "O que resolve",
    headline: [<>O que as marcas ganham</>, <b key="o">quando operam como sistema.</b>],
    subLine1: "Operar como sistema não é uma melhoria incremental.",
    subLine2: "É outra forma de construir marca.",
    points: [
      { label: "Mais velocidade", desc: "Do brief à primeira entrega com mais agilidade." },
      { label: "Mais consistência", desc: "Uma marca mais clara em todos os canais, mercados e formatos." },
      { label: "Mais adaptação", desc: "Criatividade que se ajusta a audiências, contextos e necessidades." },
      { label: "Menos atrito", desc: "Um modelo integrado de estratégia, criatividade, produção e execução." },
      { label: "Melhor orçamento", desc: "Mais inteligência aplicada a cada output." },
      { label: "Mais aprendizado", desc: "Um sistema que melhora a cada ciclo, não termina na entrega." },
    ],
  },
};

const CHESS = "/assets/hero/why-chess.webp"; // ejército de ajedrez explotando: estrategia en movimiento

const WhySection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection theme={THEMES.night} id="v3-why" pad="py-14 md:py-20" className="overflow-hidden flex flex-col justify-center">
      {/* Fondo: ajedrez explotando, scrim más oscuro a la izquierda (texto) */}
      <div className="absolute inset-0 z-0">
        <img src={CHESS} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/26" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/68 to-[#0A0A0C]/10" />
        <div className="absolute inset-y-0 left-0 w-[68%] bg-gradient-to-r from-[#0A0A0C]/95 via-[#0A0A0C]/70 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-volt mb-6"
        >
          {c.kicker}
        </motion.p>

        <Headline size="section" className="max-w-5xl !text-[clamp(19px,3vw,43px)]" lines={c.headline} />

        <motion.p
          {...fadeUp}
          className="mt-6 max-w-3xl text-[18px] font-light leading-relaxed text-white/80 md:text-xl"
        >
          <span className="block">{c.subLine1}</span>
          <span className="block text-volt font-bold">{c.subLine2}</span>
        </motion.p>

        <div className="mt-8 max-w-5xl rounded-2xl border border-white/10 bg-[#050507]/58 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.42)] backdrop-blur-md md:rounded-3xl md:p-6">
          {c.points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative grid grid-cols-1 gap-1 overflow-hidden border-t border-current/15 py-4 transition-colors duration-300 first:border-t-0 md:grid-cols-[280px_1fr] md:gap-8 md:items-baseline hover:border-[#FF3B30]/70 hover:bg-white/[0.045]"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-[#FF3B30] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 bg-[#FF3B30]/80 transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <h3 className="relative text-lg font-semibold normal-case tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
                <span className="mr-3 align-middle font-mono text-sm text-volt transition-colors duration-300 group-hover:text-[#FF3B30]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.label}
              </h3>
              <p className="relative text-base font-light leading-snug opacity-60 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-90 md:text-lg">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
};

export default WhySection;
