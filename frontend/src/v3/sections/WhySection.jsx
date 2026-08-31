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
    kicker: "Qué resolvemos",
    headline: [<>Lo que ganan las marcas</>, <b key="o">cuando operan como sistema.</b>],
    subLine1: "Operar como sistema no es una mejora incremental.",
    subLine2: "Es otra forma de construir marca.",
    points: [
      { label: "Más velocidad", desc: "Del brief a la primera entrega 10 veces más rápido." },
      { label: "Más consistencia", desc: "Una marca más clara y eficiente en cada canal y formato." },
      { label: "Más adaptación", desc: "Una idea se vuelve decenas de versiones por audiencia y contexto, sin volver a producir." },
      { label: "Menos fricción", desc: "Estrategia, creatividad, producción y ejecución en un solo equipo: cero handoffs." },
      { label: "Mejor presupuesto", desc: "20+ herramientas de IA aplicadas a cada output: el presupuesto rinde en piezas, no en overhead." },
      { label: "Más aprendizaje", desc: "Un sistema que mejora y aprende con cada ciclo." },
    ],
  },
  en: {
    kicker: "What we solve",
    headline: [<>What brands gain</>, <b key="o">when they operate as a system.</b>],
    subLine1: "Operating as a system is not an incremental upgrade.",
    subLine2: "It is another way to build a brand.",
    points: [
      { label: "More speed", desc: "From brief to first delivery 10 times faster." },
      { label: "More consistency", desc: "A clearer, more efficient brand across every channel and format." },
      { label: "More adaptability", desc: "One idea becomes dozens of versions per audience and context, without reshooting." },
      { label: "Less friction", desc: "Strategy, creative, production and execution in one team: zero handoffs." },
      { label: "Better budget", desc: "20+ AI tools applied to every output: budget goes to pieces, not overhead." },
      { label: "More learning", desc: "A system that improves and learns with every cycle." },
    ],
  },
  pt: {
    kicker: "O que resolvemos",
    headline: [<>O que as marcas ganham</>, <b key="o">quando operam como sistema.</b>],
    subLine1: "Operar como sistema não é uma melhoria incremental.",
    subLine2: "É outra forma de construir marca.",
    points: [
      { label: "Mais velocidade", desc: "Do brief à primeira entrega 10 vezes mais rápido." },
      { label: "Mais consistência", desc: "Uma marca mais clara e eficiente em cada canal e formato." },
      { label: "Mais adaptação", desc: "Uma ideia vira dezenas de versões por audiência e contexto, sem produzir de novo." },
      { label: "Menos atrito", desc: "Estratégia, criatividade, produção e execução em um só time: zero handoffs." },
      { label: "Melhor orçamento", desc: "20+ ferramentas de IA aplicadas a cada output: o orçamento rende em peças, não em overhead." },
      { label: "Mais aprendizado", desc: "Um sistema que melhora e aprende a cada ciclo." },
    ],
  },
};

// Guepardo corriendo sobre el agua (aprobado 2026-07-06): velocidad literal,
// y el único slide CLARO del tramo (respiro entre Orchestrate y el Statement).
// Anteriores en assets/hero: why-chess-king.webp, why-chess.webp, why-chess.mp4.
const CHEETAH_IMG = "/assets/hero/why-cheetah.webp";

const WhySection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection theme={THEMES.night} id="v3-why" pad="py-14 md:py-20" className="overflow-hidden flex flex-col justify-center">
      {/* Fondo: guepardo sobre el agua. Slide claro: texto en tinta, sin scrims
          pesados; solo un velo suave arriba-izquierda para el headline. El
          fondo asienta con settle de escala (1.04→1), transform only. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={CHEETAH_IMG}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover object-center"
        />
        {/* Velo superior: los textos blancos leen sobre el cielo claro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-[#0A0A0C]/15 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-1 flex-col">
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-white mb-6"
        >
          {c.kicker}
        </motion.p>

        <Headline size="section" className="max-w-5xl !text-[clamp(21px,3.4vw,49px)]" lines={c.headline} />

        <motion.p
          {...fadeUp}
          className="mt-6 max-w-3xl text-[18px] font-light leading-relaxed text-white/80 md:text-xl"
        >
          <span className="block">{c.subLine1}</span>
          <span className="block font-bold text-white">{c.subLine2}</span>
        </motion.p>

        {/* 6 cards individuales al PIE: la franja media queda libre para ver
            al guepardo corriendo (la imagen ES el argumento de velocidad).
            Cards de vidrio claro con texto en tinta, hover con borde volt. */}
        <div className="mt-auto grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {c.points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-xl border border-[#0A0A0C]/10 bg-white/60 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-volt md:rounded-2xl md:p-4"
            >
              <span className="font-mono text-[11px] text-volt">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 text-sm font-bold normal-case leading-tight tracking-tight text-[#0A0A0C] md:text-base">
                {p.label}
              </h3>
              <p className="mt-1.5 text-[11px] font-normal leading-snug text-[#0A0A0C]/65 md:text-xs">
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
