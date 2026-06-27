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

// Renderiza un heading REAL (h1..h6 según level) para jerarquía semántica/SEO.
// El estilo hairline + el <b> en negrita los fuerzan las clases (ganan a la regla
// global de h1-h6), así que el tag real no cambia el look.
const Headline = ({ lines, size = "section", level = 2, className = "", ...rest }) => (
  <RevealLines
    as={`h${Math.min(Math.max(level, 1), 6)}`}
    className={`font-thin uppercase tracking-[0.03em] leading-[1.0] ${SIZES[size]} ${className}`}
    {...rest}
    lines={lines}
  />
);

export default Headline;
