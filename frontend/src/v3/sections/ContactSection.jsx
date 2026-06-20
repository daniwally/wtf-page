import { motion } from "framer-motion";
import { fadeUp, CONTACT_EMAIL, LOGOS } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import PillButton from "../ui/PillButton";

const PAISES = [
  { pais: "Argentina", hq: true },
  { pais: "Paraguay" },
  { pais: "Perú" },
  { pais: "México" },
  { pais: "España" },
];

const ContactSection = () => (
  <ThemeSection theme={THEMES.bone} id="v3-contacto" pad="pt-24 md:pt-36 pb-0">
    <div className="container mx-auto px-6 md:px-12">
      {/* Países */}
      <div className="text-center mb-20">
        <Headline
          size="sub"
          className="justify-center"
          lines={[<>Cuando todo cambia, <b>la decisión es entrar.</b></>]}
        />
        <motion.div {...fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
          {PAISES.map((p) => (
            <span
              key={p.pais}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${
                p.hq ? "bg-[#0A0A0C] text-volt" : "border border-current/30"
              }`}
            >
              {p.pais}
              {p.hq && <span className="text-[10px] font-bold">HQ</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-5 mb-10">
          <img src={LOGOS.wtfBlack} alt="WTF" className="h-12 w-auto" />
          <span className="w-px h-10 bg-current/20" />
          <img src={LOGOS.briefBlack} alt="Brief Destroyers" className="h-10 w-auto" />
        </div>
        <Headline
          size="section"
          className="justify-center"
          lines={[<>¿Listos para destruir</>, <>algunos briefs?</>]}
        />
        <motion.div {...fadeUp} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <PillButton href={`mailto:${CONTACT_EMAIL}`} variant="primary">
            {CONTACT_EMAIL}
          </PillButton>
          <PillButton href={`mailto:${CONTACT_EMAIL}?subject=Destruyamos%20un%20brief`} variant="outline" arrow>
            Iniciar proyecto
          </PillButton>
        </motion.div>
      </div>

      {/* GRAC·IA·S */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="mt-24 select-none"
      >
        <p className="font-thin uppercase tracking-[0.02em] text-center leading-[0.9] text-[clamp(64px,18vw,300px)]">
          GRAC<b className="text-volt">IA</b>S.
        </p>
      </motion.div>

      {/* Footer mínimo */}
      <div className="border-t border-current/15 mt-8 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs opacity-50">
        <span className="font-semibold uppercase tracking-[0.15em]">Battle Tested Creativity · Since 2010</span>
        <span>© {new Date().getFullYear()} WTF Agency</span>
      </div>
    </div>
  </ThemeSection>
);

export default ContactSection;
