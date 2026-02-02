import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Background Images
const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/pmv3waqd_00001.png",
  horses: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/q6jin7h4_06060606.png",
  goggles: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/ll4n1ljh_u2462154512_A_american_framed_is_featured_on_an_aesthetic_adv_a782b713-0b85-4f85-aedf-612944e40328_3.png",
  racer: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/jw0yxiwb_u2462154512_Cinematic_atmosphere_in_the_style_of_F1_The_Movie_d0d9364b-916d-46d0-b911-564285f75d9e_3.png",
  heels: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/qppcfbqj_u2462154512_POV_first-person_view_high-fashion_Vogue_editoria_68a56ba2-daad-477d-bad2-2c3a5b5c204a_0.png",
};

// Hero slideshow images (all images for random rotation)
const HERO_IMAGES = [
  "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/pmv3waqd_00001.png", // VR dog
  "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/uzvk7l9t_u2462154512_A_american_framed_is_featured_on_an_aesthetic_adv_a782b713-0b85-4f85-aedf-612944e40328_3.png", // Goggles woman
  "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/5towsi97_u2462154512_A_single_luxury_armchair_inspired_by_Chaise_Loung_65c6e0e1-d597-4f17-b5dd-e827ce7d5ec7_2.png", // Armchair desert
  "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/fph5s6bf_u2462154512_Cinematic_atmosphere_in_the_style_of_F1_The_Movie_c8eae6cc-3df1-4a3e-9628-44a0e81a73e5_3%20%281%29.png", // Motorcycle racer
  "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/lpm33i3o_u2462154512_On_the_endless_expanse_of_grassland_a_dense_flock_a3b5c8a4-96ab-41f6-aad1-394024854bea_0.png", // Black sheep
  "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/byq9vwvw_u2462154512_POV_first-person_view_high-fashion_Vogue_editoria_68a56ba2-daad-477d-bad2-2c3a5b5c204a_0.png", // Red heels
];

// Logo URLs - PNG logos with transparent backgrounds
const LOGOS = {
  wtfWhite: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/b0iuqv4h_logo-wtf-blanco.png",
  wtfBlack: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/jwy9zj0g_logo%20negro-wtf.png",
  briefWhite: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/yt4gadue_logo-brief-blanco.png",
  briefBlack: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/04yys6au_log-brief-negro.png",
};

// Full Screen Section with Background Image
const FullScreenSection = ({ image, children, overlay = "bg-black/50", className = "" }) => (
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

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-lg py-4" : "bg-transparent py-6"
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-4" data-testid="nav-logo">
          <img 
            src={LOGOS.wtfWhite} 
            alt="WTF Logo" 
            className="h-10 md:h-12 w-auto"
          />
          <span className="hidden md:block text-white/30">|</span>
          <img 
            src={LOGOS.briefWhite} 
            alt="Brief Destroyers" 
            className="h-8 md:h-10 w-auto hidden md:block"
          />
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {[
            { label: "Proceso", href: "process" },
            { label: "Trabajo", href: "work" },
            { label: "Equipo", href: "team" },
            { label: "Contacto", href: "contact" }
          ].map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className="nav-link text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest"
              data-testid={`nav-${item.href}`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:hello@wtfagency.com"
          className="btn-primary hidden md:block text-sm"
          data-testid="nav-cta"
        >
          Hablemos
        </a>
      </div>
    </motion.nav>
  );
};

// Hero Section with rotating background images
const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * HERO_IMAGES.length);
          } while (next === prev && HERO_IMAGES.length > 1);
          return next;
        });
        setIsTransitioning(false);
      }, 500);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background images with crossfade */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${img})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 py-32 relative z-20">
        <motion.div {...fadeUp} className="max-w-4xl">
          {/* Tagline en inglés como el PDF */}
          <p className="text-white/60 font-light text-sm md:text-base uppercase tracking-[0.3em] mb-8" data-testid="hero-tagline">
            Battle Tested Creativity Since 2010
          </p>
          
          {/* Logos */}
          <div className="flex items-center gap-6 md:gap-10 mb-10">
            <img 
              src={LOGOS.wtfWhite} 
              alt="WTF Logo" 
              className="h-20 md:h-28 lg:h-36 w-auto"
              data-testid="hero-wtf-logo"
            />
            <div className="w-px h-20 md:h-28 bg-white/30" />
            <img 
              src={LOGOS.briefWhite} 
              alt="Brief Destroyers" 
              className="h-16 md:h-24 lg:h-28 w-auto"
              data-testid="hero-bd-logo"
            />
          </div>
          
          {/* Main tagline en español */}
          <h1 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-tight mb-8" data-testid="hero-title">
            La Creatividad Entrenada<br />
            <span className="font-light text-white/60">Para Reinterpretar</span>
          </h1>
          
          <p className="text-lg text-white/50 max-w-lg mb-12 font-light italic" data-testid="hero-description">
            No hacemos lo correcto. Hacemos lo que funciona.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="mailto:hello@wtfagency.com" className="btn-primary inline-flex items-center gap-3" data-testid="hero-cta-primary">
              Iniciar un Proyecto <ArrowRight size={20} />
            </a>
            <a href="#process" className="btn-outline inline-flex items-center gap-3" data-testid="hero-cta-secondary">
              Cómo Trabajamos
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown className="text-white/50 animate-bounce" size={32} />
      </motion.div>
      
      {/* Image indicator dots */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentImage ? 'bg-white w-6' : 'bg-white/30'
            }`}
            data-testid={`hero-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
};

