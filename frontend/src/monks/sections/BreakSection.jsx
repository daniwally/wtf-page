import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import Card from "../ui/Card";

const RIVALES = [
  { quien: "Las agencias grandes", falla: "Son lentas." },
  { quien: "Las productoras", falla: "Ejecutan sin estrategia." },
  { quien: "Los AI studios", falla: "Tienen herramientas sin calle." },
];

const BreakSection = () => (
  <ThemeSection theme={THEMES.bone} id="v2-break">
    <div className="container mx-auto px-6 md:px-12">
      <Headline
        size="section"
        className="max-w-4xl"
        lines={[
          <>No hacemos lo correcto.</>,
          <b key="f">Hacemos lo que funciona.</b>,
        ]}
      />

      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {RIVALES.map((r, i) => (
          <Card key={r.quien} tone="voltline" index={i}>
            <p className="text-xl md:text-2xl font-bold mb-2 opacity-40 line-through decoration-2">
              {r.quien}
            </p>
            <p className="text-base font-normal opacity-60">{r.falla}</p>
          </Card>
        ))}
      </div>

      <motion.div
        {...fadeUp}
        className="mt-6 rounded-2xl md:rounded-3xl p-8 md:p-10 bg-[#0A0A0C] text-[#F4F1E8] flex items-start gap-5"
      >
        <span className="shrink-0 w-12 h-12 rounded-full bg-volt text-black flex items-center justify-center">
          <Check size={24} strokeWidth={3} />
        </span>
        <p className="text-2xl md:text-4xl font-black tracking-tight leading-[1.05]">
          Nosotros tenemos lo que falta:{" "}
          <span className="text-volt">células con carácter, velocidad y experiencia real.</span>
        </p>
      </motion.div>
    </div>
  </ThemeSection>
);

export default BreakSection;
