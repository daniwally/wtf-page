import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { fadeUp, SectionLabel, galeria, logo } from "../sections/shared";
import { useChapterRegister } from "../components/motion/ChapterContext";
import ChapterIntro from "../components/motion/ChapterIntro";
import RevealLines from "../components/motion/RevealLines";
import Parallax from "../components/motion/Parallax";

// CAP 03 — CON QUIÉN TRABAJAMOS: el poder de fuego completo. Fichas
// conceptuales, 18 legacy, 31 logos, 9 casos activos y el puente Starter
// que empuja al clímax. Fusión de Works + Clients + Cases. NADA se recorta.
const FEATURED = [
  {
    file: "legacy-motorola-thumb.jpg",
    brand: "Motorola",
    title: "Construimos parte del ADN global de Motorola",
    meta: "Tech · Global",
    scope: "Power to Empower: una plataforma de marca con 18 nacionalidades en 21 países.",
  },
  {
    file: "legacy-diablo-thumb.jpg",
    brand: "Pisco Diablo",
    title: "Cambiamos la marca más importante de Pisco",
    meta: "Spirits · Chile",
    scope: "+1500 puntos de contacto. +8 puntos de share. Primer lugar de la categoría.",
  },
  {
    file: "legacy-absolut-nothing-thumb.jpg",
    brand: "Absolut",
    title: "Resolvimos un brief literalmente imposible",
    meta: "Spirits · Argentina",
    scope: "Absolut Nothing: la primera botella de vodka sin vodka.",
  },
  {
    file: "legacy-ford-lobo-thumb.jpg",
    brand: "Ford F-150 Lobo",
    title: "Lanzamos una leyenda en USA y México",
    meta: "Auto · Norteamérica",
    scope: "“Las leyendas nunca se detienen”: superproducción sci-fi rodada en México.",
  },
];

const LEGACY = [
  "legacy-motorola-razr-thumb.jpg",
  "legacy-absolut-thumb.jpg",
  "legacy-honda-hrv-thumb.jpg",
  "legacy-samsung-thumb.jpg",
  "legacy-quilmes-thumb.jpg",
  "legacy-havana-thumb.jpg",
  "legacy-cinzano-thumb.jpg",
  "legacy-cafayate-thumb.jpg",
  "legacy-altodelcarmen-thumb.jpg",
  "legacy-kross-thumb.jpg",
  "legacy-honda-xr-thumb.jpg",
  "legacy-hacienda-thumb.jpg",
  "legacy-bayerempecid-thumb.jpg",
  "legacy-honda-fit-thumb.jpg",
  "legacy-honda-accord-thumb.jpg",
  "legacy-ridgeline-thumb.jpg",
  "legacy-montefraile-thumb.jpg",
  "legacy-absgrapefruit-thumb.jpg",
];

const LOGOS_WALL = [
  { file: "honda.png", name: "Honda" },
  { file: "ford.png", name: "Ford" },
  { file: "peugeot.png", name: "Peugeot" },
  { file: "motorola.png", name: "Motorola" },
  { file: "samsung.png", name: "Samsung" },
  { file: "lenovo.png", name: "Lenovo" },
  { file: "absolut.png", name: "Absolut" },
  { file: "beefeater.png", name: "Beefeater" },
  { file: "chivas.png", name: "Chivas" },
  { file: "havana-club.png", name: "Havana Club" },
  { file: "jose-cuervo.png", name: "Jose Cuervo" },
  { file: "quilmes.png", name: "Quilmes" },
  { file: "mumm.png", name: "Mumm" },
  { file: "cinzano.png", name: "Cinzano" },
  { file: "nestle-waters.png", name: "Nestlé Waters" },
  { file: "eco-de-los-andes.png", name: "Eco de los Andes" },
  { file: "bayer.png", name: "Bayer" },
  { file: "arcor.png", name: "Arcor" },
  { file: "mobil-super.png", name: "Mobil Super" },
  { file: "mahle.png", name: "Mahle" },
  { file: "starter.png", name: "Starter" },
  { file: "shaq.png", name: "Shaq" },
  { file: "diablo-pisco.png", name: "Pisco Diablo" },
  { file: "fernet-buhero-negro.png", name: "Fernet Buhero Negro" },
  { file: "alto-del-carmen.png", name: "Alto del Carmen" },
  { file: "cafayate.png", name: "Cafayate" },
  { file: "hacienda-la-torre.png", name: "Hacienda La Torre" },
  { file: "kross.png", name: "Kross" },
  { file: "sensus.png", name: "Sensus" },
  { file: "assy.png", name: "Assy" },
  { file: "bear-beer.png", name: "Bear Beer" },
];

