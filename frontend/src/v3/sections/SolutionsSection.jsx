import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

// PORT LITERAL de la slide "10 · Capacidades" del deck (engine.wtf-agency.works):
// fondo cap-turbina.jpg con su gradiente 62/42/70, .stack-title clamp(22,3.7vw,64),
// .stack-sub, .cap-grid de 6 columnas con .cap-card (vidrio, borde 8%, radio 12,
// blur 12, hover -4px con borde rojo y barra superior) y el conector .cap-connect
// a todo el ancho. Iconos SVG idénticos a los del deck.
const BG = "/assets/hero/capacidades-turbina.webp";
const VEIL =
  "linear-gradient(180deg, rgba(10,10,12,0.62) 0%, rgba(10,10,12,0.42) 40%, rgba(10,10,12,0.70) 100%)";
const BONE = "#F4F1E8";
const BONE_DIM = "#C5C2B8";

const ICONS = [
  // 01 · Brand systems (cubo)
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </>,
  // 02 · Campañas 360 (megáfono)
  <>
    <path d="M3 11l18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </>,
  // 03 · Key visuals (imagen)
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </>,
  // 04 · Contenidos (infinito)
  <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z" />,
  // 05 · Performance (tendencia)
  <>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </>,
  // 06 · Social first (mobile)
  <>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </>,
];

const COPY = {
  es: {
    kicker: "No vendemos servicios. Operamos sistemas.",
    title: [
      ["ESTRATEGIA,", "CREATIVIDAD Y ESCALA."],
      ["SIN ELEGIR ENTRE", "LAS TRES."],
    ],
    sub: "Cada formato nace del mismo concepto estratégico y se conecta con los demás. No son piezas sueltas, es un sistema donde todo se retroalimenta.",
    connect: "TODO CONECTADO · UN SISTEMA · UNA MARCA",
    caps: [
      { t: "BRAND SYSTEMS", d: "Sistemas de diseño vivos que escalan. Multi-marca, multi-mercado. La identidad crece con el negocio." },
      { t: "CAMPAÑAS 360", d: "Spots, branded content, narrativa multi-shot. Video cinematográfico con calidad de producción premium a velocidad IA." },
      { t: "KEY VISUALS", d: "Identidad visual, campañas gráficas, social assets, packaging. Consistencia de marca en cada pieza." },
      { t: "CONTENIDOS", d: "UGC, talking heads, avatares, adaptaciones multi-formato. Producción a escala sin perder calidad ni voz de marca." },
      { t: "PERFORMANCE", d: "Variantes para A/B testing. Iteración basada en data. El contenido que mejor performa se multiplica." },
      { t: "SOCIAL FIRST", d: "Contenido pensado para cada plataforma. TikTok, Reels, YouTube, Stories. No es resize, es reinvención." },
    ],
  },
  en: {
    kicker: "We don't sell services. We operate systems.",
    title: [
      ["STRATEGY,", "CREATIVITY AND SCALE."],
      ["WITHOUT CHOOSING", "BETWEEN THEM."],
    ],
    sub: "Every format is born from the same strategic concept and connects with the rest. Not loose pieces, a system where everything feeds back.",
    connect: "ALL CONNECTED · ONE SYSTEM · ONE BRAND",
    caps: [
      { t: "BRAND SYSTEMS", d: "Living design systems that scale. Multi-brand, multi-market. Identity grows with the business." },
      { t: "CAMPAIGNS 360", d: "Spots, branded content, multi-shot narrative. Cinematic video with premium production quality at AI speed." },
      { t: "KEY VISUALS", d: "Visual identity, graphic campaigns, social assets, packaging. Brand consistency in every piece." },
      { t: "CONTENT", d: "UGC, talking heads, avatars, multi-format adaptations. Production at scale without losing quality or brand voice." },
      { t: "PERFORMANCE", d: "Variants for A/B testing. Data-driven iteration. The best-performing content gets multiplied." },
      { t: "SOCIAL FIRST", d: "Content designed for each platform. TikTok, Reels, YouTube, Stories. Not resizing, reinvention." },
    ],
  },
  pt: {
    kicker: "Não vendemos serviços. Operamos sistemas.",
    title: [
      ["ESTRATÉGIA,", "CRIATIVIDADE E ESCALA."],
      ["SEM ESCOLHER ENTRE", "AS TRÊS."],
    ],
    sub: "Cada formato nasce do mesmo conceito estratégico e se conecta com os demais. Não são peças soltas, é um sistema onde tudo se retroalimenta.",
    connect: "TUDO CONECTADO · UM SISTEMA · UMA MARCA",
    caps: [
      { t: "BRAND SYSTEMS", d: "Sistemas de design vivos que escalam. Multi-marca, multi-mercado. A identidade cresce com o negócio." },
      { t: "CAMPANHAS 360", d: "Spots, branded content, narrativa multi-shot. Vídeo cinematográfico com qualidade de produção premium na velocidade da IA." },
      { t: "KEY VISUALS", d: "Identidade visual, campanhas gráficas, social assets, embalagens. Consistência de marca em cada peça." },
      { t: "CONTEÚDOS", d: "UGC, talking heads, avatares, adaptações multi-formato. Produção em escala sem perder qualidade nem voz de marca." },
      { t: "PERFORMANCE CRIATIVO", d: "Variantes para A/B testing. Iteração baseada em dados. O conteúdo com melhor performance se multiplica." },
      { t: "SOCIAL FIRST", d: "Conteúdo pensado para cada plataforma. TikTok, Reels, YouTube, Stories. Não é resize, é reinvenção." },
    ],
  },
};

const SolutionsSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection
      theme={THEMES.night}
      id="v3-soluciones"
      pad="pt-24 pb-10"
      className="overflow-hidden flex flex-col"
    >
      {/* .stack: cap-turbina.jpg + su gradiente propio */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: VEIL }} />
      </div>

      {/* padding lateral del deck: 7vw */}
      <div className="relative z-10 flex flex-1 flex-col px-[7vw]">
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-white"
        >
          {c.kicker}
        </motion.p>

        {/* .stack-title (mismo tamaño que .engine-title / .quienes-h) */}
        <motion.h2
          {...fadeUp}
          className="mt-auto pt-[30px] md:pt-[50px] max-w-[1100px] uppercase antialiased text-[clamp(22px,3.7vw,64px)]"
          style={{
            fontWeight: 100,
            letterSpacing: "0.06em",
            lineHeight: 0.95,
            color: BONE,
            textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            marginBottom: "12px",
          }}
        >
          {c.title[0][0]}
          <br />
          {c.title[0][1]}
          <br />
          <em className="not-italic font-bold text-white">
            {c.title[1][0]}
            <br />
            {c.title[1][1]}
          </em>
        </motion.h2>

        {/* .stack-sub */}
        <motion.p
          {...fadeUp}
          className="max-w-[600px] text-[clamp(14px,1.1vw,18px)] leading-[1.6] mb-[5vh]"
          style={{ color: BONE_DIM }}
        >
          {c.sub}
        </motion.p>

        {/* .cap-grid: 6 columnas al piso de la slide + conector a todo el ancho */}
        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[10px]">
          <motion.div
            {...fadeUp}
            className="col-span-full mb-[10px] flex items-center gap-5 py-1.5"
          >
            <span className="h-px flex-1 opacity-40 bg-gradient-to-r from-transparent via-volt to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.25em] whitespace-nowrap text-volt opacity-70">
              {c.connect}
            </span>
            <span className="h-px flex-1 opacity-40 bg-gradient-to-r from-transparent via-volt to-transparent" />
          </motion.div>

          {c.caps.map((cap, i) => (
            <motion.div
              key={cap.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.08] px-5 pt-[18px] pb-4 backdrop-blur-xl transition-all duration-[350ms] hover:-translate-y-1 hover:border-[rgba(255,59,48,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              {/* .cap-card::before — barra superior que aparece en hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, #FF3B30, transparent)" }}
              />
              <svg
                className="mb-2 block opacity-95"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF3B30"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {ICONS[i]}
              </svg>
              <div className="mb-3.5 font-mono text-[11px] tracking-[0.15em] text-volt opacity-80">
                {String(i + 1).padStart(2, "0")} ·
              </div>
              <h4
                className="mb-2.5 text-[clamp(14px,1.1vw,17px)] font-bold tracking-[0.04em]"
                style={{ color: BONE }}
              >
                {cap.t}
              </h4>
              <p
                className="text-[clamp(12px,0.85vw,14px)] leading-[1.55]"
                style={{ color: BONE_DIM }}
              >
                {cap.d}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
};

export default SolutionsSection;
