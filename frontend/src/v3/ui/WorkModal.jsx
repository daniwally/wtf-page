import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import { getWorkText } from "../data/workPt";

// Modal de detalle de cada comercial — REPLICA EXACTA del deck
// (engine.wtf-agency.works): overlay sobre foto de pared + gradiente; card glass
// con header (logo + título thin/bold + descripción) y placa crema con masonry
// (imagen grande 3fr + 2 apiladas 2fr → video inline con controles → imágenes extra).
// Copy bilingüe (es | en): se consume con useLang().
const DECK = "https://engine.wtf-agency.works/wtf-credenciales-slides";
const WALL = "/assets/hero/modal-bg.jpg"; // árbol nocturno (fondo de los modales)
const EXPO = [0.16, 1, 0.3, 1];
const imgStyle = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
const COPY = {
  es: { close: "Cerrar" },
  en: { close: "Close" },
  pt: { close: "Fechar" },
};

const WorkModal = ({ work, onClose }) => {
  const { lang } = useLang();
  const c = COPY[lang];
  const dialogRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Foco: mover al diálogo al abrir, restaurar al elemento previo al cerrar.
    const prevFocus = document.activeElement;
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      if (prevFocus && typeof prevFocus.focus === "function") prevFocus.focus();
    };
  }, [onClose]);

  if (!work) return null;
  const localized = getWorkText(work, lang);
  const imgs = work.images || [];
  const poster = work.video ? work.video.replace(/\.mp4$/, "-poster.jpg") : null;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={work.name}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="hide-scrollbar"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        overflowY: "auto",
        overflowX: "hidden",
        background: `linear-gradient(180deg,rgba(10,10,12,0.3) 0%,rgba(10,10,12,0.45) 55%,rgba(10,10,12,0.7) 100%), url('${WALL}') center center/cover no-repeat`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Cerrar (fijo) */}
      <button
        onClick={onClose}
        aria-label={c.close}
        style={{
          position: "fixed", top: 20, right: 24, zIndex: 10001,
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,.1)", color: "#fff",
          fontSize: "1.1rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        ✕
      </button>

      {/* Contenido (portrait, centrado) */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 5vw 80px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EXPO }}
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 16,
            padding: "2.5rem 3rem",
          }}
        >
          {/* Header: logo + título + descripción */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", marginBottom: "2rem" }}>
            {work.logo && (
              <div style={{ flexShrink: 0, width: 100 }}>
                <img src={work.logo} alt="" aria-hidden style={{ width: "100%", filter: "brightness(10)" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: ".8rem" }}>
                {lang === "pt" ? (
                  <span style={{ fontWeight: 900 }}>{work.name}</span>
                ) : (
                  <>
                    {work.thin && <span style={{ fontWeight: 100, opacity: 0.7 }}>{work.thin} </span>}
                    <span style={{ fontWeight: 900 }}>{work.bold}</span>
                  </>
                )}
              </h2>
              <p
                style={{ fontSize: ".9rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7, maxWidth: 650 }}
                className="[&_strong]:font-bold [&_strong]:text-white"
                dangerouslySetInnerHTML={{ __html: localized.desc }}
              />
            </div>
          </div>

          {/* Placa crema con masonry */}
          <div style={{ background: "rgba(240,238,230,0.95)", borderRadius: 12, padding: "1rem" }}>
            {/* Fila 1: imagen grande (3fr) + 2 apiladas (2fr) */}
            <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: ".8rem", marginBottom: ".8rem" }}>
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                {imgs[0] && <img src={imgs[0]} alt={work.name} loading="lazy" style={imgStyle} />}
              </div>
              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: ".6rem" }}>
                {imgs[1] && <div style={{ borderRadius: 8, overflow: "hidden" }}><img src={imgs[1]} alt="" loading="lazy" style={imgStyle} /></div>}
                {imgs[2] && <div style={{ borderRadius: 8, overflow: "hidden" }}><img src={imgs[2]} alt="" loading="lazy" style={imgStyle} /></div>}
              </div>
            </div>

            {/* Video inline (controles + poster, no autoplay) */}
            {work.video && (
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <video src={work.video} poster={poster} preload="metadata" loop controls playsInline style={{ width: "100%", display: "block", background: "#000" }} />
              </div>
            )}

            {/* Imágenes extra (4ta en adelante) */}
            {imgs.length > 3 && (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${imgs.length - 3},1fr)`, gap: ".8rem", marginTop: ".8rem" }}>
                {imgs.slice(3).map((src) => (
                  <div key={src} style={{ borderRadius: 8, overflow: "hidden" }}>
                    <img src={src} alt="" loading="lazy" style={imgStyle} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkModal;