const Cap03Trabajo = () => {
  const register = useChapterRegister();

  return (
    <section id="cap-03" data-chapter="03" ref={register} className="scroll-mt-20 bg-night" data-testid="cap-03">
      <ChapterIntro num="03" title={<>Con quién <b>trabajamos</b></>} kicker="El Poder de Fuego" />

      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 pt-8 pb-16">
        <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <SectionLabel index="03.1" title="Trabajos" />
            <RevealLines
              as="h2"
              className="font-display font-thin size-display-0 text-white/85 leading-[0.9]"
              lines={[<>15 años <b className="text-white">de calle</b></>]}
              data-testid="works-title"
            />
          </div>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-sm md:text-right">
            Cada trabajo es parte de un sistema:
            <br />
            estrategia, ejecución y aprendizaje conectados.
          </p>
        </motion.div>
      </div>

      {/* Fichas conceptuales con parallax */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 mb-3">
          {FEATURED.map((work, i) => (
            <motion.div
              key={work.file}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
              className={`group relative h-[320px] md:h-[440px] overflow-hidden bg-deckmid ${
                i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"
              }`}
              data-testid={`work-featured-${i}`}
            >
              <Parallax range={6} className="absolute inset-0">
                <img src={galeria(work.file)} alt={work.brand} loading="lazy" className="w-full h-full object-cover" />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="font-hud text-[10px] tracking-[0.25em] uppercase text-volt">{work.brand}</span>
                  <span className="font-hud text-[10px] tracking-[0.2em] uppercase text-white/50 whitespace-nowrap">
                    {work.meta}
                  </span>
                </div>
                <h3 className="font-display font-thin text-2xl md:text-3xl text-white/90 leading-[1.05] mb-2">
                  <b className="text-white">{work.title}</b>
                </h3>
                <p className="text-sm md:text-base text-white/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {work.scope}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strip legacy — 18 campañas */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-24">
          {LEGACY.map((file, i) => (
            <motion.div
              key={file}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden bg-deckmid"
              data-testid={`work-legacy-${i}`}
            >
              <img
                src={galeria(file)}
                alt="Campaña WTF"
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Logo wall — 31 marcas */}
      <div className="py-24 bg-black border-t border-white/10" data-testid="clients-block">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionLabel index="03.2" title="Clientes" />
              <RevealLines
                as="h2"
                className="font-display font-thin size-display-3 text-white/85 leading-[0.95]"
                lines={[<>Los que <b className="text-white">entendieron</b></>]}
                data-testid="clients-title"
              />
            </div>
            <p className="text-lg md:text-xl text-white/50 font-light italic max-w-xs md:text-right">
              que no alcanza
              <br />
              con una idea.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-white/10" data-testid="clients-wall">
            {LOGOS_WALL.map((client, i) => (
              <motion.div
                key={client.file}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.4 }}
                className="group border-r border-b border-white/10 aspect-[4/3] flex items-center justify-center p-6 md:p-8 hover:bg-white/[0.04] transition-colors"
                data-testid={`client-logo-${i}`}
              >
                <img
                  src={logo(client.file)}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 md:max-h-14 w-auto max-w-full object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Puente Starter → el sistema: escena de cierre del capítulo, full-bleed */}
      <div
        className="relative min-h-[90vh] flex items-center overflow-hidden border-t border-white/10"
        data-testid="work-bridge"
      >
        <Parallax range={6} className="absolute inset-0">
          <img
            src={galeria("starter-detail-2.jpg")}
            alt="Starter — catálogo 100% AI"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        <div className="container mx-auto px-6 md:px-12 relative py-32">
          <div className="max-w-4xl">
            <motion.span
              {...fadeUp}
              className="inline-block font-hud text-[10px] tracking-[0.25em] uppercase text-volt mb-6"
            >
              Starter · Lifestyle · Global — El último caso es el primero del sistema
            </motion.span>
            <RevealLines
              as="h3"
              className="font-display font-thin size-display-1 text-white/85 leading-[0.95] mb-6"
              lines={[
                <>Cuando la estrategia</>,
                <>es sistema,</>,
                <b className="text-white">la IA ejecuta.</b>,
              ]}
            />
            <p className="text-base md:text-xl text-white/60 font-light max-w-xl mb-10">
              Un catálogo completo producido 100% con IA. La tecnología como parte
              del método, no solo de la ejecución.
            </p>
            <a
              href="#cap-04"
              className="inline-flex items-center gap-3 border border-volt/60 text-volt px-5 py-3 font-hud text-xs uppercase tracking-[0.25em] hover:bg-volt hover:text-black transition-colors w-fit"
              data-testid="work-bridge-cta"
            >
              Así trabaja el sistema <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cap03Trabajo;
