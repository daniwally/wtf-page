import RevealLines from "../../components/motion/RevealLines";

// Headlines con el juego del deck engine: base HAIRLINE (font-thin 100) en
// UPPERCASE + énfasis en <b> (700) — el contraste de pesos que conocemos. El <b>
// mantiene su bold aunque el padre sea thin (regla en index.css bajo .monks-root).
const SIZES = {
  hero: "text-[clamp(40px,7vw,96px)]",
  section: "text-[clamp(32px,5vw,72px)]",
  sub: "text-[clamp(24px,3.5vw,44px)]",
  gracias: "text-[clamp(64px,18vw,300px)]",
};

const Headline = ({ lines, size = "section", level = 2, className = "", ...rest }) => (
  <RevealLines
    as="p"
    role="heading"
    aria-level={level}
    className={`font-thin uppercase tracking-[0.03em] leading-[1.0] ${SIZES[size]} ${className}`}
    {...rest}
    lines={lines}
  />
);

export default Headline;
