import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useThemeRegister } from "../theme/ThemeContext";
import { THEMES } from "../theme/palette";
import ParticleText from "../ui/ParticleText";
import { useLang } from "../i18n/LangContext";

const HERO_VIDEO = "/assets/hero/moto.mp4"; // motociclista neón (video del deck)
const HERO_POSTER = "/assets/hero/moto-poster.jpg";
const LOGO_LOCKUP = "/assets/logos/logo-wtf-lockup.png"; // lockup WTF+Brief Destroyers (deck)
const EASE = [0.22, 1, 0.36, 1];

// Copy bilingüe (es | en): se consume con useLang(). El eyebrow del lockup
// ("Battle Tested Creativity Since 2010") queda igual en ambos idiomas (línea de marca).
const COPY = {
  es: {
    words: ["NO SOMOS UNA AGENCIA", "SOMOS UN SISTEMA"],
    eyebrow: "Battle Tested Creativity Since 2010",
    titleA: "No hacemos campañas.",
    titleB: "Construimos sistemas que mueven marcas.",
    bajadaPre: "Combinamos estrategia senior, creatividad, producción, data e IA para ",
    bajadaEmph: "pensar, crear, mover y aprender",
    bajadaPost: " más rápido.",
  },
  en: {
    words: ["WE ARE NOT AN AGENCY", "WE ARE A SYSTEM"],
    eyebrow: "Battle Tested Creativity Since 2010",
    titleA: "We don't make campaigns.",
    titleB: "We build systems that move brands.",
    bajadaPre: "We combine senior strategy, creativity, production, data and AI to ",
    bajadaEmph: "think, create, move and learn",
    bajadaPost: " faster.",
  },
};

// v3 Opening: ParticleTextEffect fiel (Kain0127) re-skineado a WTF — el texto se
// forma con partículas, ciclando las palabras, sobre fondo oscuro (como la demo).
const HeroSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  const ref = useRef(null);
  const register = useThemeRegister();
  // La intro de partículas corre UNA vez y al terminar se disuelve revelando el
  // headline tipográfico real (sistema, ya no partículas).
  const [introDone, setIntroDone] = useState(false);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

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
          aria-hidden
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,14,0.45) 0%, rgba(10,10,14,0.70) 100%)" }}
        />
      </div>

      {/* Intro de partículas (corre 1 vez), se desvanece al terminar */}
      <ParticleText
        words={c.words}
        align="center"
        holdFrames={[450, 360]} // ~7.5s "NO SOMOS UNA AGENCIA" · ~6s "SOMOS UN SISTEMA"
        loop={false}
        onComplete={handleIntroDone}
        className={`absolute inset-0 z-[1] h-full w-full transition-opacity [transition-duration:1200ms] ${
          introDone ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Headline tipográfico real — aparece cuando la intro se disuelve */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-[2] px-[6%] text-center">
        <motion.h1
          initial={false}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 14 }}
          transition={{ duration: 1.1, ease: EASE }}
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
          className="h-[7.95rem] md:h-[10.1rem] w-auto opacity-90"
          style={{ filter: "brightness(1.1)" }}
        />
      </motion.div>

      {/* Sub: el concepto IA + experiencia, aparece CON el headline (introDone) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[63%] z-10 max-w-[640px] text-center">
        <motion.p
          initial={false}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 18 }}
          transition={{ duration: 0.9, ease: EASE, delay: introDone ? 0.4 : 0 }}
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
