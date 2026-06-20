import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useThemeRegister } from "../theme/ThemeContext";
import { THEMES } from "../theme/palette";
import ParticleText from "../ui/ParticleText";

const WORDS = ["NO SOMOS UNA AGENCIA", "SOMOS UN SISTEMA"];
const HERO_VIDEO = "/assets/hero/moto.mp4"; // motociclista neón (video del deck)
const HERO_POSTER = "/assets/hero/moto-poster.jpg";
const LOGO_LOCKUP = "/assets/logos/logo-wtf-lockup.png"; // lockup WTF+Brief Destroyers (deck)
const EASE = [0.22, 1, 0.36, 1];

// v3 Opening: ParticleTextEffect fiel (Kain0127) re-skineado a WTF — el texto se
// forma con partículas, ciclando las palabras, sobre fondo oscuro (como la demo).
const HeroSection = () => {
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
          style={{ background: "linear-gradient(180deg, rgba(10,10,14,0.65) 0%, rgba(10,10,14,0.85) 100%)" }}
        />
      </div>

      {/* Intro de partículas (corre 1 vez), se desvanece al terminar */}
      <ParticleText
        words={WORDS}
        align="center"
        holdFrames={[450, 360]} // ~7.5s "NO SOMOS UNA AGENCIA" · ~6s "SOMOS UN SISTEMA"
        loop={false}
        onComplete={handleIntroDone}
        className={`absolute inset-0 z-[1] h-full w-full transition-opacity [transition-duration:1200ms] ${
          introDone ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Headline tipográfico real — aparece cuando la intro se disuelve */}
      <div className="pointer-events-none absolute left-[6%] top-1/2 -translate-y-1/2 z-[2] max-w-[64%] text-left">
        <motion.p
          role="heading"
          aria-level={1}
          initial={false}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 14 }}
          transition={{ duration: 1.1, ease: EASE }}
          aria-hidden={!introDone}
          className="uppercase tracking-tight leading-[1.05] text-[clamp(30px,4vw,58px)] text-white"
        >
          <span className="block whitespace-nowrap font-thin">La creatividad entrenada para</span>
          <span className="block font-bold">reinterpretar.</span>
        </motion.p>
      </div>

      {/* Logo lockup completo (imagen del deck: WTF + divisoria + Brief Destroyers) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="absolute left-[6%] top-[12%] z-10"
      >
        <img
          src={LOGO_LOCKUP}
          alt="WTF · Brief Destroyers"
          className="h-24 md:h-[7.65rem] w-auto opacity-90"
          style={{ filter: "brightness(1.1)" }}
        />
      </motion.div>

      {/* Sub: el concepto IA + experiencia, aparece CON el headline (introDone) */}
      <div className="absolute left-[6%] top-[63%] z-10 max-w-[640px] text-left">
        <motion.p
          initial={false}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 18 }}
          transition={{ duration: 0.9, ease: EASE, delay: introDone ? 0.4 : 0 }}
          className="text-[clamp(18px,2.3vw,27px)] font-light italic leading-[1.4] text-white"
        >
          La IA no reemplaza 15 años de experiencia,
          <br />
          los multiplica.
        </motion.p>
        <motion.p
          initial={false}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 18 }}
          transition={{ duration: 0.9, ease: EASE, delay: introDone ? 0.6 : 0 }}
          className="mt-5 text-[clamp(14px,1.5vw,17px)] font-light leading-[1.7] text-white/55"
        >
          <span className="text-white/90">IA</span> para acelerar.
          <br />
          <span className="text-white/90">Estrategia</span> para enfocar.
          <br />
          <span className="text-white/90">Creatividad</span> para diferenciar.
          <br />
          <span className="text-white/90">Criterio</span> para no volverse ruido.
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
