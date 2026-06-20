import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Parallax sutil: ±range% de desplazamiento vertical con overscan para no
// mostrar bordes. Presupuesto máximo ~6 instancias por página; nunca en listas.
const Parallax = ({ children, range = 8, className = "" }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${range}%`, `-${range}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full scale-[1.18]">
        {children}
      </motion.div>
    </div>
  );
};

export default Parallax;
