import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, galeria } from "../../sections/shared";
import Counter from "../../components/motion/Counter";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import WorkModal from "../ui/WorkModal";
import { WORKS } from "../data/works";
import { useLang } from "../i18n/LangContext";

// Sección 7 — PROOF · THEN. Réplica de la slide "NUESTROS TRABAJOS" del deck
// (engine.wtf-agency.works): la ficha de cada comercial (thumbnail + categoría +
// nombre + descripción) y, al click, el modal de detalle (video + galería).
// Thumbnails locales; assets del modal del deck en vivo. El poder de fuego no se recorta.
// Copy bilingüe (es | en): se consume con useLang().
const COPY = {
  es: {
    kickerPre: "La prueba · ",
    headline: [<>No es portfolio.</>, <b key="e">Es evidencia.</b>],
    intro:
      "No hablamos de lo que podemos hacer. Mostramos 15 años destruyendo briefs y construyendo marcas.",
    metrics: [
      { value: 15, suffix: "", label: "años" },
      { value: 300, suffix: "+", label: "campañas" },
      { value: 30, suffix: "+", label: "marcas" },
      { value: 10, suffix: "+", label: "países" },
      { value: 6, suffix: "", label: "categorías" },
      { static: "#1", label: "marcas líderes" },
    ],
    cta: "Ver caso →",
  },
  en: {
    kickerPre: "The proof · ",
    headline: [<>It is not a portfolio.</>, <b key="e">It is evidence.</b>],
    intro:
      "We don't talk about what we can do. We show 15 years destroying briefs and building brands.",
    metrics: [
      { value: 15, suffix: "", label: "years" },
      { value: 300, suffix: "+", label: "campaigns" },
      { value: 30, suffix: "+", label: "brands" },
      { value: 10, suffix: "+", label: "countries" },
      { value: 6, suffix: "", label: "categories" },
      { static: "#1", label: "leading brands" },
    ],
    cta: "View case →",
  },
};

const WorkSection = () => {
  const [active, setActive] = useState(null);
  const { lang } = useLang();
  const c = COPY[lang];

  return (
    <ThemeSection theme={THEMES.bone} id="v3-trabajo">
      <div className="container mx-auto px-6 md:px-12">
        {/* Kicker Proof · Then */}
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase opacity-50 mb-6"
        >
          {c.kickerPre}<span className="text-volt">Then</span>
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <Headline size="section" lines={c.headline} />
          <motion.p {...fadeUp} className="text-base md:text-lg font-light max-w-md opacity-60 md:text-right">
            {c.intro}
          </motion.p>
        </div>

        {/* Barra de métricas */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-8 border-y border-current/15 py-8 mb-12">
          {c.metrics.map((m) => (
            <div key={m.label} className="text-center px-1">
              <Counter
                value={m.value}
                suffix={m.suffix}
                static={m.static}
                className="font-black text-3xl md:text-5xl leading-none tabular-nums block"
              />
              <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.14em] opacity-50">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Grilla de fichas (formato deck): thumbnail + categoría + nombre + descripción.
            Al click abre el modal de detalle. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-9 [grid-auto-flow:dense]">
          {WORKS.map((w, i) => (
            <motion.button
              type="button"
              key={w.key}
              onClick={() => setActive(w)}
              aria-label={`${c.cta.replace(" →", "")}: ${w.name}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}
              className={`group text-left ${w.feat ? "col-span-2" : ""}`}
            >
              <div
                className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-black/5 ${
                  w.feat ? "aspect-[32/10]" : "aspect-[16/10]"
                }`}
              >
                <img
                  src={galeria(w.file)}
                  alt={w.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Cue de click */}
                <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="m-3 font-hud text-[10px] uppercase tracking-[0.18em] text-[#F4F1E8]">
                    {c.cta}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-volt">{lang === "en" ? w.catEn : w.cat}</span>
                <h3 className={`font-black uppercase tracking-tight leading-tight mt-1 ${w.feat ? "text-lg md:text-2xl" : "text-base md:text-lg"}`}>
                  {w.name}
                </h3>
                <p className="text-xs md:text-sm font-normal opacity-55 leading-snug mt-1">{lang === "en" ? w.capEn : w.cap}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal de detalle */}
      <AnimatePresence>
        {active && <WorkModal work={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </ThemeSection>
  );
};

export default WorkSection;
