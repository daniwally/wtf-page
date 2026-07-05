import { useEffect, useRef, useState } from "react";

// Los videos cinematográficos fuera del primer viewport no descargan hasta que
// el usuario se acerca. El poster conserva la composición durante la espera.
const ViewportVideo = ({ src, poster, className = "", rootMargin = "300px", ...rest }) => {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!shouldLoad || !ref.current) return;
    // Tras hidratar, React no re-aplica `muted` sobre el DOM prerenderizado y
    // Chrome rechaza play() de videos con sonido: silenciar SIEMPRE antes.
    ref.current.muted = true;
    ref.current.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      poster={poster}
      preload="none"
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      aria-hidden
      className={className}
      {...rest}
    />
  );
};

export default ViewportVideo;
