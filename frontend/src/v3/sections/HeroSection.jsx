import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useThemeRegister } from "../theme/ThemeContext";
import { THEMES } from "../theme/palette";
import { useLang } from "../i18n/LangContext";

const HERO_VIDEO = "/assets/hero/moto.mp4"; // motociclista neón (video del deck)
const HERO_POSTER = "/assets/hero/moto-poster.jpg";
const LOGO_LOCKUP = "/assets/logos/logo-wtf-lockup.png"; // lockup WTF+Brief Destroyers (deck)
const EASE = [0.22, 1, 0.36, 1];

// Copy bilingüe (es | en): se consume con useLang(). El eyebrow del lockup
// ("Battle Tested Creativity Since 2010") queda igual en ambos idiomas (línea de marca).
const COPY = {
  es: {
    eyebrow: "Battle Tested Creativity Since 2010",
    titleA: "No hacemos campañas.",
    titleB: "Construimos sistemas que mueven marcas.",
    bajadaPre: "Combinamos estrategia senior, creatividad, producción, data e IA para ",
    bajadaEmph: "pensar, crear, mover y aprender",
    bajadaPost: " más rápido.",
  },
  en: {
    eyebrow: "Battle Tested Creativity Since 2010",
    titleA: "We don't make campaigns.",
    titleB: "We build systems that move brands.",
    bajadaPre: "We combine senior strategy, creativity, production, data and AI to ",
    bajadaEmph: "think, create, move and learn",
    bajadaPost: " faster.",
  },
};

// v3 Opening: el mensaje aparece desde el primer segundo sobre el video de marca.
const HeroSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  const ref = useRef(null);
  const register = useThemeRegister();

  useEffect(() => {
    register(ref.current, THEMES.night);
  }, [register]);

  return (
    <section
      ref={ref}
      id="v3-hero"
      data-theme-section
      data-bg={THEMES.night.bg}
      className="relative min-h-screen overflow-hidden bg-[#0A0A0C] text-center"
    >
      {/* Perro de fondo full-bleed: video en loop, espejado (queda a la derecha) */}
      <div className="absolute inset-0 z-0">
        <video
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,14,0.45) 0%, rgba(10,10,14,0.70) 100%)" }}
        />
      </div>

      {/* Headline principal */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-[2] px-[6%] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="uppercase tracking-tight leading-[1.08] text-[clamp(21px,3vw,48px)] text-white"
        >
          <span className="block font-bold">{c.titleA}</span>
          <span className="block font-thin">{c.titleB}</span>
        </motion.h1>
      </div>

      {/* Logo lockup completo (imagen del deck: WTF + divisoria + Brief Destroyers) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute inset-x-0 top-[calc(22%_-_25px)] z-10 flex flex-col items-center text-center"
      >
        <p className="mb-3 md:mb-4 text-xs md:text-[15px] tracking-[0.42em] uppercase text-white/50 font-light">
          {c.eyebrow}
        </p>
        <img
          src={LOGO_LOCKUP}
          alt="WTF · Brief Destroyers"
          width="720"
          height="363"
          className="h-[7.95rem] md:h-[10.1rem] w-auto opacity-90"
          style={{ filter: "brightness(1.1)" }}
        />
      </motion.div>

      {/* Sub: el concepto IA + experiencia */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[63%] z-10 max-w-[640px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="text-[clamp(16.5px,1.76vw,21px)] font-light leading-[1.7] text-white/60"
        >
          {c.bajadaPre}
          <span className="text-white/90">{c.bajadaEmph}</span>
          {c.bajadaPost}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-white/30 animate-bounce" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
