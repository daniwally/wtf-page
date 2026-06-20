import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import Card from "../ui/Card";

const SOLUTIONS = [
  { name: "Brand Systems", outcome: "Sistemas de diseño vivos que escalan a cualquier marca y mercado." },
  { name: "Campañas 360°", outcome: "Spots y branded content con calidad cinematográfica." },
  { name: "Image + Key Visuals", outcome: "Identidad visual, gráfica, social assets, packaging." },
  { name: "Contenido Ilimitado", outcome: "UGC, talking heads, avatares, adaptación multi-formato." },
  { name: "Performance Creativo", outcome: "Variantes A/B e iteración guiada por data, no por ego." },
  { name: "Social First", outcome: "Nativo de cada plataforma: TikTok, Reels, YouTube, Stories." },
];

const SolutionsSection = () => (
  <ThemeSection theme={THEMES.bone} id="v3-soluciones">
    <div className="container mx-auto px-6 md:px-12">
      <Headline
        size="section"
        className="max-w-4xl"
        lines={[<>Mismo concepto,</>, <b key="d">distinto sistema.</b>]}
      />
      <motion.p {...fadeUp} className="mt-6 text-lg md:text-xl font-normal max-w-2xl opacity-60">
        No se trata de pensar distinto. Se trata de ejecutar distinto.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
        {SOLUTIONS.map((s, i) => (
          <Card key={s.name} tone="voltline" index={i} className="min-h-[180px] flex flex-col justify-between">
            <span className="font-mono text-xs opacity-40">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-xl font-bold normal-case tracking-tight mb-2">{s.name}</h3>
              <p className="text-sm font-normal opacity-60">{s.outcome}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </ThemeSection>
);

export default SolutionsSection;
