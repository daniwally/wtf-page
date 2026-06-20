import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";

// El bloque VOLT — el momento-clímax. La línea Monks + el loop mapeado.
const STEPS = [
  { n: "01", title: "Pensar", en: "Consult", desc: "Estrategia, insight, concepto." },
  { n: "02", title: "Hacer", en: "Orchestrate", desc: "Producción rápida, con craft." },
  { n: "03", title: "Mover", en: "Execute", desc: "Activación en los canales correctos." },
  { n: "04", title: "Aprender", en: "Measure", desc: "Data, señales, respuestas reales." },
  { n: "05", title: "Crecer", en: "Scale", desc: "Optimizar y repetir lo que funciona." },
];

const OrchestrateSection = () => (
  <ThemeSection theme={THEMES.volt} id="v3-orchestrate">
    <div className="container mx-auto px-6 md:px-12">
      <Headline
        size="section"
        className="max-w-4xl"
        lines={[<>Dejá de automatizar.</>, <b key="o">Empezá a orquestar.</b>]}
      />
      <motion.p {...fadeUp} className="mt-6 text-lg md:text-xl font-semibold max-w-2xl">
        Un solo flujo donde estrategia, creatividad, producción y medios
        funcionan como un sistema vivo.
      </motion.p>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl md:rounded-3xl p-5 md:p-6 bg-[#0A0A0C] text-[#F4F1E8] min-h-[180px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs opacity-50">{s.n}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-volt">{s.en}</span>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-black tracking-tight">{s.title}</p>
              <p className="text-xs md:text-sm font-normal opacity-60 mt-1">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </ThemeSection>
);

export default OrchestrateSection;
