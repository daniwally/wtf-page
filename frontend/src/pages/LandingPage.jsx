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
        scrolled ? "bg-[#050505]/90 backdrop-blur-lg py-4" : "bg-transparent py-6"
      }`}
      data-testid="navigation"
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="font-['Anton'] text-2xl tracking-tight text-white" data-testid="nav-logo">
          WTF<span className="text-[#FF3B30]">.</span>
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
    className="section-dark min-h-screen flex flex-col justify-center relative overflow-hidden"
    data-testid="hero-section"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-0" />
    <div className="container mx-auto px-6 md:px-12 pt-32 pb-20 relative z-10">
      <motion.div {...fadeUp} className="max-w-6xl">
        <p className="text-[#FF3B30] font-mono text-sm uppercase tracking-[0.3em] mb-6" data-testid="hero-tagline">
          Battle-tested creativity since 2010
        </p>
        <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-8" data-testid="hero-title">
          Brief<br />
          <span className="text-[#FF3B30]">Destroyers</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-6 font-light leading-relaxed" data-testid="hero-subtitle">
          A creative system in motion. We combine strategy, creativity, production, 
          technology, and AI to build what actually works.
        </p>
        <p className="text-lg text-white/50 max-w-xl mb-12 font-light" data-testid="hero-description">
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
    className="section-light py-24 md:py-40"
    data-testid="philosophy-section"
  >
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp}>
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="philosophy-label">
          Our Philosophy
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#050505] mb-12 max-w-5xl" data-testid="philosophy-title">
          We're not an agency.<br />
          <span className="text-[#FF3B30]">We're a system.</span>
        </h2>
      </motion.div>
      <motion.div {...stagger} className="grid md:grid-cols-2 gap-12 mt-16">
        <motion.div {...fadeUp}>
          <p className="text-xl md:text-2xl text-[#050505]/80 leading-relaxed font-light" data-testid="philosophy-text-1">
            We don't build isolated campaigns. We build platforms, creative systems, 
            and content ecosystems that adapt, learn, and scale.
          </p>
        </motion.div>
        <motion.div {...fadeUp}>
          <p className="text-xl md:text-2xl text-[#050505]/80 leading-relaxed font-light" data-testid="philosophy-text-2">
            Today, the one who learns faster wins. A single idea is not enough. 
            A system is needed—powered by autonomous cells that produce, distribute, 
            and optimize week by week.
          </p>
        </motion.div>
      </motion.div>
      <motion.div {...fadeUp} className="mt-20 p-8 md:p-12 bg-[#050505] text-white">
        <p className="text-lg md:text-xl font-light" data-testid="philosophy-quote">
          "We evolved. We stopped being an agency that makes campaigns to become 
          a creative system that converts strategy into movement, learning, and growth."
        </p>
        <p className="mt-4 text-[#FF3B30] font-mono text-sm uppercase tracking-wider">
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
      className="section-dark py-24 md:py-40"
      data-testid="process-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="process-label">
            How We Work
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-16" data-testid="process-title">
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
              <div className="p-6 md:p-8 border border-white/10 hover:border-[#FF3B30] transition-colors h-full">
                <span className="text-[#FF3B30] font-mono text-sm">0{i + 1}</span>
                <h3 className="text-3xl md:text-4xl text-white mt-4 mb-2">{step.title}</h3>
                <p className="text-white/30 font-mono text-xs uppercase tracking-wider mb-4">{step.spanish}</p>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="text-[#FF3B30]/50" size={20} />
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
    { title: "Brands that need growth, not just communication", icon: "📈" },
    { title: "Overloaded internal teams that can't keep up", icon: "⚡" },
    { title: "Launches that need real market impact", icon: "🚀" },
    { title: "High content volume without losing quality", icon: "🎯" },
    { title: "AI integration into marketing—done right", icon: "🤖" },
    { title: "Systems that scale, not one-off campaigns", icon: "♾️" },
  ];

  return (
    <section
      id="solve"
      className="section-light py-24 md:py-40"
      data-testid="solve-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="solve-label">
            What We Solve
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#050505] mb-16 max-w-4xl" data-testid="solve-title">
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
              className="p-8 border-2 border-[#050505]/10 hover:border-[#FF3B30] transition-colors group"
              data-testid={`solve-item-${i}`}
            >
              <span className="text-3xl mb-4 block">{problem.icon}</span>
              <p className="text-lg md:text-xl text-[#050505] font-medium">{problem.title}</p>
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
      className="section-muted py-24 md:py-40"
      data-testid="capabilities-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="capabilities-label">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white max-w-4xl" data-testid="capabilities-title">
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
              className="capability-card p-8 bg-[#111] border border-white/10"
              data-testid={`capability-${i}`}
            >
              <span className="text-[#FF3B30] font-mono text-sm">0{i + 1}</span>
              <h3 className="text-2xl md:text-3xl text-white mt-4 mb-4">{cap.title}</h3>
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
      className="section-light py-24 md:py-40"
      data-testid="audience-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="audience-label">
              Who This Is For
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#050505] mb-8" data-testid="audience-title">
              Built for the bold
            </h2>
            <p className="text-xl text-[#050505]/70 mb-12 leading-relaxed" data-testid="audience-description">
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
                className="flex items-center gap-4 p-4 border-l-4 border-[#FF3B30] bg-white"
                data-testid={`audience-item-${i}`}
              >
                <ArrowRight className="text-[#FF3B30] flex-shrink-0" size={20} />
                <p className="text-lg text-[#050505]">{audience}</p>
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
      className="section-dark py-20 md:py-32 overflow-hidden"
      data-testid="clients-section"
    >
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <motion.p 
          {...fadeUp}
          className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-4"
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
              className="client-logo mx-8 md:mx-16 text-white"
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

// Case Studies Section
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
  ];

  return (
    <section
      id="work"
      className="section-muted py-24 md:py-40"
      data-testid="work-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="work-label">
              Selected Work
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-white" data-testid="work-title">
              Case Studies
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-right">
            Reinterpreting is breaking the brief until it works.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((caseStudy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="case-card aspect-[4/5] relative group cursor-pointer"
              data-testid={`case-study-${i}`}
            >
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-[#FF3B30] font-mono text-xs uppercase tracking-wider mb-2">
                  {caseStudy.category}
                </p>
                <h3 className="text-2xl md:text-3xl text-white mb-1">{caseStudy.client}</h3>
                <p className="text-white/70">{caseStudy.title}</p>
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
    className="section-dark py-24 md:py-40"
    data-testid="team-section"
  >
    <div className="container mx-auto px-6 md:px-12">
      <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="team-label">
            The Team
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-white mb-8" data-testid="team-title">
            Autonomous Cells
          </h2>
          <p className="text-xl text-white/70 mb-8 leading-relaxed" data-testid="team-description">
            Small by design. Immense by impact. Our structure is built around 
            specialized cells—focused teams with character, speed, and execution.
          </p>
          <p className="text-lg text-white/50 mb-8 leading-relaxed">
            One team per brand. One objective per cell. We bring professional 
            cells with real experience—what others lack, we deliver.
          </p>
        </div>
        <motion.div 
          {...fadeUp}
          className="grid grid-cols-2 gap-4"
        >
          <div className="aspect-square bg-[#111] border border-white/10 p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-[#FF3B30] font-['Anton']">15+</span>
            <span className="text-white/50 mt-2">Years in motion</span>
          </div>
          <div className="aspect-square bg-[#FF3B30] p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-white font-['Anton']">6</span>
            <span className="text-white/80 mt-2">Global offices</span>
          </div>
          <div className="aspect-square bg-white p-6 flex flex-col justify-end">
            <span className="text-5xl md:text-6xl text-[#050505] font-['Anton']">50+</span>
            <span className="text-[#050505]/50 mt-2">Active cells</span>
          </div>
          <div className="aspect-square bg-[#111] border border-white/10 p-6 flex flex-col justify-end">
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
      className="section-light py-24 md:py-40"
      data-testid="offices-section"
    >
      <div className="container mx-auto px-6 md:px-12">
        <motion.div {...fadeUp}>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="offices-label">
            Global Presence
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#050505] mb-16" data-testid="offices-title">
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
              className="p-6 border border-[#050505]/10 hover:border-[#FF3B30] transition-colors group"
              data-testid={`office-${office.city.toLowerCase().replace(' ', '-')}`}
            >
              <MapPin className="text-[#FF3B30] mb-4" size={24} />
              <h3 className="text-xl md:text-2xl text-[#050505] mb-1">{office.city}</h3>
              <p className="text-[#050505]/50 text-sm">{office.country}</p>
              {office.status && (
                <span className="inline-block mt-2 px-2 py-1 bg-[#FF3B30] text-white text-xs font-mono">
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
    className="section-dark py-24 md:py-40 relative overflow-hidden"
    data-testid="contact-section"
  >
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
    <div className="container mx-auto px-6 md:px-12 relative z-10">
      <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#FF3B30] mb-8" data-testid="contact-label">
          Let's Build Something
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8" data-testid="contact-title">
          Ready to destroy<br />
          <span className="text-[#FF3B30]">some briefs?</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/60 mb-4 leading-relaxed max-w-2xl mx-auto" data-testid="contact-description">
          We're a creative system in motion. Strategy + creativity + production + AI + distribution. 
          All moving together. All moving fast.
        </p>
        <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto">
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
  <footer className="bg-[#050505] border-t border-white/10 py-12" data-testid="footer">
    <div className="container mx-auto px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="font-['Anton'] text-2xl text-white">
            WTF<span className="text-[#FF3B30]">.</span>
          </span>
          <span className="text-white/30 text-sm">Brief Destroyers</span>
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
