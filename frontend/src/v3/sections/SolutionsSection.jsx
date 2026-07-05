import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import Card from "../ui/Card";
import { useLang } from "../i18n/LangContext";

// Sección 5 — WHAT WE DO. Las 10 capacidades que opera el sistema, sobre la
// figura en movimiento (salto + trazo rosa): energía, el sistema que avanza.
// Sección OSCURA (coherente con el resto del sitio): velo oscuro sobre la
// figura + cards de vidrio oscuro con texto claro.
// (archivo histórico SolutionsSection.jsx; ahora es "What we do")
// Copy bilingüe (es | en): se consume con useLang().
// POV pileta, chica bebiendo (aprobada 2026-07-05); la anterior era
// movement-jump.webp (figura en salto), sigue disponible en assets/hero.
const SOL_BG = "/assets/hero/soluciones-pileta.webp";

const COPY = {
  es: {
    headline: [
      <>No vendemos servicios.</>,
      <b key="s">
        Operamos sistemas.
      </b>,
    ],
    intro:
      "Seis sistemas que se activan según lo que la marca necesita: construir, sostener, producir, lanzar, vender y conversar.",
    principle: "La necesidad define el sistema. No al revés.",
    services: [
      { name: "Brand Platform System", outcome: "Para marcas que necesitan posicionamiento, narrativa y tono que conecte con la cultura." },
      { name: "Always-on Content System", outcome: "Para marcas que necesitan presencia constante sin perder consistencia." },
      { name: "Launch System", outcome: "Para productos, campañas o plataformas que necesitan salir fuerte al mercado." },
      { name: "AI Production System", outcome: "Para producir más rápido, adaptar más y bajar fricción sin perder dirección creativa." },
      { name: "Retail & E-commerce System", outcome: "Para conectar marca, conversión, canales comerciales y contenido." },
      { name: "Social & Culture System", outcome: "Para marcas que necesitan estar en la conversación, lo social y la cultura." },
    ],
  },
  en: {
    headline: [
      <>We don't sell services.</>,
      <b key="s">
        We operate systems.
      </b>,
    ],
    intro:
      "Six systems that activate based on what the brand needs: build, sustain, produce, launch, sell and converse.",
    principle: "The need defines the system. Not the other way around.",
    services: [
      { name: "Brand Platform System", outcome: "For brands that need positioning, narrative and tone that connects with culture." },
      { name: "Always-on Content System", outcome: "For brands that need constant presence without losing consistency." },
      { name: "Launch System", outcome: "For products, campaigns or platforms that need to launch strong." },
      { name: "AI Production System", outcome: "To produce faster, adapt more and reduce friction without losing creative direction." },
      { name: "Retail & E-commerce System", outcome: "To connect brand, conversion, commercial channels and content." },
      { name: "Social & Culture System", outcome: "For brands that need to be in the conversation, social and culture." },
    ],
  },
  pt: {
    headline: [
      <>Não vendemos serviços.</>,
      <b key="s">
        Operamos sistemas.
      </b>,
    ],
    intro:
      "Seis sistemas ativados de acordo com o que a marca precisa: construir, sustentar, produzir, lançar, vender e conversar.",
    principle: "A necessidade define o sistema. Não o contrário.",
    services: [
      { name: "Brand Platform System", outcome: "Para marcas que precisam de posicionamento, narrativa e tom conectados à cultura." },
      { name: "Always-on Content System", outcome: "Para marcas que precisam de presença constante sem perder consistência." },
      { name: "Launch System", outcome: "Para produtos, campanhas ou plataformas que precisam chegar fortes ao mercado." },
      { name: "AI Production System", outcome: "Para produzir mais rápido, adaptar mais e reduzir atrito sem perder direção criativa." },
      { name: "Retail & E-commerce System", outcome: "Para conectar marca, conversão, canais comerciais e conteúdo." },
      { name: "Social & Culture System", outcome: "Para marcas que precisam participar da conversa, do social e da cultura." },
    ],
  },
};

const SolutionsSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection theme={THEMES.night} id="v3-soluciones" pad="pt-20 pb-12 md:pt-28 md:pb-16" className="overflow-hidden flex flex-col justify-center">
      {/* Fondo: POV pileta (imagen brillante) — velo más liviano que el resto de
          las secciones para que la imagen respire; el gradiente refuerza el pie
          donde están las cards. (Con movement-jump el velo era 62/55-45-85.) */}
      <div className="absolute inset-0 z-0">
        <img src={SOL_BG} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/30 via-[#0A0A0C]/15 to-[#0A0A0C]/75" />
        {/* Columna izquierda más oscura: ahí vive el headline hairline; sin esto
            el trazo fino se funde con el bokeh blanco del agua. La derecha (ojo)
            queda casi libre para que la imagen respire. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/65 via-[#0A0A0C]/15 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 md:translate-y-6">
        <Headline
          size="section"
          className="max-w-4xl !text-[clamp(27px,4.15vw,59px)]"
          lines={c.headline}
        />
        <motion.p {...fadeUp} className="mt-6 max-w-3xl text-lg md:text-xl font-light leading-relaxed opacity-70">
          {c.intro}
        </motion.p>
        {/* 6 cards en 2 filas de 3, acotadas a la mitad izquierda: los ojos de la
            imagen quedan libres a la derecha. Hover = inversión: la card oscura
            pasa a crema con texto negro (sin spotlight; los children llevan sus
            group-hover). */}
        <div className="grid max-w-4xl grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-10">
          {c.services.map((s, i) => (
            <Card
              key={s.name}
              tone="dark"
              index={i}
              spotlight={false}
              className="!p-5 min-h-[150px] flex flex-col justify-between !bg-[#0A0A0C]/85 !border-white/15 transition-colors duration-300 hover:!bg-[#F4F1E8] hover:!border-transparent"
            >
              <span className="font-mono text-xs text-white/40 transition-colors duration-300 group-hover:text-[#0A0A0C]/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-bold normal-case tracking-tight mb-1.5 leading-tight text-white transition-colors duration-300 group-hover:text-[#0A0A0C]">
                  {s.name}
                </h3>
                <p className="text-xs md:text-sm font-normal text-white/65 leading-snug transition-colors duration-300 group-hover:text-[#0A0A0C]/70">
                  {s.outcome}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <motion.p
          {...fadeUp}
          className="mt-6 text-left font-hud text-sm md:text-base uppercase tracking-[0.18em] text-white/65"
        >
          {c.principle}
        </motion.p>
      </div>
    </ThemeSection>
  );
};

export default SolutionsSection;
