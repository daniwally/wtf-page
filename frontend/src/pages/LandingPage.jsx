import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

// WTF Logo Component - Original style with circles
const WTFLogo = ({ className = "", size = "md" }) => {
  const sizes = {
    sm: { circle: 28, font: 12, gap: -8 },
    md: { circle: 36, font: 16, gap: -10 },
    lg: { circle: 48, font: 20, gap: -12 }
  };
  const s = sizes[size];
  
  return (
    <div className={`flex items-center ${className}`} data-testid="wtf-logo">
      <div className="relative flex items-start" style={{ marginRight: '8px' }}>
        {/* W circle - top left */}
        <div 
          className="bg-white rounded-full flex items-center justify-center text-black font-bold absolute"
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: 0, left: 0 }}
        >
          W
        </div>
        {/* T circle - middle */}
        <div 
          className="bg-white rounded-full flex items-center justify-center text-black font-bold absolute"
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: s.circle * 0.6, left: s.circle * 0.5 }}
        >
          T
        </div>
        {/* F circle - right */}
        <div 
          className="bg-white rounded-full flex items-center justify-center text-black font-bold absolute"
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: s.circle * 0.3, left: s.circle * 1.1 }}
        >
          F
        </div>
        {/* ? circle - bottom */}
        <div 
          className="bg-white rounded-full flex items-center justify-center text-black font-bold absolute"
          style={{ width: s.circle, height: s.circle, fontSize: s.font, top: s.circle * 1.2, left: s.circle * 0.7 }}
        >
          ¿
        </div>
        <div style={{ width: s.circle * 2.2, height: s.circle * 2.2 }} />
      </div>
    </div>
  );
};

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
          {["Process", "Capabilities", "Work", "Contact"].map((item) => (
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

// Hero Section
const HeroSection = () => (
  <section
    id="hero"
    className="bg-black min-h-screen flex flex-col justify-center relative overflow-hidden"
    data-testid="hero-section"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-0" />
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-20 relative z-10">
      <motion.div {...fadeUp} className="max-w-6xl">
        <p className="text-white/50 font-mono text-sm uppercase tracking-[0.3em] mb-6" data-testid="hero-tagline">
          Battle-tested creativity since 2010
        </p>
        <div className="flex items-center gap-8 mb-8">
          <WTFLogo size="lg" />
          <div className="w-px h-24 bg-white/30" />
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white" data-testid="hero-title">
            Brief<br />
            <span className="italic font-serif">Destro</span><br />
            <span className="italic font-serif">-yers</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-6 font-light leading-relaxed" data-testid="hero-subtitle">
          A creative system in motion. We combine strategy, creativity, production, 
          technology, and AI to build what actually works.
        </p>
        <p className="text-lg text-white/40 max-w-xl mb-12 font-light italic" data-testid="hero-description">
          We don't do what's right. We do what works.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:hello@wtfagency.com"
            className="btn-primary inline-flex items-center gap-3"
            data-testid="hero-cta-primary"
          >
            Start a Project <ArrowRight size={20} />
          </a>
          <a
            href="#process"
            className="btn-outline inline-flex items-center gap-3"
            data-testid="hero-cta-secondary"
          >
            See How We Work
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
      <ChevronDown className="text-white/30 animate-bounce" size={32} />
    </motion.div>
  </section>
);

// Philosophy Section (Light)
const PhilosophySection = () => (
  <section
    id="philosophy"
    className="bg-white text-black py-24 md:py-40"
    data-testid="philosophy-section"
  >
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp}>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-black/50 mb-8" data-testid="philosophy-label">
          Our Philosophy
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black mb-12 max-w-5xl font-['Anton'] uppercase" data-testid="philosophy-title">
          We're not an agency.<br />
          <span className="text-black/40">We're a system.</span>
        </h2>
      </motion.div>
      <motion.div {...stagger} className="grid md:grid-cols-2 gap-12 mt-16">
        <motion.div {...fadeUp}>
          <p className="text-xl md:text-2xl text-black/70 leading-relaxed font-light" data-testid="philosophy-text-1">
            We don't build isolated campaigns. We build platforms, creative systems, 
            and content ecosystems that adapt, learn, and scale.
          </p>
        </motion.div>
        <motion.div {...fadeUp}>
          <p className="text-xl md:text-2xl text-black/70 leading-relaxed font-light" data-testid="philosophy-text-2">
            Today, the one who learns faster wins. A single idea is not enough. 
            A system is needed—powered by autonomous cells that produce, distribute, 
            and optimize week by week.
          </p>
        </motion.div>
      </motion.div>
      <motion.div {...fadeUp} className="mt-20 p-8 md:p-12 bg-black text-white">
        <p className="text-lg md:text-xl font-light" data-testid="philosophy-quote">
          "We evolved. We stopped being an agency that makes campaigns to become 
          a creative system that converts strategy into movement, learning, and growth."
        </p>
        <p className="mt-4 text-white/50 font-mono text-sm uppercase tracking-wider">
          #WTFRULES
        </p>
      </motion.div>
    </div>
  </section>
);

// Process Section (Dark)
const ProcessSection = () => {
  const steps = [
    { 
      title: "Think", 
      spanish: "Pensar",
      desc: "Define focus, strategy, and narrative. We start by understanding your business, not just your brief." 
    },
    { 
      title: "Make", 
      spanish: "Hacer",
      desc: "Produce quickly, with experience and craft. Speed without sacrifice." 
    },
    { 
      title: "Move", 
      spanish: "Mover",
      desc: "Activate in the correct channels. Strategic distribution that reaches the right audience." 
    },
    { 
      title: "Learn", 
      spanish: "Aprender",
      desc: "Read data, signals, and real responses. We listen to what the market tells us." 
    },
    { 
      title: "Scale", 
      spanish: "Crecer",
      desc: "Optimize and repeat what works. Growth is built on validated learnings." 
    },
  ];

  return (
    <section
      id="process"
      className="bg-black py-24 md:py-40"
      data-testid="process-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="process-label">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-16 font-['Anton'] uppercase" data-testid="process-title">
            The Creative System
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-6 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group"
              data-testid={`process-step-${step.title.toLowerCase()}`}
            >
              <div className="p-6 md:p-8 border border-white/20 hover:border-white transition-colors h-full">
                <span className="text-white/50 font-mono text-sm">0{i + 1}</span>
                <h3 className="text-3xl md:text-4xl text-white mt-4 mb-2 font-['Anton'] uppercase">{step.title}</h3>
                <p className="text-white/30 font-mono text-xs uppercase tracking-wider mb-4">{step.spanish}</p>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="text-white/30" size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// What We Solve Section (Light)
const WhatWeSolveSection = () => {
  const problems = [
    { title: "Brands that need growth, not just communication" },
    { title: "Overloaded internal teams that can't keep up" },
    { title: "Launches that need real market impact" },
    { title: "High content volume without losing quality" },
    { title: "AI integration into marketing—done right" },
    { title: "Systems that scale, not one-off campaigns" },
  ];

  return (
    <section
      id="solve"
      className="bg-white text-black py-24 md:py-40"
      data-testid="solve-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-black/50 mb-8" data-testid="solve-label">
            What We Solve
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-black mb-16 max-w-4xl font-['Anton'] uppercase" data-testid="solve-title">
            Business problems, not briefs
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="p-8 border-2 border-black/10 hover:border-black transition-colors group"
              data-testid={`solve-item-${i}`}
            >
              <span className="text-black/30 font-mono text-sm mb-4 block">0{i + 1}</span>
              <p className="text-lg md:text-xl text-black font-medium">{problem.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Capabilities Section (Dark)
const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: "Brand Strategy & Platform Thinking",
      desc: "From positioning to creative platforms that give your brand a system, not just a campaign.",
    },
    {
      title: "Creative Content Systems",
      desc: "Ecosystems of content designed to work across channels, formats, and time.",
    },
    {
      title: "Scalable Production",
      desc: "AI-augmented + hybrid teams that multiply output without multiplying cost.",
    },
    {
      title: "Creative Performance",
      desc: "Data-informed creativity that converts. We optimize what we create.",
    },
    {
      title: "Launches & Cultural Moments",
      desc: "Big moves that cut through noise. Strategy meets execution at speed.",
    },
  ];

  return (
    <section
      id="capabilities"
      className="bg-[#111] py-24 md:py-40"
      data-testid="capabilities-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="capabilities-label">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white max-w-4xl font-['Anton'] uppercase" data-testid="capabilities-title">
            What we bring to the table
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="capability-card p-8 bg-black border border-white/10 hover:border-white transition-colors"
              data-testid={`capability-${i}`}
            >
              <span className="text-white/50 font-mono text-sm">0{i + 1}</span>
              <h3 className="text-2xl md:text-3xl text-white mt-4 mb-4 font-['Anton'] uppercase">{cap.title}</h3>
              <p className="text-white/60 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Who This Is For Section (Light)
const AudienceSection = () => {
  const audiences = [
    "Ambitious brands ready to move faster",
    "CMOs who want impact, not just assets",
    "Teams that need systems, not improvisation",
    "Companies scaling content without scaling headcount",
    "Leaders who believe in creativity that performs",
  ];

  return (
    <section
      id="audience"
      className="bg-white text-black py-24 md:py-40"
      data-testid="audience-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-black/50 mb-8" data-testid="audience-label">
              Who This Is For
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-black mb-8 font-['Anton'] uppercase" data-testid="audience-title">
              Built for the bold
            </h2>
            <p className="text-xl text-black/60 mb-12 leading-relaxed" data-testid="audience-description">
              We work with brands and teams that refuse to accept "good enough." 
              If you're looking for a partner who thinks in systems and delivers in speed, 
              you've found us.
            </p>
          </div>
          <div className="space-y-4">
            {audiences.map((audience, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 border-l-4 border-black bg-black/5"
                data-testid={`audience-item-${i}`}
              >
                <ArrowRight className="text-black flex-shrink-0" size={20} />
                <p className="text-lg text-black">{audience}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Client Logos Section (Dark)
const ClientsSection = () => {
  const clients = [
    "Motorola", "Absolut", "Honda", "Ford", "Samsung", 
    "Havana Club", "Bayer", "Quilmes", "Cinzano", "Sensus"
  ];

  return (
    <section
      id="clients"
      className="bg-black py-20 md:py-32 overflow-hidden"
      data-testid="clients-section"
    >
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <motion.p 
          {...fadeUp}
          className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-4"
          data-testid="clients-label"
        >
          Trusted By
        </motion.p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="client-logo mx-8 md:mx-16 text-white font-['Anton'] text-3xl md:text-4xl uppercase tracking-tight"
              data-testid={`client-${client.toLowerCase().replace(' ', '-')}-${i}`}
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// Case Studies Section with Client Logos
const CaseStudiesSection = () => {
  const cases = [
    {
      client: "Motorola",
      title: "Redefining Mobile Culture",
      category: "Brand Campaign",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    },
    {
      client: "Absolut",
      title: "Breaking Creative Boundaries",
      category: "Creative Platform",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
    },
    {
      client: "Honda",
      title: "Driving Emotional Connection",
      category: "Integrated Campaign",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
    },
    {
      client: "Ford",
      title: "Power Meets Innovation",
      category: "Launch Campaign",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop",
    },
    {
      client: "Samsung",
      title: "Tech That Connects",
      category: "Digital Experience",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop",
    },
    {
      client: "Havana Club",
      title: "Authenticity Redefined",
      category: "Brand Identity",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="work"
      className="bg-[#111] py-24 md:py-40"
      data-testid="work-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="work-label">
              Selected Work
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-['Anton'] uppercase" data-testid="work-title">
              Case Studies
            </h2>
          </div>
          <p className="text-white/40 max-w-md text-right italic">
            Reinterpreting is breaking the brief until it works.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseStudy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="case-card aspect-[4/5] relative group cursor-pointer"
              data-testid={`case-study-${i}`}
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                  {caseStudy.category}
                </p>
                {/* Client Name as Logo-style text */}
                <h3 className="text-3xl md:text-4xl text-white mb-2 font-['Anton'] uppercase tracking-tight">{caseStudy.client}</h3>
                <p className="text-white/60 text-sm">{caseStudy.title}</p>
              </div>
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-white" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section (Dark)
const TeamSection = () => (
  <section
    id="team"
    className="bg-black py-24 md:py-40"
    data-testid="team-section"
  >
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="team-label">
            The Team
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-8 font-['Anton'] uppercase" data-testid="team-title">
            Autonomous Cells
          </h2>
          <p className="text-xl text-white/60 mb-8 leading-relaxed" data-testid="team-description">
            Small by design. Immense by impact. Our structure is built around 
            specialized cells—focused teams with character, speed, and execution.
          </p>
          <p className="text-lg text-white/40 mb-8 leading-relaxed">
            One team per brand. One objective per cell. We bring professional 
            cells with real experience—what others lack, we deliver.
          </p>
        </div>
        <motion.div 
          {...fadeUp}
          className="grid grid-cols-2 gap-4"
        >
          <div className="aspect-square bg-[#111] border border-white/20 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-white font-['Anton']">15+</span>
            <span className="text-white/50 mt-2">Years in motion</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-black font-['Anton']">6</span>
            <span className="text-black/50 mt-2">Global offices</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-black font-['Anton']">50+</span>
            <span className="text-black/50 mt-2">Active cells</span>
          </div>
          <div className="aspect-square bg-[#111] border border-white/20 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-white font-['Anton']">∞</span>
            <span className="text-white/50 mt-2">Briefs destroyed</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Offices Section (Light)
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
    <section
      id="offices"
      className="bg-white text-black py-24 md:py-40"
      data-testid="offices-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-black/50 mb-8" data-testid="offices-label">
            Global Presence
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-black mb-16 font-['Anton'] uppercase" data-testid="offices-title">
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
              className="p-6 border border-black/10 hover:border-black transition-colors group"
              data-testid={`office-${office.city.toLowerCase().replace(' ', '-')}`}
            >
              <MapPin className="text-black mb-4" size={24} />
              <h3 className="text-xl md:text-2xl text-black mb-1 font-['Anton'] uppercase">{office.city}</h3>
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

// CTA / Closing Section (Dark)
const ClosingSection = () => (
  <section
    id="contact"
    className="bg-black py-24 md:py-40 relative overflow-hidden"
    data-testid="contact-section"
  >
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/50 mb-8" data-testid="contact-label">
          Let's Build Something
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 font-['Anton'] uppercase" data-testid="contact-title">
          Ready to destroy<br />
          <span className="text-white/40">some briefs?</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/50 mb-4 leading-relaxed max-w-2xl mx-auto" data-testid="contact-description">
          We're a creative system in motion. Strategy + creativity + production + AI + distribution. 
          All moving together. All moving fast.
        </p>
        <p className="text-lg text-white/30 mb-12 max-w-xl mx-auto italic">
          We don't do what's right. We do what works.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:hello@wtfagency.com"
            className="btn-primary inline-flex items-center justify-center gap-3"
            data-testid="contact-cta-email"
          >
            <Mail size={20} />
            hello@wtfagency.com
          </a>
          <a
            href="mailto:hello@wtfagency.com?subject=Let's%20Start%20a%20Project"
            className="btn-outline inline-flex items-center justify-center gap-3"
            data-testid="contact-cta-project"
          >
            Start a Project <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-black border-t border-white/10 py-12" data-testid="footer">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <WTFLogo size="sm" />
          <span className="text-white/30">|</span>
          <span className="text-white/50 text-sm font-['Anton'] uppercase">Brief Destroyers</span>
        </div>
        <p className="text-white/30 text-sm">
          Battle-tested creativity since 2010
        </p>
        <p className="text-white/30 text-sm">
          © {new Date().getFullYear()} WTF Agency. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// Main Landing Page Component
const LandingPage = () => {
  return (
    <main className="overflow-x-hidden" data-testid="landing-page">
      <div className="noise-overlay" />
      <Navigation />
      <HeroSection />
      <PhilosophySection />
      <ProcessSection />
      <WhatWeSolveSection />
      <CapabilitiesSection />
      <AudienceSection />
      <ClientsSection />
      <CaseStudiesSection />
      <TeamSection />
      <OfficesSection />
      <ClosingSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
