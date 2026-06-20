import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";
import RevealLines from "../../components/motion/RevealLines";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";

// Tercera página = el quiebre, lenguaje del deck (oscuro): kicker mono rojo,
// headline hairline + énfasis en itálica roja, y payoff. Tema night.
const BreakSection = () => (
  <ThemeSection
    theme={THEMES.night}
    id="v3-break"
    pad="pt-20 pb-12 md:pt-24 md:pb-16"
    className="flex flex-col justify-center"
  >
    <div className="container mx-auto px-6 md:px-12">
      {/* Kicker mono rojo (firma del deck) */}
      <motion.p
        {...fadeUp}
        className="font-hud text-[11px] md:text-xs tracking-[0.28em] uppercase text-volt mb-5"
      >
        Destruimos briefs
      </motion.p>

      {/* Headline: hairline + énfasis en itálica roja (estilo deck) */}
      <RevealLines
        as="p"
        role="heading"
        aria-level={2}
        className="uppercase tracking-tight leading-[1.02] text-[clamp(40px,6vw,88px)] max-w-5xl"
        lines={[
          <span key="a" className="font-thin">
            No hacemos lo correcto.
          </span>,
          <span key="b" className="italic font-bold text-volt">
            Hacemos lo que funciona.
          </span>,
        ]}
      />

      {/* Payoff */}
      <motion.p
        {...fadeUp}
        className="mt-8 md:mt-10 max-w-4xl text-2xl md:text-3xl lg:text-4xl font-thin tracking-tight leading-[1.05]"
      >
        <span className="italic text-volt">Velocidad, estrategia y criterio.</span>{" "}
        En el mismo sistema.
      </motion.p>
    </div>
  </ThemeSection>
);

export default BreakSection;
