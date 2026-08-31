import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

// PORT LITERAL de la slide "07 · Quiénes somos" del deck (engine.wtf-agency.works):
// fondo quienes-glass.jpg con sus dos gradientes + el glow rojo del ::after,
// .quienes-h clamp(22,3.7vw,64) hairline con <em> bold blanco, .quienes-sub y
// .wtf-pillars: 5 columnas pegadas (gap 0, bordes colapsados con margin -1px),
// celdas de 220px con número mono rojo, h4 32px y descripción 12px.
const BG = "/assets/hero/quienes-glass.webp";
const VEIL_X =
  "linear-gradient(90deg, rgba(10,10,12,0.86) 0%, rgba(10,10,12,0.62) 45%, rgba(10,10,12,0.25) 100%)";
const VEIL_Y =
  "linear-gradient(180deg, rgba(10,10,12,0.45) 0%, transparent 25%, transparent 62%, rgba(10,10,12,0.80) 100%)";
const GLOW =
  "radial-gradient(ellipse 40% 50% at 85% 50%, rgba(255,59,48,0.06), transparent 70%)";
const BONE = "#F4F1E8";
const BONE_DIM = "#C5C2B8";
const LINE = "#2C2C36";

const COPY = {
  es: {
    kicker: "No es workflow. Es momentum.",
    t1: ["NO HACEMOS", "CAMPAÑAS."],
    t2: ["HACEMOS", "SISTEMAS."],
    sub: "Construimos nuestro propio sistema operativo. 15 años de calle, estrategia y craft creativo corriendo dentro de una máquina que no para. No automatizamos la creatividad, la armamos para escalar.",
    pillars: [
      { t: "PENSAR", d: "Estrategia, insight, concepto. IA para research, análisis de audiencia y mapeo de territorios. La idea sigue naciendo de una cabeza, no de un prompt." },
      { t: "HACER", d: "Creatividad con oficio y producción AI-first: video cinematográfico, UGC sintético, avatares, brand systems. Calidad de cine, a velocidad de feed." },
      { t: "MOVER", d: "Distribución inteligente: plataformas, pauta, CRM, always-on, community. Cada pieza nativa de su canal, no adaptada." },
      { t: "APRENDER", d: "Optimización continua. KPIs en tiempo real. A/B testing. Iteración basada en data, no en ego." },
      { t: "CRECER", d: "Escala sin perder alma. Multi-marca, multi-mercado, multi-formato. El sistema crece con vos." },
    ],
  },
  en: {
    kicker: "It is not workflow. It is momentum.",
    t1: ["WE DON'T MAKE", "CAMPAIGNS."],
    t2: ["WE BUILD", "SYSTEMS."],
    sub: "We built our own AI operating system. 15 years of street smarts, strategy, and creative craft running inside a machine that never stops. We don't automate creativity, we build it to scale.",
    pillars: [
      { t: "THINK", d: "Strategy, insight, concept. AI for research, audience analysis and territory mapping. The idea still comes from a head, not a prompt." },
      { t: "CREATE", d: "Craft-led creativity and AI-first production: cinematic video, synthetic UGC, avatars, brand systems. Film quality, at feed speed." },
      { t: "DISTRIBUTE", d: "Smart distribution: platforms, paid media, CRM, always-on, community. Every piece native to its channel, not adapted." },
      { t: "LEARN", d: "Continuous optimization. Real-time KPIs. A/B testing. Data-driven iteration, not ego-driven." },
      { t: "GROW", d: "Scale without losing soul. Multi-brand, multi-market, multi-format. The system grows with you." },
    ],
  },
  pt: {
    kicker: "Não é workflow. É momentum.",
    t1: ["NÃO FAZEMOS", "CAMPANHAS."],
    t2: ["CONSTRUÍMOS", "SISTEMAS."],
    sub: "Construímos nosso próprio sistema operacional de IA. 15 anos de rua, estratégia e craft criativo rodando dentro de uma máquina que não para. Não automatizamos a criatividade, a preparamos para escalar.",
    pillars: [
      { t: "PENSAR", d: "Estratégia, insight, conceito. IA para pesquisa, análise de audiência e mapeamento de territórios. A ideia continua nascendo de uma cabeça, não de um prompt." },
      { t: "CRIAR", d: "Criatividade com ofício e produção AI-first: vídeo cinematográfico, UGC sintético, avatares, brand systems. Qualidade de cinema, na velocidade do feed." },
      { t: "DISTRIBUIR", d: "Distribuição inteligente: plataformas, mídia paga, CRM, always-on, comunidade. Cada peça nativa do seu canal, não adaptada." },
      { t: "APRENDER", d: "Otimização contínua. KPIs em tempo real. A/B testing. Iteração baseada em dados, não em ego." },
      { t: "CRESCER", d: "Escalar sem perder alma. Multi-marca, multi-mercado, multi-formato. O sistema cresce com você." },
    ],
  },
};

const OrchestrateSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection
      theme={THEMES.night}
      id="v3-model"
      pad="pt-24 pb-[90px]"
      className="overflow-hidden flex flex-col"
    >
      {/* .quienes: quienes-glass.jpg + gradiente horizontal + vertical + glow rojo */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: VEIL_X }} />
        <div className="absolute inset-0" style={{ background: VEIL_Y }} />
        <div className="absolute inset-0" style={{ background: GLOW }} />
      </div>

      {/* padding lateral del deck: 7vw */}
      <div className="relative z-10 flex flex-1 flex-col px-[7vw]">
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-white"
        >
          {c.kicker}
        </motion.p>

        {/* .quienes-h: flex:1 con align-items flex-end (el aire queda arriba) */}
        <motion.h2
          {...fadeUp}
          className="flex flex-1 items-end uppercase antialiased text-[clamp(22px,3.7vw,64px)]"
          style={{
            fontWeight: 100,
            letterSpacing: "0.06em",
            lineHeight: 1.2,
            color: BONE,
            textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            marginBottom: "12px",
          }}
        >
          <span className="block pt-10">
            {c.t1[0]}
            <br />
            {c.t1[1]}
            <br />
            <em className="not-italic font-bold text-white">
              {c.t2[0]}
              <br />
              {c.t2[1]}
            </em>
          </span>
        </motion.h2>

        {/* .quienes-sub */}
        <motion.p
          {...fadeUp}
          className="max-w-[480px] text-[clamp(13px,1.1vw,16px)] leading-[1.6] mb-7"
          style={{ color: BONE_DIM }}
        >
          {c.sub}
        </motion.p>

        {/* .wtf-pillars: 5 columnas pegadas, bordes colapsados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
          {c.pillars.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative -mb-px px-[22px] pt-7 pb-8 transition-all duration-300 hover:z-[2] hover:border-[#FF3B30] hover:bg-[rgba(10,10,12,0.6)] lg:mb-0 lg:-mr-px min-h-[220px]"
              style={{ border: `1px solid ${LINE}`, background: "rgba(10,10,12,0.45)" }}
            >
              <div className="mb-4 font-mono text-[10px] tracking-[0.18em] text-volt">
                {String(i + 1).padStart(2, "0")} ·
              </div>
              <h4
                className="mb-3.5 text-[32px] uppercase leading-none"
                style={{ color: BONE }}
              >
                {p.t}
              </h4>
              <p className="text-xs leading-[1.55]" style={{ color: BONE_DIM }}>
                {p.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
};

export default OrchestrateSection;
