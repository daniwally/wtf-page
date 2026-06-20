import { motion, useReducedMotion } from "framer-motion";

// Reveal línea por línea con máscara: cada línea sube desde abajo de su propio
// overflow-hidden. La coreografía de statements de toda la película.
const lineVariant = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const RevealLines = ({
  lines,
  as = "h2",
  className = "",
  stagger = 0.12,
  amount = 0.6,
  once = true,
  ...rest
}) => {
  const M = motion[as];
  const reduced = useReducedMotion();
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span variants={reduced ? fadeVariant : lineVariant} className="block">
            {line}
          </motion.span>
        </span>
      ))}
    </M>
  );
};

export default RevealLines;
