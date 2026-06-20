import { motion } from "framer-motion";
import { fadeUp, galeria } from "../../sections/shared";
import Parallax from "../../components/motion/Parallax";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import LogoMarquee from "../ui/LogoMarquee";

const FEATURED = [
  { file: "legacy-motorola-thumb.jpg", brand: "Motorola", title: "Construimos parte del ADN global de Motorola", meta: "Tech · Global" },
  { file: "legacy-diablo-thumb.jpg", brand: "Pisco Diablo", title: "Cambiamos la marca más importante de Pisco", meta: "Spirits · Chile" },
  { file: "legacy-absolut-nothing-thumb.jpg", brand: "Absolut", title: "Resolvimos un brief literalmente imposible", meta: "Spirits · Argentina" },
  { file: "legacy-ford-lobo-thumb.jpg", brand: "Ford F-150 Lobo", title: "Lanzamos una leyenda en USA y México", meta: "Auto · Norteamérica" },
];

const LEGACY = [
  "legacy-motorola-razr-thumb.jpg", "legacy-absolut-thumb.jpg", "legacy-honda-hrv-thumb.jpg",
  "legacy-samsung-thumb.jpg", "legacy-quilmes-thumb.jpg", "legacy-havana-thumb.jpg",
  "legacy-cinzano-thumb.jpg", "legacy-cafayate-thumb.jpg", "legacy-altodelcarmen-thumb.jpg",
  "legacy-kross-thumb.jpg", "legacy-honda-xr-thumb.jpg", "legacy-hacienda-thumb.jpg",
  "legacy-bayerempecid-thumb.jpg", "legacy-honda-fit-thumb.jpg", "legacy-honda-accord-thumb.jpg",
  "legacy-ridgeline-thumb.jpg", "legacy-montefraile-thumb.jpg", "legacy-absgrapefruit-thumb.jpg",
];

const LOGOS_WALL = [
  "honda.png", "ford.png", "peugeot.png", "motorola.png", "samsung.png", "lenovo.png",
  "absolut.png", "beefeater.png", "chivas.png", "havana-club.png", "jose-cuervo.png", "quilmes.png",
  "mumm.png", "cinzano.png", "nestle-waters.png", "eco-de-los-andes.png", "bayer.png", "arcor.png",
  "mobil-super.png", "mahle.png", "starter.png", "shaq.png", "diablo-pisco.png", "fernet-buhero-negro.png",
  "alto-del-carmen.png", "cafayate.png", "hacienda-la-torre.png", "kross.png", "sensus.png", "assy.png", "bear-beer.png",
];

const WorkSection = () => (
  <ThemeSection theme={THEMES.bone} id="v2-trabajo">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <Headline size="section" lines={[<>No es portfolio.</>, <b key="e">Es evidencia.</b>]} />
        <motion.p {...fadeUp} className="text-lg font-normal max-w-sm opacity-60 md:text-right">
          15 años rompiendo el brief. 200+ campañas. Ningún manual quedó en pie.
        </motion.p>
      </div>

      {/* Featured bento */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-4">
        {FEATURED.map((w, i) => (
          <motion.div
            key={w.file}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
            className={`group relative h-[300px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden ${
              i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"
            }`}
          >
            <Parallax range={6} className="absolute inset-0">
              <img src={galeria(w.file)} alt={w.brand} loading="lazy" className="w-full h-full object-cover" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-[#F4F1E8]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-volt">{w.brand} · {w.meta}</span>
              <h3 className="text-xl md:text-2xl font-black normal-case tracking-tight mt-1">{w.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legacy thumbs */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-20">
        {LEGACY.map((file, i) => (
          <motion.div
            key={file}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 6) * 0.04, duration: 0.4 }}
            className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-black/5"
          >
            <img
              src={galeria(file)}
              alt="Campaña WTF"
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>

      {/* Logo wall — marquee infinito (patrón 21st re-skineado) */}
      <motion.p {...fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] opacity-40 mb-8">
        Los que entendieron que no alcanza con una idea
      </motion.p>
      <LogoMarquee files={LOGOS_WALL} />
    </div>
  </ThemeSection>
);

export default WorkSection;
