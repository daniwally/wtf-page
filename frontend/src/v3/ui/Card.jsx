import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../sections/shared";

// Card Monks con SPOTLIGHT: glow naranja que sigue al mouse (patrón 21st
// re-skineado). tone: light (sobre crema) | dark (sobre negro) | voltline.
const TONES = {
  light: "bg-white/55 backdrop-blur-sm",
  dark: "bg-white/[0.05] border border-white/10",
  voltline: "border border-[#0A0A0C]/15",
};

// spotlight=false apaga el glow que sigue al cursor (p. ej. cards que invierten
// colores en hover vía group-hover en sus children).
const Card = ({ children, tone = "light", className = "", index = 0, spotlight = true, ...rest }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!spotlight) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 ${TONES[tone]} ${className}`}
      {...rest}
    >
      {/* Glow que sigue al cursor */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,59,48,0.16), transparent 70%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
};

export const SectionIntro = ({ children, className = "" }) => (
  <motion.div {...fadeUp} className={`mb-12 md:mb-16 ${className}`}>
    {children}
  </motion.div>
);

export default Card;
