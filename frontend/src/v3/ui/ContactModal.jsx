import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "../i18n/LangContext";
import { trackContactOpen, trackEvent } from "../utils/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeebkygz";
const LOGO_LOCKUP = "/assets/logos/logo-wtf-lockup.png";
const EASE = [0.16, 1, 0.3, 1];

const COPY = {
  es: {
    eyebrow: "Hablemos",
    title: "¿Qué viene para tu marca?",
    intro: "Contanos lo esencial. El sistema viene después.",
    name: "Nombre y apellido",
    company: "Empresa",
    role: "Cargo",
    email: "Email de trabajo",
    message: "¿Qué necesita mover la marca?",
    placeholder: "Un lanzamiento, una plataforma, contenido, una nueva etapa...",
    submit: "Enviar",
    sending: "Enviando...",
    consent: "Al enviar, aceptás que WTF Agency te contacte para continuar la conversación.",
    successTitle: "Recibido.",
    successBody: "Lo ponemos en movimiento y te contactamos pronto.",
    close: "Cerrar",
    error: "Algo no salió bien. Probá de nuevo.",
  },
  en: {
    eyebrow: "Let's talk",
    title: "What comes next for your brand?",
    intro: "Tell us what matters. The system comes next.",
    name: "Full name",
    company: "Company",
    role: "Role",
    email: "Work email",
    message: "What does the brand need to move?",
    placeholder: "A launch, a platform, content, a new stage...",
    submit: "Send",
    sending: "Sending...",
    consent: "By sending, you agree that WTF Agency may contact you to continue the conversation.",
    successTitle: "Received.",
    successBody: "We will put it in motion and get back to you soon.",
    close: "Close",
    error: "Something went wrong. Please try again.",
  },
  pt: {
    eyebrow: "Vamos conversar",
    title: "O que vem agora para a sua marca?",
    intro: "Conte o essencial. O sistema vem depois.",
    name: "Nome e sobrenome",
    company: "Empresa",
    role: "Cargo",
    email: "Email de trabalho",
    message: "O que a marca precisa mover?",
    placeholder: "Um lançamento, uma plataforma, conteúdo, uma nova etapa...",
    submit: "Enviar",
    sending: "Enviando...",
    consent: "Ao enviar, você aceita que a WTF Agency entre em contato para continuar a conversa.",
    successTitle: "Recebido.",
    successBody: "Vamos colocar em movimento e entraremos em contato em breve.",
    close: "Fechar",
    error: "Algo deu errado. Tente novamente.",
  },
};

// Variante "careers" (Trabajá en WTF): mismo modal y mismo envío Formspree,
// cambia el subject, el copy y dos campos (especialidad y portfolio en lugar
// de empresa y cargo).
const CAREERS_COPY = {
  es: {
    eyebrow: "Trabajá en WTF",
    title: "Vení a destruir briefs con nosotros.",
    intro: "Contanos quién sos y qué hacés. El resto lo charlamos.",
    name: "Nombre y apellido",
    company: "Especialidad (estrategia, creatividad, producción, tecnología...)",
    role: "Portfolio o LinkedIn (link)",
    email: "Email",
    message: "¿Por qué WTF?",
    placeholder: "Contanos qué hacés, qué te mueve y qué querés construir...",
    submit: "Enviar",
    sending: "Enviando...",
    consent: "Al enviar, aceptás que WTF Agency te contacte por oportunidades de trabajo.",
    successTitle: "Recibido.",
    successBody: "Si hay match, te escribimos.",
    close: "Cerrar",
    error: "Algo no salió bien. Probá de nuevo.",
  },
  en: {
    eyebrow: "Work at WTF",
    title: "Come destroy briefs with us.",
    intro: "Tell us who you are and what you do. We'll talk about the rest.",
    name: "Full name",
    company: "Specialty (strategy, creative, production, technology...)",
    role: "Portfolio or LinkedIn (link)",
    email: "Email",
    message: "Why WTF?",
    placeholder: "Tell us what you do, what moves you and what you want to build...",
    submit: "Send",
    sending: "Sending...",
    consent: "By sending, you agree that WTF Agency may contact you about job opportunities.",
    successTitle: "Received.",
    successBody: "If there's a match, we'll write you.",
    close: "Close",
    error: "Something went wrong. Please try again.",
  },
  pt: {
    eyebrow: "Trabalhe na WTF",
    title: "Venha destruir briefs com a gente.",
    intro: "Conte quem você é e o que faz. O resto a gente conversa.",
    name: "Nome e sobrenome",
    company: "Especialidade (estratégia, criatividade, produção, tecnologia...)",
    role: "Portfólio ou LinkedIn (link)",
    email: "Email",
    message: "Por que a WTF?",
    placeholder: "Conte o que você faz, o que te move e o que quer construir...",
    submit: "Enviar",
    sending: "Enviando...",
    consent: "Ao enviar, você aceita que a WTF Agency entre em contato sobre oportunidades de trabalho.",
    successTitle: "Recebido.",
    successBody: "Se rolar match, a gente te escreve.",
    close: "Fechar",
    error: "Algo deu errado. Tente novamente.",
  },
};

