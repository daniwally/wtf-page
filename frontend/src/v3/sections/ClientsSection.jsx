import { motion } from "framer-motion";
import { fadeUp, logo } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

// PORT LITERAL de la slide "11 · Clientes" del deck (engine.wtf-agency.works).
// Fondo, velo, tipografías, tamaños de logo y grilla salen del HTML/CSS del deck,
// no de una interpretación: .clientes, .clientes-title, .clientes-sub, .logos-static.
const BG = "/assets/hero/clientes-cielo.webp"; // wtf-credenciales-slides/bg-clientes.jpg
const VEIL =
  "linear-gradient(180deg, rgba(10,10,12,0.22) 0%, rgba(10,10,12,0.10) 45%, rgba(10,10,12,0.30) 100%)";
const BONE = "#F4F1E8"; // --bone
const BONE_DIM = "#C5C2B8"; // --bone-dim

const COPY = {
  es: {
    kicker: "15 años operando marcas · Ahora convertidos en sistema",
    l1: "No son logos.",
    l2: "Son años.",
    sub: "Los años no se pitchean.",
  },
  en: {
    kicker: "15 years operating brands · Now turned into a system",
    l1: "They are not logos.",
    l2: "They are years.",
    sub: "Years cannot be pitched.",
  },
  pt: {
    kicker: "15 anos operando marcas · Agora transformados em sistema",
    l1: "Não são logos.",
    l2: "São anos.",
    sub: "Os anos não se pitcheiam.",
  },
};

// Tamaños del deck resueltos por cascada:
// .logos-static img → 36px / 100% (default) · .logo-cell img.logo-sm → 28px / 60%
// · .logo-cell img.logo-xs → 24px / 55%. Los scale() inline son los del deck.
const SZ = {
  d: { maxHeight: "36px", maxWidth: "100%" },
  sm: { maxHeight: "28px", maxWidth: "60%" },
  xs: { maxHeight: "24px", maxWidth: "55%" },
};

const CLIENTS = [
  { f: "honda-wing.png" },
  { f: "honda.png" },
  { f: "ford.png", s: "sm" },
  { f: "peugeot.png" },
  { f: "mobil-super.png" },
  { f: "mahle.png", k: 1.4375 },
  { f: "motorola.png" },
  { f: "lenovo.png", s: "sm" },
  { f: "samsung.png", s: "sm" },
  { f: "eco-de-los-andes.png" },
  { f: "nestle-waters.png" },
  { f: "bayer.png" },
  { f: "absolut.png", s: "xs" },
  { f: "beefeater.png" },
  { f: "chivas.png", s: "sm" },
  { f: "cafayate.png" },
  { f: "havana-club.png", k: 1.38 },
  { f: "assy.png", s: "xs" },
  { f: "quilmes.png" },
  { f: "mumm.png" },
  { f: "jose-cuervo.png", k: 1.5 },
  { f: "cinzano.png" },
  { f: "fernet-buhero-negro.png", k: 1.44 },
  { f: "alto-del-carmen.png", k: 1.755 },
  { f: "diablo-pisco.png", k: 1.45 },
  { f: "starter.png", k: 1.45 },
  { f: "shaq.png", k: 1.45 },
  { f: "bear-beer.png", s: "xs" },
  { f: "hacienda-la-torre.png", s: "xs" },
  { f: "arcor.png" },
];

const ClientsSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <ThemeSection
      theme={THEMES.night}
      id="v3-clientes"
      pad="pt-24 pb-[90px]"
      className="flex flex-col"
    >
      {/* .clientes: bg-clientes.jpg, cover, center 30% + ::before (velo liviano) */}
      <div className="absolute inset-0 z-0">
        <img
          src={BG}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
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

        {/* .clientes-title + .display */}
        <motion.h2
          {...fadeUp}
          className="pt-[60px] md:pt-[120px] uppercase antialiased text-[clamp(22px,3.7vw,64px)]"
          style={{
            fontWeight: 100,
            letterSpacing: "0.06em",
            lineHeight: 1.1,
            color: BONE,
            textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            marginBottom: "12px",
          }}
        >
          {c.l1}
          <br />
          <em className="not-italic font-bold text-white">{c.l2}</em>
        </motion.h2>

        {/* .clientes-sub */}
        <motion.p
          {...fadeUp}
          className="max-w-[550px] text-xl leading-[1.5] mb-[50px]"
          style={{ color: BONE_DIM }}
        >
          {c.sub}
        </motion.p>

        {/* .logos-static: 8 cols, gap 20px/24px, celdas 44px, entrada 40ms */}
        <div className="mt-auto grid w-full grid-cols-4 md:grid-cols-8 items-center gap-x-6 gap-y-5">
          {CLIENTS.map(({ f, s = "d", k }, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.45, ease: "easeOut" }}
              className="flex min-h-[44px] items-center justify-center"
            >
              <img
                src={logo(f)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                style={{
                  maxHeight: SZ[s].maxHeight,
                  maxWidth: SZ[s].maxWidth,
                  transform: k ? `scale(${k})` : undefined,
                }}
                className="w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 [filter:brightness(0)_invert(1)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </ThemeSection>
  );
};

export default ClientsSection;
