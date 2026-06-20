import { useState, useEffect } from "react";

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Background Images — assets locales en /public/assets (migrados de los CDNs)
export const IMAGES = {
  horses: "/assets/hero/horses.jpg",
};

export const HERO_IMAGES = [
  "/assets/hero/hero-1.jpg", // VR dog
  "/assets/hero/hero-2.jpg", // Goggles woman
  "/assets/hero/hero-3.jpg", // Armchair desert
  "/assets/hero/hero-4.jpg", // Motorcycle racer
  "/assets/hero/hero-5.jpg", // Black sheep
  "/assets/hero/hero-6.jpg", // Red heels
];

export const LOGOS = {
  wtfWhite: "/assets/brand/logo-wtf-blanco.png",
  wtfBlack: "/assets/brand/logo-wtf-negro.png",
  briefWhite: "/assets/brand/logo-brief-blanco.png",
  briefBlack: "/assets/brand/logo-brief-negro.png",
};

export const CONTACT_EMAIL = "hello@wtf-agency.com";

// Assets del deck de credenciales — servidos localmente desde /public/assets
export const galeria = (file) => `/assets/galeria/${file}`;
export const logo = (file) => `/assets/logos/${file}`;

// Full Screen Section with Background Image
export const FullScreenSection = ({ image, children, overlay = "bg-black/50", className = "" }) => (
  <section
    className={`min-h-screen relative flex items-center justify-center overflow-hidden ${className}`}
    style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className={`absolute inset-0 ${overlay}`} />
    <div className="relative z-10 w-full">
      {children}
    </div>
  </section>
);

// Numbered HUD section label: "01 — EL CONTEXTO"
export const SectionLabel = ({ index, title, dark = false, className = "" }) => (
  <p
    className={`font-hud text-xs tracking-[0.35em] uppercase mb-8 ${
      dark ? "text-black/50" : "text-volt"
    } ${className}`}
    data-testid={`label-${index}`}
  >
    {index} — {title}
  </p>
);

// Numeral fantasma: outline gigante 900 detrás del header de sección
export const Ghost = ({ n, dark = false }) => (
  <span aria-hidden="true" className={`ghost-num ${dark ? "ghost-num--dark" : ""}`}>
    {n}
  </span>
);

// Live ticking timecode, 24fps style
export const Timecode = ({ className = "" }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 100);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(elapsed / 1000);
  const frames = Math.floor((elapsed % 1000) / (1000 / 24));
  const pad = (n) => String(n).padStart(2, "0");
  const h = pad(Math.floor(totalSeconds / 3600));
  const m = pad(Math.floor((totalSeconds % 3600) / 60));
  const s = pad(totalSeconds % 60);
  const f = pad(frames);

  return (
    <span className={`font-hud tabular-nums ${className}`} data-testid="timecode">
      {h}:{m}:{s}:{f}
    </span>
  );
};
