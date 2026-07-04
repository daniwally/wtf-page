import { motion } from "framer-motion";
import { fadeUp, logo } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import { useLang } from "../i18n/LangContext";

const BG = "/assets/hero/salto.webp"; // skydiver (como el deck), bien atenuado

// Copy bilingüe (es | en): se consume con useLang().
const COPY = {
  es: {
    headline: [<>15 años operando marcas.</>, <b key="c">Ahora convertidos en sistema.</b>],
    subline: "WTF nació como agencia creativa y evolucionó hacia un modelo operativo: estrategia, creatividad, producción y velocidad en un mismo lugar.",
  },
  en: {
    headline: [<>15 years operating brands.</>, <b key="c">Now turned into a system.</b>],
    subline: "WTF started as a creative agency and evolved into an operating model: strategy, creativity, production and speed in one place.",
  },
  pt: {
    headline: [<>15 anos operando marcas.</>, <b key="c">Agora transformados em sistema.</b>],
    subline: "A WTF nasceu como agência criativa e evoluiu para um modelo operacional: estratégia, criatividade, produção e velocidade em um só lugar.",
  },
};

// Sección de clientes. Replica EXACTO el slide del deck (engine.wtf-agency.works):
// mismo orden, mismos tamaños (logo-sm/logo-xs) y scale por logo. El poder de
// fuego no se recorta. Tamaños del deck: default 44px·90%, sm 28px·60%, xs 24px·55%.
const SZ = {
  d: { maxHeight: "44px", maxWidth: "90%" },
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
    pad="pt-28 pb-20 md:pt-36 md:pb-28"
    className="flex flex-col justify-center"
  >
    {/* Fondo: salto al vacío, muy atenuado (como el deck) */}
    <div className="absolute inset-0 z-0">
      <img src={BG} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[#0A0A0C]/88" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 via-[#0A0A0C]/50 to-[#0A0A0C]/90" />
    </div>

    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <Headline size="section" className="!text-[clamp(27px,4.25vw,61px)]" lines={c.headline} />
      <motion.p {...fadeUp} className="mt-5 text-lg md:text-xl font-light opacity-65">
        {c.subline}
      </motion.p>

      {/* Grilla idéntica al deck: 6 cols, gap 0, celdas 70px, sizes por logo */}
      <motion.div
        {...fadeUp}
        className="mt-8 md:mt-10 grid grid-cols-3 md:grid-cols-6 gap-0"
      >
        {CLIENTS.map(({ f, s = "d", k }) => (
          <div key={f} className="flex items-center justify-center px-4 py-[22px] min-h-[70px]">
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
              className="w-auto object-contain opacity-[0.55] hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  </ThemeSection>
  );
};

export default ClientsSection;
