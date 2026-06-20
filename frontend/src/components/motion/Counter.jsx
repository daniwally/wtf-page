import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView, useReducedMotion, animate } from "framer-motion";

// Contador animado: el MotionValue escribe textContent directo, cero re-renders.
const Counter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  static: staticNode,
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || staticNode != null) return;
    if (reduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {staticNode != null ? (
        staticNode
      ) : (
        <>
          {prefix}
          <motion.span>{rounded}</motion.span>
          {suffix}
        </>
      )}
    </span>
  );
};

export default Counter;
