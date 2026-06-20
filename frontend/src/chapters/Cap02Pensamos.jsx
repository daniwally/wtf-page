import { motion } from "framer-motion";
import { RotateCcw, ArrowRight } from "lucide-react";
import { fadeUp, SectionLabel } from "../sections/shared";
import { useChapterRegister } from "../components/motion/ChapterContext";
import ChapterIntro from "../components/motion/ChapterIntro";
import RevealLines from "../components/motion/RevealLines";

// CAP 02 — CÓMO PENSAMOS: manifiesto, el quiebre competitivo con tachado
// animado, y el loop que nunca se apaga. Fusión de Quiebre + Process.
const RIVALES = [
  { quien: "Las agencias grandes", falla: "son lentas." },
  { quien: "Las productoras", falla: "ejecutan sin estrategia." },
  { quien: "Los AI studios", falla: "tienen herramientas sin calle." },
];

const STEPS = [
  { title: "Pensar", english: "Think", desc: "Estrategia y narrativa" },
  { title: "Hacer", english: "Make", desc: "Velocidad y oficio" },
  { title: "Mover", english: "Move", desc: "Activación estratégica" },
  { title: "Aprender", english: "Learn", desc: "Datos y señales" },
  { title: "Crecer", english: "Scale", desc: "Optimizar y repetir" },
];

const Cap02Pensamos = () => {
  const register = useChapterRegister();

  return (
    <section id="cap-02" data-chapter="02" ref={register} className="scroll-mt-20 bg-night" data-testid="cap-02">
      <ChapterIntro num="02" title={<>Cómo <b>pensamos</b></>} kicker="El Manifiesto" />

      {/* Manifiesto — el puño que rompe el manual */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden" data-testid="manifiesto-moment">
        <div className="absolute inset-0">
          <img
            src="/assets/scenes/quiebre.jpg"
            alt="Romper el manual"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-black/40" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative">
          <RevealLines
            as="h2"
            className="font-display font-thin size-display-1 text-white/80 leading-[0.95]"
            lines={[
              <>No hacemos lo correcto.</>,
              <b className="text-white">Hacemos lo que funciona.</b>,
            ]}
            data-testid="manifiesto-title"
          />
        </div>
      </div>

      {/* El quiebre — rivales tachados en vivo */}
      <div className="py-24 border-t border-white/5" data-testid="quiebre-moment">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <SectionLabel index="02.2" title="El Quiebre" />
          </motion.div>
          <div className="max-w-4xl">
            {RIVALES.map((r, i) => (
              <motion.p
                key={r.quien}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25, duration: 0.4 }}
                className="font-display font-thin text-3xl sm:text-4xl md:text-5xl text-white/40 leading-[1.15]"
                data-testid={`quiebre-rival-${i}`}
              >
                <span className="relative inline-block">
                  {r.quien}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                    className="absolute left-0 top-[55%] h-[3px] w-full bg-signal/80"
                  />
                </span>{" "}
                {r.falla}
              </motion.p>
            ))}

            <RevealLines
              as="h2"
              className="font-display font-thin text-3xl sm:text-4xl md:text-5xl text-white/85 leading-[1.1] mt-14"
              stagger={0.15}
              lines={[
                <>Nosotros tenemos lo que falta:</>,
                <b className="text-white">células con carácter, velocidad</b>,
                <b className="text-white">y experiencia real.</b>,
              ]}
              data-testid="quiebre-payoff"
            />
          </div>
        </div>
      </div>

      {/* El loop */}
      <div className="py-24 border-t border-white/5" data-testid="loop-moment">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <SectionLabel index="02.3" title="El Loop" className="text-center" />
            <RevealLines
              as="h2"
              className="font-display font-thin text-4xl sm:text-5xl md:text-6xl text-white/85"
              lines={[<>El sistema <b className="text-white">nunca se apaga</b></>]}
              data-testid="process-title"
            />
          </motion.div>

          <div className="relative">
            {/* línea conectora que se dibuja */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ originX: 0 }}
              className="hidden md:block absolute top-[64px] left-[5%] right-[5%] h-px bg-volt/40"
              aria-hidden="true"
            />
            <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8 relative">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="text-center group"
                  data-testid={`process-step-${step.english.toLowerCase()}`}
                >
                  <div className="w-24 md:w-32 h-24 md:h-32 border-2 border-white/30 group-hover:border-volt transition-colors flex flex-col items-center justify-center mb-4 bg-night relative">
                    <span className="font-display font-bold text-xl md:text-2xl text-white">{step.title}</span>
                    <span className="font-hud text-white/40 text-[10px] uppercase tracking-wider mt-1">
                      {step.english}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm font-light">{step.desc}</p>
                  {i < STEPS.length - 1 && (
                    <ArrowRight className="text-white/30 mx-auto mt-4 hidden md:block" size={20} />
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: STEPS.length * 0.15 + 0.2, duration: 0.6 }}
                className="hidden md:flex items-center self-center"
                data-testid="process-loop-icon"
              >
                <RotateCcw className="text-volt" size={28} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee #WTFRULES */}
      <motion.div
        {...fadeUp}
        className="border-y border-white/10 py-5 overflow-hidden whitespace-nowrap select-none"
        data-testid="quiebre-wtfrules"
      >
        <div className="inline-flex items-baseline gap-10 animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-flex items-baseline gap-10">
              <span className="font-display font-thin text-2xl md:text-4xl text-white/25 uppercase">
                Es momento de plantearse todo nuevamente
              </span>
              <span className="font-hud text-xl md:text-2xl text-volt/70">#WTFRULES</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Cap02Pensamos;
