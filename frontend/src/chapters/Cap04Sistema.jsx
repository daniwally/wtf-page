import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { fadeUp, SectionLabel, galeria } from "../sections/shared";
import { useChapterRegister } from "../components/motion/ChapterContext";
import ChapterIntro from "../components/motion/ChapterIntro";
import RevealLines from "../components/motion/RevealLines";
import Counter from "../components/motion/Counter";

// CAP 04 — EL SISTEMA. El clímax de la película: la terminal bootea con el
// scroll (reversible), el Engine muestra los módulos, Soluciones orquesta,
// y el riel de galería desfila el output. Decir sin develar, coreografiado.

const BOOT_LINES = [
  { key: "sistema", value: "OPERATIVO", volt: true },
  { key: "criterio", value: "15 AÑOS DE CALLE", volt: true },
  { key: "módulos", value: "8 ACTIVOS", volt: true },
  { key: "herramientas", value: "20+ INTEGRADAS · 0 VISIBLES", volt: true },
  { key: "entrenamiento", value: "200+ CAMPAÑAS REALES", volt: true },
  { key: "reemplazar ideas", value: "ERROR — NO ENCONTRADO", volt: false },
  { key: "multiplicar ideas", value: "SIEMPRE", volt: true },
];

const dots = (key) => ".".repeat(Math.max(2, 22 - key.length));

const MODULES = [
  { name: "UGC Engine", outcome: "Contenido nativo que no parece publicidad." },
  { name: "Video Engine", outcome: "Del guión a la pantalla sin pasar por el rodaje." },
  { name: "Image Studio", outcome: "Key visuals sin límite de iteración." },
  { name: "Copy Engine", outcome: "Palabras entrenadas con 15 años de oficio." },
  { name: "Research Lab", outcome: "Audiencias decodificadas antes del brief." },
  { name: "Ads Studio", outcome: "Piezas que performan desde el día uno." },
  { name: "Analytics Hub", outcome: "Señales que vuelven al sistema y lo afinan." },
  { name: "Brand Systems", outcome: "Identidades que escalan a cualquier mercado." },
];

const METRICS = [
  { value: 10, suffix: "X", label: "más rápido" },
  { value: 48, suffix: "H", label: "a primera entrega" },
  { static: "∞", label: "iteraciones" },
  { value: 100, suffix: "%", label: "nuestro" },
];

const SOLUTIONS = [
  { name: "Brand Systems", outcome: "Sistemas de diseño vivos que escalan a cualquier marca y mercado." },
  { name: "Campañas 360°", outcome: "Spots y branded content con calidad cinematográfica." },
  { name: "Image + Key Visuals", outcome: "Identidad visual, gráfica, social assets, packaging." },
  { name: "Contenido Ilimitado", outcome: "UGC, talking heads, avatares, adaptación multi-formato." },
  { name: "Performance Creativo", outcome: "Variantes A/B e iteración guiada por data, no por ego." },
  { name: "Social First", outcome: "Nativo de cada plataforma: TikTok, Reels, YouTube, Stories." },
];

const PIECES = [
  { file: "shaq-lifestyle.jpg", brand: "Shaq" },
  { file: "starter-trucker.jpg", brand: "Starter" },
  { file: "diablo-tattoo.jpg", brand: "Pisco Diablo" },
  { file: "sensus-mirada.jpg", brand: "Sensus" },
  { file: "hydrate-runner.jpg", brand: "Hydrate" },
  { file: "shaq-shoe-green.jpg", brand: "Shaq" },
  { file: "starter-1971.jpg", brand: "Starter" },
  { file: "diablo-red.jpg", brand: "Pisco Diablo" },
  { file: "morelli-post-13.jpg", brand: "Morelli" },
  { file: "sensus-moscatel.jpg", brand: "Sensus" },
  { file: "hydrate-locker.jpg", brand: "Hydrate" },
  { file: "shaq-radiate.jpg", brand: "Shaq" },
];

