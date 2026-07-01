import { motion } from "framer-motion";
import { fadeUp, CONTACT_EMAIL } from "../../sections/shared";
import ThemeSection from "../theme/ThemeSection";
import { THEMES } from "../theme/palette";
import Headline from "../ui/Headline";
import { useLang } from "../i18n/LangContext";
import ViewportVideo from "../ui/ViewportVideo";
import { useContactModal } from "../ui/ContactModal";
import { trackEvent } from "../utils/analytics";

// Copy bilingüe (es | en): se consume con useLang(). El statement de cierre cambia
// por idioma; el GRACIAS, la firma, los países y el email quedan iguales en ambos.
const COPY = {
  es: {
    statement: [
      <>¿Qué viene para tu marca?</>,
      <b key="s" className="text-volt">
        Pongámoslo en movimiento.
      </b>,
    ],
    cta: "Hablemos",
  },
  en: {
    statement: [
      <>What comes next for your brand?</>,
      <b key="s" className="text-volt">
        Let's put it in motion.
      </b>,
    ],
    cta: "Let's talk",
  },
  pt: {
    statement: [
      <>O que vem agora para a sua marca?</>,
      <b key="s" className="text-volt">
        Vamos colocar isso em movimento.
      </b>,
    ],
    cta: "Vamos conversar",
  },
};

const PAISES = [
  { es: "Argentina", en: "Argentina", pt: "Argentina", hq: true },
  { es: "Chile", en: "Chile", pt: "Chile" },
  { es: "Perú", en: "Peru", pt: "Peru" },
  { es: "Ecuador", en: "Ecuador", pt: "Equador" },
  { es: "Paraguay", en: "Paraguay", pt: "Paraguai" },
  { es: "USA", en: "USA", pt: "EUA" },
  { es: "España", en: "Spain", pt: "Espanha" },
];

const WAVE = "/assets/hero/closing-wave.jpg"; // ola oceánica (cierre)
const DOOR_VIDEO = "/assets/hero/statement-door.mp4"; // puerta en el mar (gracias)
const DOOR_POSTER = "/assets/hero/statement-door-poster.jpg";

// Sección 8 — CLOSING. Cierre cinematográfico en DOS slides oscuros: (1) statement
// + países + CTA sobre las olas; (2) el GRACIAS estilo deck sobre el video de la
// puerta en el mar (eyebrow + GRAC·IA·S + firma + contacto).
const ContactSection = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  const { openContact } = useContactModal();
  return (
  <footer>
    {/* Slide cierre: olas de fondo */}
    <ThemeSection
      theme={THEMES.night}
      id="v3-contacto"
      className="overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 z-0">
        <img src={WAVE} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#0A0A0C]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/55 via-transparent to-[#0A0A0C]/70" />
      </div>

      {/* Statement de cierre (centrado) */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <Headline
          size="sub"
          className="justify-center text-white !text-[clamp(28px,4.03vw,51px)] !leading-[1.2]"
          lines={c.statement}
        />
        <motion.p
          {...fadeUp}
          className="mt-8 font-hud text-xs md:text-sm tracking-[0.32em] text-white/55"
        >
          #wtfrules
        </motion.p>
        <motion.button
          type="button"
          {...fadeUp}
          onClick={() => openContact("closing")}
          className="mt-8 inline-flex items-center rounded-full border border-white/35 bg-black/15 px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-[#F4F1E8] hover:text-[#0A0A0C]"
        >
          {c.cta}
        </motion.button>
      </div>

      {/* Países distribuidos en el piso */}
      <motion.div {...fadeUp} className="absolute bottom-0 inset-x-0 z-10">
        <div className="container mx-auto px-6 md:px-12 pb-10 md:pb-14 flex flex-wrap items-center justify-center md:justify-between gap-3">
          {PAISES.map((p) => (
            <span
              key={p.es}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${
                p.hq ? "bg-volt text-[#0A0A0C]" : "border border-white/30 text-white"
              }`}
            >
              {p[lang]}
              {p.hq && <span className="text-[10px] font-bold">HQ</span>}
            </span>
          ))}
        </div>
      </motion.div>
    </ThemeSection>

    {/* Slide GRACIAS: video puerta en el mar + layout deck */}
    <ThemeSection
      theme={THEMES.night}
      id="v3-gracias"
      pad="py-0"
      className="overflow-hidden flex flex-col justify-center relative"
    >
      <div className="absolute inset-0 z-0">
        <ViewportVideo
          src={DOOR_VIDEO}
          poster={DOOR_POSTER}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A0A0C]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/40 via-transparent to-[#0A0A0C]/55" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="relative z-10 container mx-auto px-6 md:px-12 text-center select-none"
      >
        {/* Eyebrow con líneas (deck) */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-10 md:w-16 bg-white/40" />
          <span className="font-hud text-[11px] md:text-xs tracking-[0.35em] uppercase text-white">WTF Agency</span>
          <span className="h-px w-10 md:w-16 bg-white/40" />
        </div>

        {/* GRAC·IA·S */}
        <p className="font-thin uppercase tracking-[0.01em] leading-[0.9] text-[clamp(64px,16vw,260px)] text-white">
          GRAC<b className="italic text-volt">IA</b>S.
        </p>

        {/* Firma */}
        <p className="mt-6 text-lg md:text-2xl font-light italic text-white/70">
          Battle tested creativity. AI first. Human always.
        </p>

        {/* Firma · since */}
        <p className="mt-8 font-hud text-[10px] md:text-xs tracking-[0.22em] uppercase text-white/40">
          Battle Tested Creativity · Since 2010
        </p>

        {/* CTA Hablemos */}
        <button
          type="button"
          onClick={() => openContact("thanks")}
          className="mt-10 inline-flex items-center rounded-full bg-[#F4F1E8] px-8 py-3 text-sm font-bold text-[#0A0A0C] transition-colors hover:bg-volt hover:text-[#F4F1E8]"
        >
          {c.cta}
        </button>
      </motion.div>

      {/* hello@ al pie */}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={() => trackEvent("email_click", {
          event_category: "lead",
          source: "footer",
          language: lang,
        })}
        className="absolute bottom-0 inset-x-0 z-10 pb-8 md:pb-10 text-center font-hud text-[11px] md:text-sm tracking-[0.24em] uppercase text-white transition-colors hover:text-volt"
      >
        {CONTACT_EMAIL}
      </a>
    </ThemeSection>
  </footer>
  );
};

export default ContactSection;
