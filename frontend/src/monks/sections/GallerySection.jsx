import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { fadeUp, galeria } from "../../sections/shared";
import { useThemeRegister } from "../theme/ThemeContext";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import { useEffect } from "react";

const PIECES = [
  { file: "shaq-lifestyle.jpg", brand: "Shaq" },
  { file: "starter-trucker.jpg", brand: "Starter" },
  { file: "diablo-tattoo.jpg", brand: "Pisco Diablo" },
  { file: "sensus-mirada.jpg", brand: "Sensus" },
  { file: "hydrate-runner.jpg", brand: "Hydrate" },
  { file: "shaq-shoe-green.jpg", brand: "Shaq" },
  { file: "starter-1971.jpg", brand: "Starter" },
  { file: "diablo-red.jpg", brand: "Pisco Diablo" },
  { file: "morelli-post-13.jpg", brand: "Morelli" },
  { file: "sensus-moscatel.jpg", brand: "Sensus" },
  { file: "hydrate-locker.jpg", brand: "Hydrate" },
  { file: "shaq-radiate.jpg", brand: "Shaq" },
];

// Riel horizontal scroll-driven (patrón Cap04, recoloreado). La sección entera
// es el tema 'night'; se registra directo en el observer (no usa ThemeSection
// porque necesita el wrapper h-[300vh]+sticky).
const GallerySection = () => {
  const railRef = useRef(null);
  const sectionRef = useRef(null);
  const register = useThemeRegister();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  useEffect(() => {
    register(sectionRef.current, THEMES.night);
  }, [register]);

  const Header = (
    <div className="container mx-auto px-6 md:px-12 mb-8">
      <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <Headline size="sub" lines={[<>100% <b>AI</b></>]} />
        <p className="text-base md:text-lg font-normal max-w-sm opacity-60 md:text-right">
          Salido del Engine. Sin un solo rodaje en el medio.
        </p>
      </motion.div>
    </div>
  );

  if (reduced) {
    return (
      <section ref={sectionRef} data-theme-section data-bg={THEMES.night.bg} className="relative py-24" id="v2-galeria">
        {Header}
        <div className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-4">
          {PIECES.map((p) => (
            <img key={p.file} src={galeria(p.file)} alt={p.brand} className="h-[40vh] w-auto rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        railRef.current = el;
      }}
      data-theme-section
      data-bg={THEMES.night.bg}
      className="relative h-[300vh]"
      id="v2-galeria"
    >
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">
        {Header}
        <motion.div style={{ x }} className="flex gap-4 pl-6 md:pl-12 w-max">
          {PIECES.map((piece) => (
            <figure key={piece.file} className="flex-shrink-0">
              <div className="h-[48vh] md:h-[56vh] rounded-2xl md:rounded-3xl overflow-hidden bg-white/5">
                <img
                  src={galeria(piece.file)}
                  alt={`${piece.brand} — 100% AI`}
                  className="h-full w-auto object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between pt-3">
                <span className="font-bold text-sm">{piece.brand}</span>
                <span className="rounded-full border border-volt/50 text-volt px-3 py-1 text-[10px] font-semibold tracking-wide">
                  100% AI
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
