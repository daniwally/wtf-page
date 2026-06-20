import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CONTACT_EMAIL } from "../../sections/shared";
import { useThemeRegister } from "../theme/ThemeContext";
import { THEMES } from "../theme/palette";
import PillButton, { TagPill } from "../ui/PillButton";

const clamp = (n) => Math.min(1, Math.max(0, n));

// Opening: splash LIMPIO (solo la imagen del perro negro) y, al primer scroll,
// se revela todo. Progreso de scroll manual (mismo patrón robusto que el
// theme-swap; framer useScroll(target) no trackeaba en este entorno).
const HeroSection = () => {
  const ref = useRef(null);
  const register = useThemeRegister();
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    register(ref.current, THEMES.night);
  }, [register]);

  useEffect(() => {
    if (reduced) {
      setP(0.45);
      return;
    }
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const reveal = el.offsetHeight - window.innerHeight;
      setP(clamp((window.scrollY - el.offsetTop) / (reveal || 1)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const overlay = 0.2 + 0.7 * clamp(p / 0.5);
  const cue = 1 - clamp(p / 0.12);
  const reveal = clamp((p - 0.12) / 0.3);

  return (
    <section
      ref={ref}
      id="v2-hero"
      data-theme-section
      data-bg={THEMES.night.bg}
      className="relative h-[180vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden flex items-end pb-20 md:pb-28 bg-[#0A0A0C]">
        {/* Imagen del perro negro, limpia */}
        <div
          className="absolute inset-0 kenburns"
          style={{
            backgroundImage: "url(/assets/hero/hero-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Oscurecido que crece con el scroll para revelar el contenido */}
        <div className="absolute inset-0 bg-[#0A0A0C]" style={{ opacity: overlay }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C]/80 via-transparent to-transparent" />

        {/* Contenido — oculto en el splash, se revela al scrollear */}
        <div
          className="container mx-auto px-6 md:px-12 relative"
          style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 50}px)` }}
        >
          <TagPill className="mb-7 text-white/80">Battle Tested Creativity · Since 2010</TagPill>

          <p
            role="heading"
            aria-level={1}
            className="font-thin uppercase tracking-[0.03em] leading-[1.0] text-[clamp(36px,5.6vw,88px)] text-white"
          >
            No somos una agencia.
            <br />
            <b className="text-[#FF3B30]">Somos un sistema.</b>
          </p>

          <p className="mt-7 text-base md:text-xl font-normal max-w-xl text-white/70">
            La creatividad entrenada para reinterpretar. La IA no reemplaza 15
            años de experiencia: los multiplica.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <PillButton href={`mailto:${CONTACT_EMAIL}?subject=Destruyamos%20un%20brief`} variant="invert" arrow>
              Destruyamos un brief
            </PillButton>
            <PillButton
              href="#v2-sistema"
              variant="outline"
              className="text-white border-white/60 hover:bg-white/10"
            >
              Cómo funciona el sistema
            </PillButton>
          </div>
        </div>

        {/* Scroll cue del splash — se desvanece al empezar a scrollear */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: cue }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Scrolleá</span>
          <ChevronDown className="text-white/50 animate-bounce" size={26} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
