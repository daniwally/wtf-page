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
const MODEL_BG = "/assets/hero/model-momentum-orange.jpg"; // figura en velocidad naranja (momentum)

const COPY = {
  es: {
    headline: [<>No es workflow.</>, <b key="g">Es momentum.</b>],
    subPre: "Un sistema modular que conecta pensamiento estratégico, creatividad aplicada,",
    subPost: "producción acelerada, distribución inteligente y aprendizaje continuo.",
    steps: [
      { n: "01", title: "Pensar", en: "Think", desc: "Del caos a la dirección. Leemos el brief, el negocio, la cultura, la audiencia y el contexto para encontrar el punto exacto desde donde una marca puede moverse." },
      { n: "02", title: "Crear", en: "Create", desc: "De la idea a la plataforma. Creamos conceptos que no mueren en una pieza: nacen para expandirse, adaptarse y construir valor en el tiempo." },
      { n: "03", title: "Producir", en: "Produce", desc: "De la pieza al ecosistema. Diseñamos y producimos contenido modular, escalable y consistente, combinando oficio creativo, producción real e inteligencia artificial." },
      { n: "04", title: "Mover", en: "Move", desc: "Del contenido al impacto. Activamos canales, audiencias, medios, social, retail, e-commerce e influencia para que la creatividad no solo exista, sino que circule, conecte y empuje la marca." },
      { n: "05", title: "Aprender", en: "Learn", desc: "De la entrega a la evolución. Cada output deja información, cada campaña deja señales y cada señal mejora el sistema que construye lo próximo." },
    ],
  },
  en: {
    headline: [<>It is not workflow.</>, <b key="g">It is momentum.</b>],
    subPre: "A modular system that connects strategic thinking, applied creativity,",
    subPost: "accelerated production, intelligent distribution and continuous learning.",
    steps: [
      { n: "01", title: "Think", en: "Think", desc: "From chaos to direction. We read the brief, the business, the culture, the audience and the context to find the exact point from where a brand can move." },
      { n: "02", title: "Create", en: "Create", desc: "From idea to platform. We create concepts that don't die in a single piece: they're born to expand, adapt and build value over time." },
      { n: "03", title: "Produce", en: "Produce", desc: "From piece to ecosystem. We design and produce modular, scalable and consistent content, combining creative craft, real production and artificial intelligence." },
      { n: "04", title: "Move", en: "Move", desc: "From content to impact. We activate channels, audiences, media, social, retail, e-commerce and influence so creativity doesn't just exist, but circulates, connects and pushes the brand." },
      { n: "05", title: "Learn", en: "Learn", desc: "From delivery to evolution. Every output leaves information, every campaign leaves signals, and every signal improves the system that builds what's next." },
    ],
  },
  pt: {
    headline: [<>Não é workflow.</>, <b key="g">É momentum.</b>],
    subPre: "Um sistema modular que conecta pensamento estratégico, criatividade aplicada,",
    subPost: "produção acelerada, distribuição inteligente e aprendizado contínuo.",
    steps: [
      { n: "01", title: "Pensar", en: "Think", desc: "Do caos à direção. Lemos o brief, o negócio, a cultura, a audiência e o contexto para encontrar o ponto exato de onde uma marca pode se mover." },
      { n: "02", title: "Criar", en: "Create", desc: "Da ideia à plataforma. Criamos conceitos que não morrem em uma peça: nascem para expandir, adaptar e construir valor ao longo do tempo." },
      { n: "03", title: "Produzir", en: "Produce", desc: "Da peça ao ecossistema. Criamos conteúdo modular, escalável e consistente, combinando craft criativo, produção real e inteligência artificial." },
      { n: "04", title: "Mover", en: "Move", desc: "Do conteúdo ao impacto. Ativamos canais, audiências, mídia, social, retail, e-commerce e influência para que a criatividade circule, conecte e mova a marca." },
      { n: "05", title: "Aprender", en: "Learn", desc: "Da entrega à evolução. Cada output deixa informação, cada campanha deixa sinais e cada sinal melhora o sistema que constrói o próximo passo." },
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
      <img src={MODEL_BG} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[#0A0A0C]/42" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/82 via-[#0A0A0C]/38 to-[#0A0A0C]/55" />
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
            className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#050507]/76 p-5 text-[#F4F1E8] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF3B30]/65 hover:bg-[#050507]/88 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:rounded-3xl md:p-6"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-[#FF3B30] transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 bg-[#FF3B30]/80 transition-transform duration-500 ease-out group-hover:scale-x-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,59,48,0.13),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex items-center justify-between">
              <span className="font-mono text-base opacity-50 transition-colors duration-300 group-hover:text-[#FF3B30] group-hover:opacity-100 md:text-lg">
                {s.n}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-volt transition-colors duration-300 group-hover:text-[#FF3B30]">
                {s.en}
              </span>
            </div>
            <div className="relative mt-10 transition-transform duration-300 group-hover:translate-y-[-2px]">
              <p className="text-xl font-black tracking-tight md:text-2xl">{s.title}</p>
              <p className="mt-1.5 text-xs font-normal leading-snug opacity-60 transition-opacity duration-300 group-hover:opacity-85 md:text-sm">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </ThemeSection>
  );
};

export default OrchestrateSection;
