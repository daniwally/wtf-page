import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { fadeUp, HERO_IMAGES, LOGOS, CONTACT_EMAIL } from "../sections/shared";
import { useChapterRegister } from "../components/motion/ChapterContext";
import RevealLines from "../components/motion/RevealLines";

// CAP 00 — APERTURA. El statement cinematográfico. Sin chapter-card propia:
// el hero ES la card de apertura de la película.
const Cap00Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const register = useChapterRegister();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * HERO_IMAGES.length);
        } while (next === prev && HERO_IMAGES.length > 1);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="cap-00"
      data-chapter="00"
      ref={register}
      className="min-h-screen relative flex items-center justify-center overflow-hidden scroll-mt-20"
      data-testid="hero-section"
    >
      {/* Slideshow con Ken Burns */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 kenburns ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />

      {/* Statement a todo el viewport */}
      <div className="relative z-20 min-h-screen w-full flex flex-col justify-end px-6 md:px-12 pb-10 pt-32">
        <motion.div {...fadeUp}>
          <p
            className="font-hud text-white/60 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-6"
            data-testid="hero-tagline"
          >
            Battle Tested Creativity · Since 2010
          </p>

          {/* Logos — las credenciales no se recortan */}
          <div className="flex items-center gap-5 md:gap-8 mb-10">
            <img
              src={LOGOS.wtfWhite}
              alt="WTF Logo"
              className="h-16 md:h-24 w-auto"
              data-testid="hero-wtf-logo"
            />
            <div className="w-px h-14 md:h-20 bg-white/30" />
            <img
              src={LOGOS.briefWhite}
              alt="Brief Destroyers"
              className="h-12 md:h-20 w-auto"
              data-testid="hero-bd-logo"
            />
          </div>

          <RevealLines
            as="h1"
            className="font-display font-thin text-[min(10vw,13vh)] md:text-[min(10.5vw,14.5vh)] text-white/85 leading-[0.92] mb-10"
            stagger={0.15}
            amount={0.2}
            lines={[
              <>La creatividad</>,
              <>entrenada para</>,
              <b className="text-white">reinterpretar</b>,
            ]}
            data-testid="hero-title"
          />

          {/* Barra inferior: tesis + CTAs */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-white/20 pt-6">
            <p className="text-base md:text-lg text-white/70 font-light" data-testid="hero-description">
              La IA no reemplaza 15 años de experiencia.{" "}
              <span className="text-volt font-medium">Los multiplica.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Destruyamos%20un%20brief`}
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-volt transition-colors"
                data-testid="hero-cta-primary"
              >
                Destruyamos un brief <ArrowRight size={14} />
              </a>
              <a
                href="#cap-04"
                className="inline-flex items-center gap-2 border border-white text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                data-testid="hero-cta-secondary"
              >
                Cómo funciona el sistema
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dots del slideshow */}
      <div className="absolute top-28 right-6 md:right-12 z-20 flex gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? "bg-volt w-6" : "bg-white/30"
            }`}
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Cap00Hero;
