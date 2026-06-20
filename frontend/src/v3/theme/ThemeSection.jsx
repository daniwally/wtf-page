import { useEffect, useRef } from "react";
import { useThemeRegister } from "./ThemeContext";

// Sección transparente que registra su tema {bg,fg} en el observer del root.
// El fondo lo pinta la capa fixed animada; la sección queda transparente para
// que el cross-fade se lea a través.
const ThemeSection = ({ theme, id, className = "", pad = "py-24 md:py-36", children, ...rest }) => {
  const ref = useRef(null);
  const register = useThemeRegister();

  useEffect(() => {
    register(ref.current, theme);
  }, [register, theme]);

  return (
    <section
      ref={ref}
      id={id}
      data-theme-section
      data-bg={theme.bg}
      data-fg={theme.fg}
      className={`relative scroll-mt-24 ${pad} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
};

export default ThemeSection;
