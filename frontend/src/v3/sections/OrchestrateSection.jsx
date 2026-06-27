import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import { useLang } from "../i18n/LangContext";

// Sección 4 — THE MODEL. Clímax cinematográfico: la mujer con antiparras (mood
// del hero) de fondo, sin el bloque naranja. El framework Think · Make · Move ·
// Learn · Grow en cards, con las descripciones del brief.
// (archivo histórico OrchestrateSection.jsx; ahora es "The model")
// Copy bilingüe (es | en): se consume con useLang(). Los verbos del loop
// (Think/Make/Move/Learn/Grow) van en inglés en ambos idiomas (etiquetas de marca).
const MODEL_BG = "/assets/hero/model-goggles.jpg"; // mujer con antiparras (mood del hero)

const COPY = {
  es: {
    headline: [<>No es workflow.</>, <b key="g">Es momentum.</b>],
    subPre: "Un sistema modular que conecta pensamiento estratégico, creatividad aplicada,",
    subPost: "producción acelerada, distribución inteligente y aprendizaje continuo.",
    steps: [
      { n: "01", title: "Pensar", en: "Think", desc: "Estrategia, negocio, marca, audiencia, posicionamiento." },
      { n: "02", title: "Crear", en: "Create", desc: "Ideas, conceptos, plataformas creativas, storytelling, identidad verbal y visual." },
      { n: "03", title: "Producir", en: "Produce", desc: "Contenido, campañas, piezas, assets, producción tradicional e IA aplicada." },
      { n: "04", title: "Mover", en: "Move", desc: "Social, medios, retail, CRM, e-commerce, influencers, distribución y adaptación por canal." },
      { n: "05", title: "Aprender", en: "Learn", desc: "Data, performance, optimización, aprendizajes, iteración y mejora continua." },
    ],
  },
  en: {
    headline: [<>It is not workflow.</>, <b key="g">It is momentum.</b>],
    subPre: "A modular system that connects strategic thinking, applied creativity,",
    subPost: "accelerated production, intelligent distribution and continuous learning.",
    steps: [
      { n: "01", title: "Think", en: "Think", desc: "Strategy, business, brand, audience, positioning." },
      { n: "02", title: "Create", en: "Create", desc: "Ideas, concepts, creative platforms, storytelling, verbal and visual identity." },
      { n: "03", title: "Produce", en: "Produce", desc: "Content, campaigns, pieces, assets, traditional production and applied AI." },
      { n: "04", title: "Move", en: "Move", desc: "Social, media, retail, CRM, e-commerce, influencers, distribution and per-channel adaptation." },
      { n: "05", title: "Learn", en: "Learn", desc: "Data, performance, optimization, learnings, iteration and continuous improvement." },
    ],
  },
};

const OrchestrateSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
  <ThemeSection theme={THEMES.night} id="v3-model" className="overflow-hidden flex flex-col justify-center">
    {/* Fondo: la mujer con antiparras (mood del hero), bien oscurecido */}
    <div className="absolute inset-0 z-0">
      <img src={MODEL_BG} alt="" aria-hidden className="h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[#0A0A0C]/28" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/65 via-[#0A0A0C]/8 to-[#0A0A0C]/38" />
    </div>

    <div className="relative z-10 container mx-auto px-6 md:px-12">
      <Headline
        size="section"
        className="max-w-4xl"
        lines={c.headline}
      />
      <motion.p {...fadeUp} className="mt-6 max-w-2xl text-base md:text-lg font-light leading-relaxed text-white/80">
        {c.subPre}
        <br className="hidden md:block" />
        {c.subPost}
      </motion.p>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {c.steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl md:rounded-3xl p-5 md:p-6 bg-[#0A0A0C]/70 backdrop-blur-md border border-white/10 text-[#F4F1E8] min-h-[200px] flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs opacity-50">{s.n}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-volt">{s.en}</span>
            </div>
            <div className="mt-10">
              <p className="text-xl md:text-2xl font-black tracking-tight">{s.title}</p>
              <p className="text-xs md:text-sm font-normal opacity-60 mt-1.5 leading-snug">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </ThemeSection>
  );
};

export default OrchestrateSection;