// Philosophy Section
const PhilosophySection = () => (
  <FullScreenSection 
    image={IMAGES.horses} 
    overlay="bg-gradient-to-l from-black/80 via-black/50 to-transparent"
  >
    <div id="philosophy" className="container mx-auto px-6 md:px-12 py-32" data-testid="philosophy-section">
      <motion.div {...fadeUp} className="max-w-3xl ml-auto text-right">
        <p className="font-light text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="philosophy-label">
          Nuestra Filosofía
        </p>
        <h2 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase mb-6 leading-tight" data-testid="philosophy-title">
          No somos<br />una agencia.
        </h2>
        <h2 className="font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/40 uppercase mb-12 leading-tight">
          Somos un<br />sistema.
        </h2>
        <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light max-w-xl ml-auto" data-testid="philosophy-text">
          Construimos plataformas, sistemas creativos y ecosistemas de contenido que se adaptan, aprenden y escalan.
        </p>
      </motion.div>
    </div>
  </FullScreenSection>
);

// Process Section
const ProcessSection = () => {
  const steps = [
    { title: "Pensar", english: "Think", desc: "Estrategia y narrativa" },
    { title: "Hacer", english: "Make", desc: "Velocidad y oficio" },
    { title: "Mover", english: "Move", desc: "Activación estratégica" },
    { title: "Aprender", english: "Learn", desc: "Datos y señales" },
    { title: "Crecer", english: "Scale", desc: "Optimizar y repetir" },
  ];

  return (
    <FullScreenSection 
      image={IMAGES.racer} 
      overlay="bg-gradient-to-t from-black via-black/70 to-black/40"
    >
      <div id="process" className="container mx-auto px-6 md:px-12 py-32" data-testid="process-section">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-light text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="process-label">
            Cómo Trabajamos
          </p>
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase" data-testid="process-title">
            El Sistema Creativo
          </h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center group"
              data-testid={`process-step-${step.english.toLowerCase()}`}
            >
              <div className="w-24 md:w-32 h-24 md:h-32 border-2 border-white/30 group-hover:border-white transition-colors flex flex-col items-center justify-center mb-4">
                <span className="font-black text-xl md:text-2xl text-white uppercase">{step.title}</span>
                <span className="text-white/40 font-light text-xs uppercase tracking-wider">{step.english}</span>
              </div>
              <p className="text-white/50 text-sm font-light">{step.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="text-white/30 mx-auto mt-4 hidden md:block" size={20} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </FullScreenSection>
  );
};

// Capabilities Section
const CapabilitiesSection = () => {
  const capabilities = [
    "Estrategia de Marca y Pensamiento de Plataforma",
    "Sistemas de Contenido Creativo",
    "Producción Escalable (IA + Híbrido)",
    "Performance Creativo",
    "Lanzamientos y Momentos Culturales",
  ];

  return (
    <FullScreenSection 
      image={IMAGES.goggles} 
      overlay="bg-gradient-to-r from-black/90 via-black/60 to-transparent"
    >
      <div id="capabilities" className="container mx-auto px-6 md:px-12 py-32" data-testid="capabilities-section">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="font-light text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="capabilities-label">
            Capacidades
          </p>
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase mb-12 leading-tight" data-testid="capabilities-title">
            Lo Que<br />Aportamos
          </h2>
          
          <div className="space-y-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 group"
                data-testid={`capability-${i}`}
              >
                <span className="text-white/30 font-light text-sm">0{i + 1}</span>
                <div className="w-8 h-px bg-white/30 group-hover:bg-white group-hover:w-16 transition-all" />
                <p className="text-lg md:text-xl text-white/80 group-hover:text-white transition-colors font-light">{cap}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FullScreenSection>
  );
};

// Clients Section - Dark grid layout with real logos image
const ClientsSection = () => {
  const logosImage = "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/szya9zmc_Screenshot%202026-02-02%20at%2012.03.04%E2%80%AFPM.png";

  return (
    <section id="work" className="min-h-screen bg-black relative overflow-hidden" data-testid="work-section">
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left side - Title */}
          <motion.div {...fadeUp} className="md:col-span-3 md:sticky md:top-32">
            <p className="font-light text-sm uppercase tracking-[0.3em] text-white/40 mb-4">
              Our Clients
            </p>
            <h2 className="text-white uppercase mb-6 leading-tight" data-testid="clients-title">
              <span className="font-light text-4xl sm:text-5xl md:text-6xl block">Our</span>
              <span className="font-black text-4xl sm:text-5xl md:text-6xl block">Clients</span>
            </h2>
            <p className="text-lg md:text-xl text-white/50 font-light italic leading-relaxed">
              Los que entendieron<br />
              que no alcanza<br />
              con una idea.
            </p>
          </motion.div>
          
          {/* Right side - Client logos image */}
          <motion.div 
            {...fadeUp}
            className="md:col-span-9"
          >
            <img 
              src={logosImage} 
              alt="Nuestros Clientes - Honda, Ford, Peugeot, Motorola, Samsung, Absolut, Quilmes y más" 
              className="w-[85%] h-auto"
              data-testid="clients-logos-image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => (
  <section id="team" className="bg-black py-24 md:py-40" data-testid="team-section">
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-light text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="team-label">
            El Equipo
          </p>
          <h2 className="font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase mb-8 leading-tight" data-testid="team-title">
            Células<br />Autónomas
          </h2>
          <p className="text-xl text-white/60 mb-4 leading-relaxed font-light" data-testid="team-description">
            Pequeños por diseño. Inmensos por impacto.
          </p>
          <p className="text-lg text-white/40 leading-relaxed font-light">
            Un equipo por marca. Un objetivo por célula.
          </p>
        </div>
        <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-[#111] border border-white/20 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-white font-black">15+</span>
            <span className="text-white/50 mt-2 font-light">Años</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-black font-black">6</span>
            <span className="text-black/50 mt-2 font-light">Oficinas</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-black font-black">50+</span>
            <span className="text-black/50 mt-2 font-light">Células</span>
          </div>
          <div className="aspect-square bg-[#111] border border-white/20 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-white font-black">∞</span>
            <span className="text-white/50 mt-2 font-light">Briefs</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Offices Section
const OfficesSection = () => {
  const offices = [
    { city: "Buenos Aires", country: "Argentina", status: "HQ" },
    { city: "Madrid", country: "España" },
    { city: "Santiago", country: "Chile" },
    { city: "Asunción", country: "Paraguay" },
    { city: "Lima", country: "Perú" },
    { city: "CDMX", country: "México" },
  ];

  return (
    <section id="offices" className="bg-white text-black py-24 md:py-32" data-testid="offices-section">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-light text-sm uppercase tracking-[0.3em] text-black/50 mb-4" data-testid="offices-label">
            Presencia Global
          </p>
          <h2 className="font-black text-3xl md:text-4xl text-black uppercase" data-testid="offices-title">
            Dónde Estamos
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {offices.map((office, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
              data-testid={`office-${office.city.toLowerCase().replace(' ', '-')}`}
            >
              <MapPin className="text-black/30 group-hover:text-black transition-colors mb-2" size={20} />
              <h3 className="font-bold text-lg text-black uppercase">{office.city}</h3>
              <p className="text-black/50 text-sm font-light">{office.country}</p>
              {office.status && (
                <span className="inline-block mt-2 px-2 py-1 bg-black text-white text-xs font-medium">
                  {office.status}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA / Closing Section
const ClosingSection = () => (
  <section id="contact" className="bg-black py-24 md:py-40" data-testid="contact-section">
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
        {/* Logos */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <img 
            src={LOGOS.wtfWhite} 
            alt="WTF Logo" 
            className="h-14 md:h-18 w-auto"
          />
          <div className="w-px h-14 bg-white/30" />
          <img 
            src={LOGOS.briefWhite} 
            alt="Brief Destroyers" 
            className="h-12 md:h-14 w-auto"
          />
        </div>
        
        <h2 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase mb-4 leading-tight" data-testid="contact-title">
          ¿Listos para destruir
        </h2>
        <h2 className="font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white/40 uppercase mb-12 leading-tight">
          algunos briefs?
        </h2>
        <p className="text-xl text-white/50 mb-4 leading-relaxed max-w-2xl mx-auto font-light" data-testid="contact-description">
          Estrategia + creatividad + producción + IA + distribución.<br />
          Todo moviéndose junto. Todo moviéndose rápido.
        </p>
        <p className="text-lg text-white/30 mb-12 italic font-light">
          No hacemos lo correcto. Hacemos lo que funciona.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:hello@wtfagency.com" className="btn-primary inline-flex items-center justify-center gap-3" data-testid="contact-cta-email">
            <Mail size={20} /> hello@wtfagency.com
          </a>
          <a href="mailto:hello@wtfagency.com?subject=Iniciemos%20un%20Proyecto" className="btn-outline inline-flex items-center justify-center gap-3" data-testid="contact-cta-project">
            Iniciar Proyecto <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-black border-t border-white/10 py-8" data-testid="footer">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={LOGOS.wtfWhite} alt="WTF" className="h-8 w-auto" />
          <span className="text-white/30">|</span>
          <img src={LOGOS.briefWhite} alt="Brief Destroyers" className="h-6 w-auto" />
        </div>
        <p className="text-white/30 text-sm font-light">
          Battle Tested Creativity Since 2010
        </p>
        <p className="text-white/30 text-sm font-light">
          © {new Date().getFullYear()} WTF Agency
        </p>
      </div>
    </div>
  </footer>
);

// Main Landing Page Component
const LandingPage = () => {
  return (
    <main className="overflow-x-hidden" data-testid="landing-page">
      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <ProcessSection />
      <CapabilitiesSection />
      <ClientsSection />
      <TeamSection />
      <OfficesSection />
      <ClosingSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
