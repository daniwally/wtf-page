import { motion } from "framer-motion";
import Counter from "../../components/motion/Counter";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import Card from "../ui/Card";
import { SectionIntro } from "../ui/Card";

const MODULES = [
  { name: "UGC Engine", outcome: "Contenido nativo que no parece publicidad." },
  { name: "Video Engine", outcome: "Del guión a la pantalla sin pasar por el rodaje." },
  { name: "Image Studio", outcome: "Key visuals sin límite de iteración." },
  { name: "Copy Engine", outcome: "Palabras entrenadas con 15 años de oficio." },
  { name: "Research Lab", outcome: "Audiencias decodificadas antes del brief." },
  { name: "Ads Studio", outcome: "Piezas que performan desde el día uno." },
  { name: "Analytics Hub", outcome: "Señales que vuelven al sistema y lo afinan." },
  { name: "Brand Systems", outcome: "Identidades que escalan a cualquier mercado." },
];

const METRICS = [
  { value: 10, suffix: "X", label: "más rápido" },
  { value: 48, suffix: "H", label: "a primera entrega" },
  { static: "∞", label: "iteraciones" },
  { value: 100, suffix: "%", label: "nuestro" },
];

const SystemSection = () => (
  <ThemeSection theme={THEMES.night} id="v2-sistema">
    <div className="container mx-auto px-6 md:px-12">
      <SectionIntro>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-volt mb-6">El Sistema</p>
        <Headline
          size="section"
          className="max-w-4xl"
          lines={[
            <>No usamos IA. La integramos.</>,
            <b key="c" className="text-volt">
              El criterio creativo escala marcas.
            </b>,
          ]}
        />
        <motion.p {...fadeUp} className="mt-6 text-lg font-normal max-w-2xl opacity-60">
          La IA escala contenidos. El criterio escala marcas. No te contamos cómo
          funciona: te mostramos lo que produce.
        </motion.p>
      </SectionIntro>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {MODULES.map((m, i) => (
          <Card key={m.name} tone="dark" index={i} className="min-h-[180px] flex flex-col justify-between">
            <span className="font-mono text-xs opacity-40">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-lg md:text-xl font-bold normal-case tracking-tight mb-2">{m.name}</h3>
              <p className="text-sm font-normal opacity-50">{m.outcome}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
        {METRICS.map((m) => (
          <div key={m.label} className="text-center">
            <Counter
              value={m.value}
              suffix={m.suffix}
              static={m.static}
              className="font-black text-5xl md:text-7xl text-volt block mb-2"
            />
            <p className="text-xs uppercase tracking-[0.2em] opacity-50">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  </ThemeSection>
);

export default SystemSection;