// ——— Escena 04.1: boot scrubbed ———
const BootScene = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [lineCount, setLineCount] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = Math.max(0, Math.min(BOOT_LINES.length, Math.floor(v * (BOOT_LINES.length + 2) - 1)));
    setLineCount(n);
  });

  const termScale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const shownLines = reduced ? BOOT_LINES.length : lineCount;

  return (
    <div ref={ref} className="relative h-[250vh]" data-testid="boot-scene">
      <div className="sticky top-0 h-svh flex flex-col items-center justify-center px-6">
        {/* grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <motion.p {...fadeUp} className="font-hud text-xs tracking-[0.35em] text-volt mb-8 uppercase">
          04.1 — Boot
        </motion.p>
        <motion.div
          style={reduced ? undefined : { scale: termScale }}
          className="relative w-full max-w-3xl border border-white/15 bg-night"
          data-testid="os-terminal"
        >
          <motion.div
            style={reduced ? undefined : { opacity: glowOpacity }}
            className="absolute inset-0 shadow-[0_0_90px_-10px_rgba(204,255,0,0.45)] pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute inset-0 pointer-events-none scanlines" aria-hidden="true" />
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="font-hud text-[10px] uppercase tracking-[0.3em] text-white/40 ml-3">
              wtf/os
            </span>
          </div>
          <div className="p-6 md:p-10 font-hud text-xs md:text-sm leading-loose min-h-[320px]">
            <p className="text-white/50 mb-2">$ wtf --status</p>
            {BOOT_LINES.slice(0, shownLines).map((line, i) => (
              <p key={line.key} className="whitespace-pre text-white/60" data-testid={`os-boot-${i}`}>
                {"> "}
                {line.key} <span className="text-white/25">{dots(line.key)}</span>{" "}
                <span className={line.volt ? "text-volt" : "text-signal font-bold"}>{line.value}</span>
              </p>
            ))}
            <p className="text-volt mt-2">
              <span className="cursor-blink">█</span>
            </p>
          </div>
        </motion.div>
        <p className="font-hud text-[10px] tracking-[0.3em] text-white/30 mt-8 uppercase">
          Scrolleá para bootear el sistema
        </p>
      </div>
    </div>
  );
};

const Cap04Sistema = () => {
  const register = useChapterRegister();

  return (
    <section id="cap-04" data-chapter="04" ref={register} className="scroll-mt-20 bg-black" data-testid="cap-04">
      <ChapterIntro num="04" title={<>El <b>sistema</b></>} kicker="El Clímax" />

      <BootScene />

      {/* 04.2 — La tesis del modelo */}
      <div className="py-24 md:py-32" data-testid="os-thesis-block">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel index="04.2" title="El Modelo" />
            <RevealLines
              as="h2"
              className="font-display font-thin size-display-2 text-white/85 leading-[0.95]"
              lines={[
                <>La IA no es un tool.</>,
                <b className="text-volt volt-glow">Es el sistema</b>,
                <b className="text-volt volt-glow">operativo.</b>,
              ]}
              data-testid="os-title"
            />
          </div>
          <div>
            <motion.p {...fadeUp} className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-md mb-6">
              <span className="font-semibold text-white">No usamos IA. La integramos.</span>
              <br />
              Ideación aumentada. Producción amplificada. Optimización continua.
              Un solo flujo.
            </motion.p>
            <RevealLines
              as="p"
              className="font-display font-thin text-2xl md:text-3xl text-white/75 leading-[1.15] max-w-md mb-6"
              lines={[
                <>La IA escala contenidos.</>,
                <b className="text-white">El criterio creativo</b>,
                <b className="text-white">escala marcas.</b>,
              ]}
              data-testid="os-criterio"
            />
            <motion.p {...fadeUp} className="text-lg text-white/60 font-light leading-relaxed max-w-md">
              No te vamos a contar cómo funciona.
              <br />
              <span className="font-semibold text-white">Te vamos a mostrar lo que produce.</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* 04.3 — El Engine */}
      <div className="py-24 md:py-32 bg-night border-t border-white/10" data-testid="engine-block">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SectionLabel index="04.3" title="WTF Engine" />
              <RevealLines
                as="h2"
                className="font-display font-thin size-display-0 text-white/85 leading-[0.9]"
                lines={[<>El <b className="text-white">Engine</b></>]}
                data-testid="engine-title"
              />
            </div>
            <p className="text-lg md:text-xl text-white/50 font-light max-w-sm md:text-right">
              Una sola plataforma.
              <br />
              Todo el sistema.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10 mb-20">
            {MODULES.map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                className="group border-r border-b border-white/10 p-6 md:p-8 min-h-[200px] flex flex-col justify-between hover:bg-white/[0.03] transition-colors relative overflow-hidden before:absolute before:inset-y-0 before:-left-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-[#CCFF00]/[0.06] before:to-transparent hover:before:translate-x-[200%] before:transition-transform before:duration-700 before:pointer-events-none"
                data-testid={`engine-module-${i}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-hud text-[10px] text-white/30 tracking-[0.3em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-volt opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(204,255,0,0.8)] transition-all" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white mb-3 group-hover:text-volt transition-colors">
                    {mod.name}
                  </h3>
                  <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                    {mod.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Métricas con counters */}
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mb-16" data-testid="engine-metrics">
            {METRICS.map((m) => (
              <div key={m.label} className="text-center">
                <Counter
                  value={m.value}
                  suffix={m.suffix}
                  static={m.static}
                  className="font-display font-black text-5xl md:text-7xl text-volt volt-glow leading-none block mb-3"
                />
                <p className="font-hud text-[11px] uppercase tracking-[0.3em] text-white/50">{m.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.p {...fadeUp} className="text-center text-lg md:text-xl text-white/40 font-light italic">
            El stack es secreto. Los resultados, públicos.
          </motion.p>
        </div>
      </div>

      {/* 04.4 — Soluciones (interludio blanco) */}
      <div className="bg-bone text-black py-24 md:py-36" data-testid="solutions-block">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16 max-w-4xl">
            <SectionLabel index="04.4" title="Soluciones" dark />
            <RevealLines
              as="h2"
              className="font-display font-thin size-display-2 text-black/60 leading-[0.95] mb-8"
              lines={[
                <>Dejá de automatizar.</>,
                <b className="text-black">Empezá a orquestar.</b>,
              ]}
              data-testid="solutions-title"
            />
            <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 max-w-2xl mb-4">
              Mismo concepto, distinto sistema: no se trata de pensar distinto,{" "}
              <span className="font-semibold text-black">se trata de ejecutar distinto</span>.
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 max-w-2xl">
              Resolvemos la velocidad, la escala y el costo de tu contenido.
              El sistema aprende tu marca, tus objetivos y tus límites —{" "}
              <span className="font-semibold text-black">y después no para</span>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/10">
            {SOLUTIONS.map((sol, i) => (
              <motion.div
                key={sol.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                className="group border-r border-b border-black/10 p-6 md:p-8 min-h-[180px] flex flex-col justify-between hover:bg-black hover:text-white transition-colors duration-300"
                data-testid={`solution-${i}`}
              >
                <span className="font-hud text-[10px] tracking-[0.3em] text-black/30 group-hover:text-volt transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl mb-3">{sol.name}</h3>
                  <p className="text-sm md:text-base font-light leading-relaxed text-black/60 group-hover:text-white/70 transition-colors">
                    {sol.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 04.5 — El output: riel horizontal 100% AI */}
      <GalleryRail />
    </section>
  );
};

// Riel horizontal scroll-driven (patrón validado): el scroll vertical empuja la cinta.
const GalleryRail = () => {
  const railRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  if (reduced) {
    return (
      <div className="bg-black py-24" data-testid="gallery-rail">
        <div className="container mx-auto px-6 md:px-12 mb-10">
          <SectionLabel index="04.5" title="El Output" />
          <h2 className="font-display font-thin size-display-1 text-white/85 leading-[0.9]">
            100% <b className="text-white">AI</b>
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pl-6 pb-4">
          {PIECES.map((p) => (
            <img key={p.file} src={galeria(p.file)} alt={p.brand} className="h-[40vh] w-auto" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={railRef} className="bg-black relative h-[300vh]" data-testid="gallery-rail">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 mb-10">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <SectionLabel index="04.5" title="El Output" />
              <h2 className="font-display font-thin size-display-1 text-white/85 leading-[0.9]" data-testid="gallery-title">
                100% <b className="text-white">AI</b>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white/50 font-light max-w-sm md:text-right">
              Salido del Engine.
              <br />
              Sin un solo rodaje en el medio.
            </p>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-3 md:gap-4 pl-6 md:pl-12 w-max">
          {PIECES.map((piece, i) => (
            <figure key={piece.file} className="flex-shrink-0" data-testid={`gallery-piece-${i}`}>
              <div className="h-[48vh] md:h-[56vh] overflow-hidden bg-deckmid">
                <img
                  src={galeria(piece.file)}
                  alt={`${piece.brand} — contenido 100% AI`}
                  className="h-full w-auto object-cover"
                />
              </div>
              <figcaption className="flex items-center justify-between pt-3">
                <span className="font-display font-bold text-white/80 text-sm uppercase">{piece.brand}</span>
                <span className="font-hud text-[9px] tracking-[0.25em] text-volt border border-volt/40 px-2 py-1">
                  100% AI
                </span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Cap04Sistema;
