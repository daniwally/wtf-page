import Counter from "../../components/motion/Counter";
import { fadeUp } from "../../sections/shared";
import { motion } from "framer-motion";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";

const STATS = [
  { value: 15, suffix: "+", label: "Años" },
  { value: 300, suffix: "+", label: "Campañas" },
  { value: 10, suffix: "+", label: "Países" },
  { static: "∞", label: "Briefs destruidos" },
];

const FALL_VIDEO = "/assets/hero/salto.mp4"; // ejecutivo en caída libre (video del deck)
const FALL_POSTER = "/assets/hero/salto-poster.jpg";

// Segunda página = manifiesto centrado (sin cards) sobre el salto al vacío.
// Headline hairline + body, credenciales como NÚMEROS grandes (black 900) con
// dividers finos. Imagen de fondo full-bleed + scrim para legibilidad.
const ThesisSection = () => (
  <ThemeSection
    theme={THEMES.night}
    id="v3-thesis"
    pad="pt-32 pb-16 md:pt-44 md:pb-24"
    className="flex flex-col justify-center text-center"
  >
    {/* Fondo: salto al vacío (video del deck), con scrim para que el texto crema lea */}
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
      <div className="absolute inset-0 bg-[#0A0A0C]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/25 via-transparent to-[#0A0A0C]/70" />
    </div>
    <div className="container mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
      <Headline
        size="section"
        className="max-w-4xl"
        lines={[
          <>La creatividad</>,
          <>entrenada para</>,
          <b key="r" className="text-volt">
            reinterpretar.
          </b>,
        ]}
      />

      <motion.p
        {...fadeUp}
        className="mt-8 text-lg md:text-xl font-light max-w-xl opacity-55 leading-relaxed"
      >
        Construimos plataformas de comunicación, sistemas creativos y ecosistemas
        de contenido que conectan estrategia, creatividad, tecnología y data para
        que las marcas evolucionen, aprendan y escalen.
      </motion.p>

      {/* Credenciales: números grandes, sin cajas — separados por reglas finas */}
      <div className="mt-10 md:mt-14 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-y-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`flex flex-col items-center px-2 ${
              i % 2 === 1 ? "border-l border-white/10" : ""
            } md:border-l md:border-white/10 md:first:border-l-0`}
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              static={s.static}
              className={`font-black text-5xl md:text-7xl leading-none tabular-nums ${
                s.static ? "text-volt" : ""
              }`}
            />
            <span className="mt-3 text-[11px] md:text-xs font-medium uppercase tracking-[0.18em] opacity-45">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </ThemeSection>
);

export default ThesisSection;
