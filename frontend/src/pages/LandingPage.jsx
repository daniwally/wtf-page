import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Background Images from user
const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/pmv3waqd_00001.png",
  horses: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/q6jin7h4_06060606.png",
  goggles: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/ll4n1ljh_u2462154512_A_american_framed_is_featured_on_an_aesthetic_adv_a782b713-0b85-4f85-aedf-612944e40328_3.png",
  racer: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/jw0yxiwb_u2462154512_Cinematic_atmosphere_in_the_style_of_F1_The_Movie_d0d9364b-916d-46d0-b911-564285f75d9e_3.png",
  heels: "https://customer-assets.emergentagent.com/job_agency-reimagined/artifacts/qppcfbqj_u2462154512_POV_first-person_view_high-fashion_Vogue_editoria_68a56ba2-daad-477d-bad2-2c3a5b5c204a_0.png",
};

// WTF Logo Component - Original style with circles
const WTFLogo = ({ className = "", size = "md", dark = false }) => {
  const sizes = {
    sm: { circle: 28, font: 12 },
    md: { circle: 36, font: 16 },
    lg: { circle: 48, font: 20 },
    xl: { circle: 64, font: 28 }
  };
  const s = sizes[size];
  const bgColor = dark ? "bg-black" : "bg-white";
  const textColor = dark ? "text-white" : "text-black";
  
  return (
    <div className={`flex items-center ${className}`} data-testid="wtf-logo">
      <div className="relative flex items-start" style={{ marginRight: '8px' }}>
        <div 
          className={`${bgColor} rounded-full flex items-center justify-center ${textColor} font-bold absolute`}
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: 0, left: 0 }}
        >
          W
        </div>
        <div 
          className={`${bgColor} rounded-full flex items-center justify-center ${textColor} font-bold absolute`}
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: s.circle * 0.6, left: s.circle * 0.5 }}
        >
          T
        </div>
        <div 
          className={`${bgColor} rounded-full flex items-center justify-center ${textColor} font-bold absolute`}
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: s.circle * 0.3, left: s.circle * 1.1 }}
        >
          F
        </div>
        <div 
          className={`${bgColor} rounded-full flex items-center justify-center ${textColor} font-bold absolute`}
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: s.circle * 1.2, left: s.circle * 0.7 }}
        >
          ¿
        </div>
        <div style={{ width: s.circle * 2.2, height: s.circle * 2.2 }} />
      </div>
    </div>
  );
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
        <a href="#hero" className="flex items-center gap-3" data-testid="nav-logo">
          <WTFLogo size="sm" />
          <span className="hidden md:block text-white/50 text-sm">|</span>
          <span className="hidden md:inline font-['Anton'] text-lg tracking-tight text-white uppercase">
            Brief Destroyers
          </span>
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {["Process", "Work", "Team", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest"
              data-testid={`nav-${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="mailto:hello@wtfagency.com"
          className="btn-primary hidden md:block text-sm"
          data-testid="nav-cta"
        >
          Let's Talk
        </a>
      </div>
    </motion.nav>
  );
};

// Hero Section - Full Screen with Dog VR image
const HeroSection = () => (
  <FullScreenSection 
    image={IMAGES.hero} 
    overlay="bg-gradient-to-r from-black/80 via-black/40 to-transparent"
    className="min-h-screen"
  >
    <div id="hero" className="container mx-auto px-6 md:px-12 py-32" data-testid="hero-section">
      <motion.div {...fadeUp} className="max-w-4xl">
        <p className="text-white/60 font-mono text-sm uppercase tracking-[0.3em] mb-8" data-testid="hero-tagline">
          Battle-tested creativity since 2010
        </p>
        <div className="flex items-start gap-6 md:gap-10 mb-10">
          <WTFLogo size="xl" />
          <div className="w-px h-32 bg-white/30 hidden md:block" />
          <div>
            <h1 className="font-['Anton'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white uppercase leading-[0.85]" data-testid="hero-title">
              Brief
            </h1>
            <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9]">
              Destro<br />-yers
            </h1>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-xl mb-4 font-light leading-relaxed" data-testid="hero-subtitle">
          A creative system in motion.
        </p>
        <p className="text-lg text-white/50 max-w-lg mb-12 font-light italic" data-testid="hero-description">
          We don't do what's right. We do what works.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:hello@wtfagency.com" className="btn-primary inline-flex items-center gap-3" data-testid="hero-cta-primary">
            Start a Project <ArrowRight size={20} />
          </a>
          <a href="#process" className="btn-outline inline-flex items-center gap-3" data-testid="hero-cta-secondary">
            How We Work
          </a>
        </div>
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <ChevronDown className="text-white/50 animate-bounce" size={32} />
    </motion.div>
  </FullScreenSection>
);

// Philosophy Section - Full Screen with Horses image
const PhilosophySection = () => (
  <FullScreenSection 
    image={IMAGES.horses} 
    overlay="bg-gradient-to-l from-black/80 via-black/50 to-transparent"
  >
    <div id="philosophy" className="container mx-auto px-6 md:px-12 py-32" data-testid="philosophy-section">
      <motion.div {...fadeUp} className="max-w-3xl ml-auto text-right">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="philosophy-label">
          Our Philosophy
        </p>
        <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase mb-8 leading-[0.9]" data-testid="philosophy-title">
          We're not<br />an agency.
        </h2>
        <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/40 uppercase mb-12 leading-[0.9]">
          We're a<br />system.
        </h2>
        <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light max-w-xl ml-auto" data-testid="philosophy-text">
          We build platforms, creative systems, and content ecosystems that adapt, learn, and scale.
        </p>
      </motion.div>
    </div>
  </FullScreenSection>
);

// Process Section - Full Screen with Racer image
const ProcessSection = () => {
  const steps = [
    { title: "Think", spanish: "Pensar", desc: "Strategy & narrative" },
    { title: "Make", spanish: "Hacer", desc: "Speed & craft" },
    { title: "Move", spanish: "Mover", desc: "Strategic activation" },
    { title: "Learn", spanish: "Aprender", desc: "Data & signals" },
    { title: "Scale", spanish: "Crecer", desc: "Optimize & repeat" },
  ];

  return (
    <FullScreenSection 
      image={IMAGES.racer} 
      overlay="bg-gradient-to-t from-black via-black/70 to-black/40"
    >
      <div id="process" className="container mx-auto px-6 md:px-12 py-32" data-testid="process-section">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="process-label">
            How We Work
          </p>
          <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl text-white uppercase" data-testid="process-title">
            The Creative System
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
              data-testid={`process-step-${step.title.toLowerCase()}`}
            >
              <div className="w-24 md:w-32 h-24 md:h-32 border-2 border-white/30 group-hover:border-white transition-colors flex flex-col items-center justify-center mb-4">
                <span className="font-['Anton'] text-3xl md:text-4xl text-white uppercase">{step.title}</span>
                <span className="text-white/40 font-mono text-xs uppercase">{step.spanish}</span>
              </div>
              <p className="text-white/50 text-sm">{step.desc}</p>
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

// Capabilities Section - Full Screen with Goggles image
const CapabilitiesSection = () => {
  const capabilities = [
    "Brand Strategy & Platform Thinking",
    "Creative Content Systems",
    "Scalable Production (AI + Hybrid)",
    "Creative Performance",
    "Launches & Cultural Moments",
  ];

  return (
    <FullScreenSection 
      image={IMAGES.goggles} 
      overlay="bg-gradient-to-r from-black/90 via-black/60 to-transparent"
    >
      <div id="capabilities" className="container mx-auto px-6 md:px-12 py-32" data-testid="capabilities-section">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="capabilities-label">
            Capabilities
          </p>
          <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl text-white uppercase mb-12 leading-[0.9]" data-testid="capabilities-title">
            What We<br />Bring
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
                <span className="text-white/30 font-mono text-sm">0{i + 1}</span>
                <div className="w-8 h-px bg-white/30 group-hover:bg-white group-hover:w-16 transition-all" />
                <p className="text-xl md:text-2xl text-white/80 group-hover:text-white transition-colors">{cap}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FullScreenSection>
  );
};

// Case Studies Section - Full Screen with Heels image
const CaseStudiesSection = () => {
  const clients = ["Motorola", "Absolut", "Honda", "Ford", "Samsung", "Havana Club", "Bayer", "Quilmes"];

  return (
    <FullScreenSection 
      image={IMAGES.heels} 
      overlay="bg-gradient-to-l from-black/90 via-black/60 to-transparent"
    >
      <div id="work" className="container mx-auto px-6 md:px-12 py-32" data-testid="work-section">
        <motion.div {...fadeUp} className="max-w-3xl ml-auto text-right">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60 mb-8" data-testid="work-label">
            Selected Work
          </p>
          <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl text-white uppercase mb-4 leading-[0.9]" data-testid="work-title">
            Brands<br />We've Moved
          </h2>
          <p className="text-white/50 italic mb-12 text-lg">
            Reinterpreting is breaking the brief until it works.
          </p>
          
          <div className="flex flex-wrap justify-end gap-x-8 gap-y-4">
            {clients.map((client, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="font-['Anton'] text-3xl md:text-4xl text-white/30 hover:text-white transition-colors cursor-pointer uppercase"
                data-testid={`client-${client.toLowerCase()}`}
              >
                {client}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </FullScreenSection>
  );
};

// Team Section - Dark with stats
const TeamSection = () => (
  <section id="team" className="bg-black py-24 md:py-40" data-testid="team-section">
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="team-label">
            The Team
          </p>
          <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl text-white uppercase mb-8 leading-[0.9]" data-testid="team-title">
            Autonomous<br />Cells
          </h2>
          <p className="text-xl text-white/60 mb-4 leading-relaxed" data-testid="team-description">
            Small by design. Immense by impact.
          </p>
          <p className="text-lg text-white/40 leading-relaxed">
            One team per brand. One objective per cell.
          </p>
        </div>
        <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
          <div className="aspect-square bg-[#111] border border-white/20 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-white font-['Anton']">15+</span>
            <span className="text-white/50 mt-2">Years</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-black font-['Anton']">6</span>
            <span className="text-black/50 mt-2">Offices</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-black font-['Anton']">50+</span>
            <span className="text-black/50 mt-2">Cells</span>
          </div>
          <div className="aspect-square bg-[#111] border border-white/20 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-7xl text-white font-['Anton']">∞</span>
            <span className="text-white/50 mt-2">Briefs</span>
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
    { city: "Madrid", country: "Spain" },
    { city: "Santiago", country: "Chile" },
    { city: "Asunción", country: "Paraguay" },
    { city: "Lima", country: "Peru" },
    { city: "CDMX", country: "Mexico" },
  ];

  return (
    <section id="offices" className="bg-white text-black py-24 md:py-32" data-testid="offices-section">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-black/50 mb-4" data-testid="offices-label">
            Global Presence
          </p>
          <h2 className="font-['Anton'] text-4xl md:text-5xl text-black uppercase" data-testid="offices-title">
            Where We Are
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
              <h3 className="font-['Anton'] text-xl text-black uppercase">{office.city}</h3>
              <p className="text-black/50 text-sm">{office.country}</p>
              {office.status && (
                <span className="inline-block mt-2 px-2 py-1 bg-black text-white text-xs font-mono">
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
        <WTFLogo size="lg" className="justify-center mb-12" />
        <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase mb-4 leading-[0.9]" data-testid="contact-title">
          Ready to destroy
        </h2>
        <h2 className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/40 uppercase mb-12 leading-[0.9]">
          some briefs?
        </h2>
        <p className="text-xl text-white/50 mb-4 leading-relaxed max-w-2xl mx-auto" data-testid="contact-description">
          Strategy + creativity + production + AI + distribution.<br />
          All moving together. All moving fast.
        </p>
        <p className="text-lg text-white/30 mb-12 italic">
          We don't do what's right. We do what works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:hello@wtfagency.com" className="btn-primary inline-flex items-center justify-center gap-3" data-testid="contact-cta-email">
            <Mail size={20} /> hello@wtfagency.com
          </a>
          <a href="mailto:hello@wtfagency.com?subject=Let's%20Start%20a%20Project" className="btn-outline inline-flex items-center justify-center gap-3" data-testid="contact-cta-project">
            Start a Project <ArrowRight size={20} />
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
          <WTFLogo size="sm" />
          <span className="text-white/30">|</span>
          <span className="text-white/50 text-sm font-['Anton'] uppercase">Brief Destroyers</span>
        </div>
        <p className="text-white/30 text-sm">
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
      <CaseStudiesSection />
      <TeamSection />
      <OfficesSection />
      <ClosingSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
