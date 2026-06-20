import Counter from "../../components/motion/Counter";
import { fadeUp } from "../../sections/shared";
import { motion } from "framer-motion";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";

const STATS = [
  { value: 15, suffix: "+", label: "Años" },
  { value: 200, suffix: "+", label: "Campañas" },
  { value: 10, suffix: "+", label: "Países" },
  { static: "∞", label: "Briefs destruidos" },
];

const ThesisSection = () => (
  <ThemeSection theme={THEMES.night} id="v2-thesis">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <Headline
            size="section"
            lines={[
              <>La creatividad</>,
              <>entrenada para</>,
              <b key="r" className="text-volt">
                reinterpretar.
              </b>,
            ]}
          />
          <motion.p {...fadeUp} className="mt-8 text-lg md:text-xl font-normal max-w-lg opacity-60">
            Construimos plataformas, sistemas creativos y ecosistemas de
            contenido que se adaptan, aprenden y escalan.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl md:rounded-3xl p-6 bg-white/[0.05] border border-white/10 flex flex-col gap-1"
            >
              <Counter
                value={s.value}
                suffix={s.suffix}
                static={s.static}
                className="font-black text-4xl md:text-6xl text-volt"
              />
              <span className="text-sm font-medium opacity-50">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </ThemeSection>
);

export default ThesisSection;
