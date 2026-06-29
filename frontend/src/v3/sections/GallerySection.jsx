import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import Counter from "../../components/motion/Counter";
import { useThemeRegister } from "../theme/ThemeContext";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import { GALLERY } from "../data/gallery";
import { useLang } from "../i18n/LangContext";

// Copy bilingüe (es | en): se consume con useLang().
const COPY = {
  es: {
    kicker: (
      <>
        La prueba · <span className="text-volt">Now</span>
      </>
    ),
    headline: [<>No sumamos una herramienta.</>, <b key="a">Construimos nuestro propio sistema operativo.</b>],
    subline: "La inteligencia, el oficio y la velocidad operando marcas como un solo sistema.",
    metrics: ["herramientas IA", "más rápido", "a primera entrega", "sin límites creativos"],
  },
  en: {
    kicker: (
      <>
        The proof · <span className="text-volt">Now</span>
      </>
    ),
    headline: [<>We didn’t add a tool.</>, <b key="a">We built our own operating system.</b>],
    subline: "Intelligence, craft and speed operating brands as a single system.",
    metrics: ["AI tools", "faster", "to first delivery", "no creative limits"],
  },
  pt: {
    kicker: (
      <>
        A prova · <span className="text-volt">Now</span>
      </>
    ),
    headline: [<>Não adicionamos uma ferramenta.</>, <b key="a">Construímos nosso próprio sistema operacional.</b>],
    subline: "Inteligência, craft e velocidade operando marcas como um único sistema.",
    metrics: ["ferramentas de IA", "mais rápido", "até a primeira entrega", "sem limites criativos"],
  },
};

// Video lazy: no asigna el src hasta entrar al viewport y pausa al salir. Así la
// galería no abre decenas de conexiones remotas durante la carga inicial.
const LazyVideo = ({ src, label }) => {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (el.currentSrc) el.play().catch(() => {});
        }
        else el.pause();
      },
      { rootMargin: "100px 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) ref.current?.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="block w-full"
    />
  );
};

// Datos de la slide "10 · WTF AI Engine" del deck (El sistema).
const METRICS = [
  { value: 20, suffix: "+", key: "tools" },
  { value: 10, suffix: "X", key: "faster" },
  { value: 48, suffix: "H", key: "delivery" },
  { static: "∞", key: "limits" },
];

const galleryLabel = (item, lang) => {
  if (lang === "en") return item.labelEn;
  if (lang !== "pt") return item.label;
  return item.label
    .replace("Lanzamiento", "Lançamento")
    .replace("Otoño", "Outono")
    .replace("El Brindis", "O Brinde")
    .replace("Actitud", "Atitude")
    .replace("Mirada", "Olhar")
    .replace("Colección", "Coleção")
    .replace("Enero", "Janeiro")
    .replace("Movimiento", "Movimento")
    .replace("Nacida en el Fuego", "Nascida no Fogo")
    .replace("Video", "Vídeo")
    .replace("Brindis", "Brinde")
    .replace("Estilos", "Estilos");
};

// Sección — PROOF · NOW. Réplica de la slide "13 · Galería" del deck
// (engine.wtf-agency.works): header centrado + masonry de 5 columnas con las
// piezas 100% AI (imágenes + videos autoplay) y label en hover. Assets del deck.
const GallerySection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  const sectionRef = useRef(null);
  const register = useThemeRegister();

  useEffect(() => {
    register(sectionRef.current, THEMES.night);
  }, [register]);

  return (
    <section
      ref={sectionRef}
      data-theme-section
      data-bg={THEMES.night.bg}
      id="v3-galeria"
      className="relative bg-[#0A0A0C] scroll-mt-24 overflow-hidden"
    >
      {/* Slide inicial con fondo árbol nocturno */}
      <div className="relative flex min-h-screen items-center pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero/gallery-bg.jpg" alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[#0A0A0C]/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/25 via-transparent to-[#0A0A0C]" />
        </div>
        <div className="relative z-10">

      {/* Header (mismo layout que "La prueba · Then") */}
      <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <motion.p
          {...fadeUp}
          className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase opacity-50 mb-6"
        >
          {c.kicker}
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Headline size="section" className="!text-[clamp(24px,3.7vw,53px)]" lines={c.headline} />
          <motion.p
            {...fadeUp}
            className="text-base md:text-lg font-light max-w-md opacity-60 md:text-right"
          >
            {c.subline}
          </motion.p>
        </div>
      </div>

      {/* Barra de números (datos de "El sistema" del deck) */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 border-y border-current/15 py-8">
          {METRICS.map((m, i) => (
            <div key={m.key} className="text-center px-1">
              <Counter
                value={m.value}
                suffix={m.suffix}
                static={m.static}
                className="font-black text-3xl md:text-5xl leading-none block"
              />
              <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.14em] opacity-50">{c.metrics[i]}</p>
            </div>
          ))}
        </div>
      </div>
        </div>
      </div>

      {/* Masonry 5 columnas (CSS columns, como el deck), debajo del slide inicial */}
      <div className="columns-2 gap-1 px-1 pt-1 pb-16 sm:columns-3 md:columns-4 md:pb-20 lg:columns-5">
        {GALLERY.map((it) => {
          const label = galleryLabel(it, lang);
          return (
          <div
            key={it.src}
            className="group relative mb-1 break-inside-avoid overflow-hidden rounded-md transition-opacity duration-300 hover:opacity-90"
          >
            {it.video ? (
              <LazyVideo src={it.src} label={label} />
            ) : (
              <img src={it.src} alt={label} loading="lazy" decoding="async" className="block w-full" />
            )}
            <div className="absolute inset-0 flex items-end p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-hud text-[9px] tracking-wide bg-volt text-white px-1.5 py-1 rounded">{label}</span>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
};

export default GallerySection;
