import { motion } from "framer-motion";
import { fadeUp, IMAGES, SectionLabel } from "../sections/shared";
import { useChapterRegister } from "../components/motion/ChapterContext";
import ChapterIntro from "../components/motion/ChapterIntro";
import RevealLines from "../components/motion/RevealLines";
import Counter from "../components/motion/Counter";
import Parallax from "../components/motion/Parallax";

// CAP 01 — QUIÉNES SOMOS: la declaración (filosofía), la historia que la
// justifica y las células que la operan. Fusión de Philosophy + Historia + Team.
const STATS = [
  { value: 15, suffix: "+", label: "Años", invert: false },
  { value: 200, suffix: "+", label: "Campañas", invert: true },
  { value: 10, suffix: "+", label: "Países", invert: true },
  { static: "∞", label: "Briefs destruidos", invert: false },
];

const Cap01Quienes = () => {
  const register = useChapterRegister();

  return (
    <section id="cap-01" data-chapter="01" ref={register} className="scroll-mt-20 bg-black" data-testid="cap-01">
      <ChapterIntro num="01" title={<>Quiénes <b>somos</b></>} kicker="La Declaración" />

      {/* La declaración — caballos con parallax */}
      <div className="relative min-h-screen flex items-center overflow-hidden" data-testid="philosophy-moment">
        <Parallax range={6} className="absolute inset-0">
          <img
            src={IMAGES.horses}
            alt="WTF — sistema en movimiento"
            className="w-full h-full object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/50 to-transparent" />
        <div className="container mx-auto px-6 md:px-12 py-32 relative">
          <div className="max-w-3xl ml-auto text-right">
            <RevealLines
              as="h2"
              className="font-display font-thin size-display-2 text-white/75 mb-12 leading-[0.95]"
              lines={[
                <>No somos</>,
                <>una agencia.</>,
                <b className="text-white">Somos un</b>,
                <b className="text-white">sistema.</b>,
              ]}
              data-testid="philosophy-title"
            />
            <motion.p
              {...fadeUp}
              className="text-lg md:text-xl text-white/45 leading-loose font-extralight tracking-wide max-w-lg ml-auto"
            >
              Construimos plataformas, sistemas creativos y ecosistemas de
              contenido que se adaptan, aprenden y escalan.
            </motion.p>
          </div>
        </div>
      </div>

      {/* La historia — tres folds, una idea por pantalla */}
      <div className="container mx-auto px-6 md:px-12 pt-24">
        <motion.div {...fadeUp}>
          <SectionLabel index="01.2" title="La Historia" />
        </motion.div>
      </div>

      <div className="min-h-[75vh] flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <p className="font-hud text-[10px] tracking-[0.3em] text-white/30 mb-8">2010 — 2025</p>
          <RevealLines
            as="h2"
            className="font-display font-thin size-display-2 text-white/85 leading-[1.0] max-w-5xl"
            lines={[
              <>En 15 años destruimos el manual.</>,
              <>Desarmamos briefs para rearmarlos</>,
              <>
                en <b className="text-white">ideas con impacto</b>.
              </>,
            ]}
            data-testid="historia-pasado"
          />
        </div>
      </div>

      <div className="min-h-[75vh] flex items-center border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 md:text-right">
          <p className="font-hud text-[10px] tracking-[0.3em] text-signal mb-8">EL MUNDO CAMBIÓ</p>
          <RevealLines
            as="h2"
            className="font-display font-thin size-display-1 text-white/75 leading-[0.95]"
            lines={[
              <>Hoy no gana el que tiene</>,
              <>una gran campaña.</>,
              <b className="text-white">Gana el que aprende más rápido.</b>,
            ]}
            data-testid="historia-giro"
          />
        </div>
      </div>

      <div className="min-h-[60vh] flex items-center border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <RevealLines
            as="h2"
            className="font-display font-thin size-display-1 text-white/75 leading-[0.95]"
            lines={[
              <>Una idea no alcanza.</>,
              <b className="text-white">Hace falta un sistema.</b>,
            ]}
            data-testid="historia-payoff"
          />
        </div>
      </div>

      {/* Las células — quiénes lo operan (pit crew: equipo chico, coordinación total) */}
      <div className="relative py-24 md:py-32 overflow-hidden" data-testid="team-moment">
        <div className="absolute inset-0">
          <img
            src="/assets/scenes/celulas.jpg"
            alt="Células autónomas — coordinación total"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-night/80" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel index="01.3" title="Células" />
              <RevealLines
                as="h2"
                className="font-display font-thin size-display-2 text-white/75 mb-8 leading-[0.95]"
                lines={[<>Células</>, <b className="text-white">autónomas</b>]}
                data-testid="team-title"
              />
              <p className="text-xl text-white/60 mb-4 leading-relaxed font-light">
                Pequeños por diseño. Inmensos por impacto.
              </p>
              <p className="text-lg text-white/40 leading-relaxed font-light">
                Un equipo por marca. Un objetivo por célula.
                <br />
                Todas corriendo sobre el mismo sistema.
              </p>
            </div>
            <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className={`aspect-square p-6 flex flex-col justify-end ${
                    stat.invert ? "bg-bone" : "bg-deckmid border border-white/20"
                  }`}
                >
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    static={stat.static}
                    className={`font-display font-black text-5xl md:text-7xl ${
                      stat.invert ? "text-black" : "text-white"
                    }`}
                  />
                  <span className={`mt-2 font-light ${stat.invert ? "text-black/50" : "text-white/50"}`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cap01Quienes;
