import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Píldoras Monks con efecto MAGNÉTICO: el botón se imanta al cursor (patrón
// 21st). variant: primary | invert | volt | outline.
const BASE =
  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 will-change-transform";

const VARIANTS = {
  primary: "bg-[#0A0A0C] text-[#F4F1E8] hover:bg-[#FF3B30] hover:text-[#F4F1E8]",
  invert: "bg-[#F4F1E8] text-[#0A0A0C] hover:bg-[#FF3B30] hover:text-[#F4F1E8]",
  volt: "bg-[#FF3B30] text-[#F4F1E8] hover:bg-[#0A0A0C] hover:text-[#FF3B30]",
  outline: "border border-current text-current hover:bg-current/10",
};

const PillButton = ({
  children,
  href,
  variant = "primary",
  arrow = false,
  magnetic = true,
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 18, mass: 0.4 });

  const on = magnetic && !reduced;

  const onMove = (e) => {
    if (!on) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} />}
    </>
  );
  const motionProps = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: on ? { x: sx, y: sy } : undefined,
    className: cls,
    ...rest,
  };

  return href ? (
    <motion.a href={href} {...motionProps}>
      {content}
    </motion.a>
  ) : (
    <motion.button {...motionProps}>{content}</motion.button>
  );
};

// Tag/eyebrow pill (sin magnetismo)
export const TagPill = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-current/30 px-3 py-1 text-xs font-medium tracking-wide ${className}`}
  >
    {children}
  </span>
);

export default PillButton;
