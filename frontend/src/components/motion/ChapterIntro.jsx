import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Timecode } from "../../sections/shared";

// Card de capítulo pinned: un viewport completo de scroll dedicado a anunciar
// el acto. El numeral fantasma deriva, la regla volt se dibuja, la card respira.
const ChapterIntro = ({ num, total = "05", title, kicker, theme = "dark" }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.78, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1.02]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const ruleX = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);

  const dark = theme === "dark";
  const bg = dark ? "bg-black" : "bg-bone";
  const fg = dark ? "text-white/85" : "text-black/80";

  if (reduced) {
    return (
      <section ref={ref} className={`relative h-svh ${bg}`} data-testid={`cap-intro-${num}`}>
        <div className="h-full flex items-center justify-center text-center px-6">
          <div>
            <p className="font-hud text-xs tracking-[0.35em] text-volt mb-6">
              CAP. {num} / {total}
              {kicker ? ` — ${kicker}` : ""}
            </p>
            <h2 className={`font-display font-thin size-display-0 leading-[0.9] ${fg}`}>{title}</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`relative h-[150vh] md:h-[200vh] ${bg}`}
      data-testid={`cap-intro-${num}`}
    >
      <div className="sticky top-0 h-svh flex items-center justify-center overflow-hidden">
        <motion.span
          aria-hidden="true"
          style={{ x: ghostX }}
          className={`ghost-num ${dark ? "" : "ghost-num--dark"} !top-1/2 !-translate-y-1/2`}
        >
          {num}
        </motion.span>
        <motion.div style={{ opacity, scale }} className="relative text-center px-6 max-w-6xl">
          <p className="font-hud text-xs tracking-[0.35em] text-volt mb-6">
            CAP. {num} / {total}
            {kicker ? ` — ${kicker}` : ""}
          </p>
          <h2 className={`font-display font-thin size-display-0 leading-[0.9] ${fg}`}>{title}</h2>
          <motion.div style={{ scaleX: ruleX }} className="h-px bg-volt mt-10 origin-left" />
          <Timecode className="block mt-6 text-right text-[10px] text-volt/60" />
        </motion.div>
      </div>
    </section>
  );
};

export default ChapterIntro;
