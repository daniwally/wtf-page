import { motion, useScroll, useSpring } from "framer-motion";

// Barra de progreso volt — la película avanza.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[2px] bg-volt origin-left z-[60]"
      data-testid="scroll-progress"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