const ContactModalContext = createContext({ openContact: () => {}, openCareers: () => {} });

const ContactModal = ({ open, onClose, variant = "brand" }) => {
  const { lang } = useLang();
  const c = (variant === "careers" ? CAREERS_COPY : COPY)[lang];
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);
  const formRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) return undefined;
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setStatus("idle");

    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 80);
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const applicant = String(formData.get("name") || "");
    const honeypot = String(formData.get("website") || "");
    if (honeypot) {
      setStatus("success");
      return;
    }
    trackEvent(variant === "careers" ? "careers_submit" : "contact_submit", {
      event_category: "lead",
      language: lang,
    });
    formData.set("_replyto", email);
    formData.set(
      "_subject",
      variant === "careers"
        ? applicant
          ? `Trabajá en WTF · ${applicant}`
          : "Trabajá en WTF · Nueva postulación"
        : company
          ? `Nuevo contacto WTF Agency · ${company}`
          : "Nuevo contacto WTF Agency"
    );
    formData.append("form_type", variant === "careers" ? "careers" : "brand");
    formData.append("language", lang === "pt" ? "pt-BR" : lang);
    formData.append("source", window.location.href);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      formRef.current?.reset();
      setStatus("success");
      trackEvent(variant === "careers" ? "careers_success" : "contact_success", {
        event_category: "lead",
        language: lang,
      });
    } catch {
      setStatus("error");
      trackEvent(variant === "careers" ? "careers_error" : "contact_error", {
        event_category: "lead",
        language: lang,
      });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="monks-root fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-[#050507]/80 px-4 py-4 backdrop-blur-md md:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && status !== "submitting") onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-[#0A0A0C]/78 text-white shadow-[0_30px_120px_rgba(0,0,0,0.72)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.10),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_46%)]" />
            <div className="absolute inset-x-0 top-0 h-1 bg-volt" />
            <button
              type="button"
              onClick={onClose}
              disabled={status === "submitting"}
              aria-label={c.close}
              className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white disabled:opacity-40"
            >
              <X size={18} aria-hidden="true" />
            </button>

            {status === "success" ? (
              <div
                role="status"
                className="relative flex min-h-[430px] flex-col items-center justify-center px-7 py-16 text-center md:px-14"
              >
                <img
                  src={LOGO_LOCKUP}
                  alt="WTF · Brief Destroyers"
                  className="mb-8 w-36"
                />
                <p className="font-hud text-xs uppercase tracking-[0.3em] text-volt">{c.eyebrow}</p>
                <h2 id="contact-modal-title" className="mt-5 text-[clamp(38px,7vw,76px)] font-black uppercase leading-none">
                  {c.successTitle}
                </h2>
                <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/65">{c.successBody}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-10 rounded-full bg-[#F4F1E8] px-7 py-3 text-sm font-bold text-[#0A0A0C] transition-colors hover:bg-volt"
                >
                  {c.close}
                </button>
              </div>
            ) : (
              <div className="relative px-6 pb-7 pt-10 md:px-12 md:pb-10 md:pt-12">
                <div className="flex items-center gap-4">
                  <img
                    src={LOGO_LOCKUP}
                    alt="WTF · Brief Destroyers"
                    className="w-28 shrink-0 md:w-32"
                  />
                  <span aria-hidden="true" className="h-px w-8 bg-white/20" />
                  <p className="font-hud text-[10px] uppercase tracking-[0.28em] text-volt md:text-[11px]">
                    {c.eyebrow}
                  </p>
                </div>
                <h2 id="contact-modal-title" className="mt-4 max-w-2xl text-[clamp(30px,5vw,58px)] font-thin uppercase leading-[1.02]">
                  {c.title}
                </h2>
                <p className="mt-4 text-base font-light text-white/55 md:text-lg">{c.intro}</p>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-8">
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex="-1"
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <label className="text-sm font-medium text-white/70">
                      {c.name}
                      <input
                        ref={firstInputRef}
                        required
                        name="name"
                        autoComplete="name"
                        className="mt-2 h-12 w-full rounded-none border-0 border-b border-white/25 bg-transparent px-0 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-volt"
                      />
                    </label>
                    <label className="text-sm font-medium text-white/70">
                      {c.company}
                      <input
                        required
                        name={variant === "careers" ? "specialty" : "company"}
                        autoComplete={variant === "careers" ? "off" : "organization"}
                        className="mt-2 h-12 w-full rounded-none border-0 border-b border-white/25 bg-transparent px-0 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-volt"
                      />
                    </label>
                    <label className="text-sm font-medium text-white/70">
                      {c.role}
                      <input
                        name={variant === "careers" ? "portfolio" : "role"}
                        autoComplete={variant === "careers" ? "url" : "organization-title"}
                        className="mt-2 h-12 w-full rounded-none border-0 border-b border-white/25 bg-transparent px-0 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-volt"
                      />
                    </label>
                    <label className="text-sm font-medium text-white/70">
                      {c.email}
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="mt-2 h-12 w-full rounded-none border-0 border-b border-white/25 bg-transparent px-0 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-volt"
                      />
                    </label>
                  </div>

                  <label className="mt-6 block text-sm font-medium text-white/70">
                    {c.message}
                    <textarea
                      required
                      name="message"
                      rows="3"
                      placeholder={c.placeholder}
                      className="mt-3 w-full resize-none rounded-xl border border-white/20 bg-white/[0.04] p-4 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-volt"
                    />
                  </label>

                  {status === "error" && (
                    <p role="alert" className="mt-4 text-sm font-medium text-[#FF6B63]">
                      {c.error}
                    </p>
                  )}

                  <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-md text-[11px] leading-relaxed text-white/35">{c.consent}</p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex min-w-[150px] items-center justify-center rounded-full bg-[#F4F1E8] px-7 py-3.5 text-sm font-bold text-[#0A0A0C] transition-colors hover:bg-volt disabled:cursor-wait disabled:opacity-60"
                    >
                      {status === "submitting" ? c.sending : c.submit}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ContactModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("brand");
  const { lang } = useLang();
  const openContact = useCallback((source = "unknown") => {
    trackContactOpen(source, lang);
    setVariant("brand");
    setOpen(true);
  }, [lang]);
  const openCareers = useCallback((source = "unknown") => {
    trackEvent("careers_open", { event_category: "lead", source, language: lang });
    setVariant("careers");
    setOpen(true);
  }, [lang]);
  const closeContact = useCallback(() => setOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openContact, openCareers }}>
      {children}
      <ContactModal open={open} onClose={closeContact} variant={variant} />
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => useContext(ContactModalContext);

export default ContactModal;
