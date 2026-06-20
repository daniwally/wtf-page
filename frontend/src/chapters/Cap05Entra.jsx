import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { fadeUp, LOGOS, CONTACT_EMAIL, SectionLabel } from "../sections/shared";
import { useChapterRegister } from "../components/motion/ChapterContext";
import ChapterIntro from "../components/motion/ChapterIntro";
import RevealLines from "../components/motion/RevealLines";

// CAP 05 — ENTRÁ. La conversión: la decisión, los cinco países, el brief
// y la firma GRAC IA S. Fusión de Offices + Closing.
const PAISES = [
  { pais: "Argentina", status: "HQ" },
  { pais: "Paraguay" },
  { pais: "Perú" },
  { pais: "México" },
  { pais: "España" },
];

const Cap05Entra = () => {
  const register = useChapterRegister();

  return (
    <section id="cap-05" data-chapter="05" ref={register} className="scroll-mt-20 bg-black" data-testid="cap-05">
      <ChapterIntro num="05" title={<>Entr<b>á</b></>} kicker="La Decisión" />

      {/* La decisión + países (interludio blanco) */}
      <div className="bg-bone text-black py-24 md:py-32" data-testid="offices-block">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <SectionLabel index="05.1" title="Presencia" dark />
            <RevealLines
              as="h2"
              className="font-display font-thin size-display-2 text-black/60 leading-[0.95] mb-4"
              lines={[
                <>Cuando todo cambia,</>,
                <b className="text-black">la decisión es entrar.</b>,
              ]}
              data-testid="offices-title"
            />
            <p className="text-lg font-light text-black/50">Una sola unidad. Cinco países.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {PAISES.map((p, i) => (
              <motion.div
                key={p.pais}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
                data-testid={`pais-${p.pais.toLowerCase().replace("ñ", "n")}`}
              >
                <MapPin className="text-black/30 group-hover:text-black transition-colors mb-2" size={20} />
                <h3 className="font-display font-bold text-lg text-black">{p.pais}</h3>
                {p.status && (
                  <span className="inline-block mt-2 px-2 py-1 bg-black text-volt font-hud text-[10px] tracking-widest">
                    {p.status}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* El brief — conversión, sobre la puerta de entrada */}
      <div className="relative py-24 md:py-40 overflow-hidden" data-testid="contact-block">
        <div className="absolute inset-0">
          <img
            src="/assets/scenes/entrar.jpg"
            alt="La decisión es entrar"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-black" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-12">
              <img src={LOGOS.wtfWhite} alt="WTF Logo" className="h-14 md:h-18 w-auto" />
              <div className="w-px h-14 bg-white/30" />
              <img src={LOGOS.briefWhite} alt="Brief Destroyers" className="h-12 md:h-14 w-auto" />
            </div>

            <RevealLines
              as="h2"
              className="font-display font-thin size-display-2 text-white/75 mb-12 leading-[0.95]"
              lines={[
                <>¿Listos para destruir</>,
                <b className="text-white">algunos briefs?</b>,
              ]}
              data-testid="contact-title"
            />
            <p className="text-xl text-white/50 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              Estrategia + creatividad + producción + IA + distribución.
              <br />
              Todo moviéndose junto. Todo moviéndose rápido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="btn-primary inline-flex items-center justify-center gap-3"
                data-testid="contact-cta-email"
              >
                <Mail size={20} /> {CONTACT_EMAIL}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Destruyamos%20un%20brief`}
                className="btn-outline inline-flex items-center justify-center gap-3"
                data-testid="contact-cta-project"
              >
                Iniciar proyecto <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* GRAC IA S — la firma */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mt-24 md:mt-32 select-none pb-6"
          data-testid="gracias-signoff"
        >
          <RevealLines
            as="p"
            className="font-display font-thin text-center leading-[0.95] size-gracias text-white/90"
            amount={0.3}
            lines={[
              <>
                GRAC<em className="text-volt volt-glow">IA</em>S.
              </>,
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Cap05Entra;
