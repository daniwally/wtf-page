import { motion } from "framer-motion";

// Forma flotante (patrón kokonut "shape-landing-hero" re-skineado a WTF):
// cápsula con gradiente translúcido, borde sutil, blur. Entra rotando y luego
// flota en loop. gradient = clase tailwind del from-* (blanco o volt).
const ElegantShape = ({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}) => (
  <motion.div
    initial={{ opacity: 0, y: -140, rotate: rotate - 15 }}
    animate={{ opacity: 1, y: 0, rotate }}
    transition={{
      duration: 2.2,
      delay,
      ease: [0.23, 0.86, 0.39, 0.96],
      opacity: { duration: 1.1 },
    }}
    className={`absolute ${className}`}
    aria-hidden="true"
  >
    <motion.div
      animate={{ y: [0, 14, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{ width, height }}
      className="relative"
    >
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} to-transparent backdrop-blur-[2px] border-2 border-white/[0.12] shadow-[0_8px_32px_0_rgba(255,255,255,0.06)]`}
      />
    </motion.div>
  </motion.div>
);

export default ElegantShape;
