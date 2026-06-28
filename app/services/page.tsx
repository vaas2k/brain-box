'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  ClipboardList, 
  Target, 
  TrendingUp, 
  Building2, 
  RefreshCw, 
  Droplets, 
  Scale, 
  Leaf, 
  MessageSquare, 
  HeartHandshake, 
  GraduationCap, 
  Users, 
  Gauge,
  BookOpen,
  LineChart,
  Search,
  Globe,
  Shield,
  Zap,
  LucideIcon
} from 'lucide-react';

// Properly typed animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

// Type definitions
interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

interface Pillar {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProcessStep {
  title: string;
  body: string;
  icon: LucideIcon;
}

interface IconWrapperProps {
  icon: LucideIcon;
  className?: string;
}

const services: Service[] = [
  {
    number: '01',
    title: 'Evidence-based research and analytical studies',
    description:
      'Rigorous quantitative and qualitative research methodologies underpinning every intervention',
    icon: BarChart3,
    category: 'Research',
  },
  {
    number: '02',
    title: 'Rapid assessments, baseline and endline surveys',
    description:
      'Time-sensitive field assessments providing critical data for program design and evaluation',
    icon: ClipboardList,
    category: 'Research',
  },
  {
    number: '03',
    title: 'Impact evaluations and performance assessments',
    description:
      'Independent evaluation measuring effectiveness, efficiency, and sustainability of programs',
    icon: Target,
    category: 'Evaluation',
  },
  {
    number: '04',
    title: 'Market research, surveys, and sectoral assessments',
    description:
      'Deep sectoral intelligence informing economic development and livelihood programming',
    icon: TrendingUp,
    category: 'Research',
  },
  {
    number: '05',
    title: 'Strategic planning and organizational development',
    description:
      'Institutional strengthening and strategic frameworks for NGOs, CSOs, and government bodies',
    icon: Building2,
    category: 'Strategy',
  },
  {
    number: '06',
    title: 'Project Cycle Management (PCM)',
    description:
      'End-to-end project design, implementation support, and adaptive management',
    icon: RefreshCw,
    category: 'Strategy',
  },
  {
    number: '07',
    title: 'WASH and Disaster Risk Reduction (DRR) technical assessments',
    description:
      'Water, sanitation, and resilience assessments for humanitarian and development contexts',
    icon: Droplets,
    category: 'Technical',
  },
  {
    number: '08',
    title: 'Gender-responsive and GBV/SEA-sensitive programming design',
    description:
      'Feminist program design ensuring equitable access and protection from harm',
    icon: Scale,
    category: 'Gender',
  },
  {
    number: '09',
    title: 'Climate resilience and environmental analysis',
    description:
      'Climate vulnerability assessments and green economy advisory for sustainable futures',
    icon: Leaf,
    category: 'Climate',
  },
  {
    number: '10',
    title: 'Behavior Change Communication (BCC) strategies',
    description:
      'Evidence-based SBCC frameworks driving community-level behavior transformation',
    icon: MessageSquare,
    category: 'Strategy',
  },
  {
    number: '11',
    title: 'Humanitarian needs assessments',
    description:
      'Rapid, multi-sector needs analysis for emergency and post-disaster response',
    icon: HeartHandshake,
    category: 'Technical',
  },
  {
    number: '12',
    title: 'Training and capacity-building programs',
    description:
      'Tailored learning programs that leave lasting technical capability in partner organizations',
    icon: GraduationCap,
    category: 'Strategy',
  },
  {
    number: '13',
    title: 'Community engagement and social mobilization strategies',
    description:
      'Participatory approaches building community ownership and sustainable social change',
    icon: Users,
    category: 'Strategy',
  },
  {
    number: '14',
    title: 'MEAL system development',
    description:
      'Monitoring, Evaluation, Accountability and Learning frameworks for adaptive management',
    icon: Gauge,
    category: 'Evaluation',
  },
];

const pillars: Pillar[] = [
  {
    eyebrow: 'GENDER-RESPONSIVE GREEN INNOVATION',
    title: 'Climate-smart agriculture, circular economy, and green entrepreneurship',
    description:
      'Technical advisory on climate-smart agriculture, circular economy, and green entrepreneurship — with gender equity at the center of every intervention.',
    icon: Leaf,
  },
  {
    eyebrow: 'INTEGRATED WASH, HEALTH & NUTRITION',
    title: 'Convergence models and service delivery for the most vulnerable communities',
    description:
      'Facilitation of convergence models, SBCC strategy design, and integrated service delivery for the most vulnerable communities.',
    icon: Droplets,
  },
  {
    eyebrow: 'MONITORING, EVALUATION & LEARNING',
    title: 'Partner MEL systems, impact measurement, and third-party evaluations',
    description:
      'Partner MEL system design, impact measurement frameworks, and rigorous third-party evaluations that drive accountability and learning.',
    icon: LineChart,
  },
  {
    eyebrow: 'POLICY & GOVERNANCE',
    title: 'Evidence-based policy analysis and institutional reform',
    description:
      'Technical assistance for evidence-based policy analysis, multi-stakeholder governance, and institutional reform frameworks.',
    icon: Shield,
  },
];

const processSteps: ProcessStep[] = [
  {
    title: 'UNDERSTAND',
    body: 'Deep contextual assessment of partner needs',
    icon: Search,
  },
  {
    title: 'DESIGN',
    body: 'Co-creating tailored technical solutions',
    icon: BookOpen,
  },
  {
    title: 'DEPLOY',
    body: 'Expert deployment with embedded quality assurance',
    icon: Zap,
  },
  {
    title: 'EVALUATE',
    body: 'Rigorous MEL throughout every engagement',
    icon: LineChart,
  },
  {
    title: 'SUSTAIN',
    body: 'Knowledge transfer ensuring lasting capability',
    icon: RefreshCw,
  },
];

function LeafPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.05]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="leaf-pattern-services"
          x="0"
          y="0"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M60 20 C45 35, 35 55, 60 90 C85 55, 75 35, 60 20 Z"
            fill="none"
            stroke="#4A5568"
            strokeWidth="1.5"
          />
          <path
            d="M20 60 C35 45, 55 35, 90 60 C55 85, 35 75, 20 60 Z"
            fill="none"
            stroke="#4A5568"
            strokeWidth="1"
            opacity="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#leaf-pattern-services)" />
    </svg>
  );
}

function IconWrapper({ icon: Icon, className = "h-5 w-5" }: IconWrapperProps) {
  return <Icon className={className} strokeWidth={1.5} />;
}

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsProcessVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const processSection = document.getElementById('process-section');
    if (processSection) {
      observer.observe(processSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isProcessVisible) return;

    const timers = processSteps.map((_, index) =>
      window.setTimeout(() => {
        setVisibleSteps((prev) => (prev.includes(index + 1) ? prev : [...prev, index + 1]));
      }, index * 200)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isProcessVisible]);

  const serviceTagline = useMemo(
    () => ['Evidence-Based', 'Gender-Responsive', 'Context-Driven'],
    []
  );

  const categories = ['All', 'Research', 'Evaluation', 'Strategy', 'Technical', 'Gender', 'Climate'];
  
  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/service.jpg"
            alt="Services background"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <LeafPattern />

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-24 lg:px-8">
          <motion.div 
            className="max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                BRAINBOX SYNDICATE · TECHNICAL SERVICES
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 font-serif text-[42px] font-bold leading-[1.08] tracking-tight text-white sm:text-[56px] lg:text-[68px]"
            >
              Expert Solutions Across the 
              <span className="text-gold block">Development Spectrum</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/75 sm:text-[18px]"
            >
              14 specialized technical services. One integrated approach.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — TAGLINE */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-20 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl text-center font-serif text-[24px] leading-[1.7] text-charcoal sm:text-[28px]"
          >
            Brainbox delivers a comprehensive suite of technical services that strengthen development, humanitarian, and climate-resilience programming across Pakistan and beyond — grounded in evidence, designed for scale.
          </motion.p>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {serviceTagline.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeInUp}
                className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold transition-all hover:scale-105 hover:shadow-md"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — SERVICES LIST WITH CATEGORY FILTER */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-serif text-3xl font-bold text-charcoal md:text-[36px]"
            >
              Our <span className="text-red">Services</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="mt-2 font-sans text-muted"
            >
              Filter by category to find the expertise you need
            </motion.p>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={fadeInUp}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-red text-white shadow-md shadow-red/20'
                    : 'bg-charcoal/5 text-muted hover:bg-charcoal/10 hover:text-charcoal'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredServices.map((service, index) => {
              const isOpen = expandedService === index;
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.number}
                  variants={fadeInUp}
                  className="group border-b border-charcoal/10 transition-all duration-300 hover:bg-red/5"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedService(isOpen ? null : index)}
                    className="flex w-full items-start justify-between gap-6 px-0 py-6 text-left transition-all duration-300 sm:py-7"
                  >
                    <div className="flex min-w-[52px] items-start pt-1 sm:min-w-[72px]">
                      <span
                        className={`font-mono text-[13px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 group-hover:text-red ${isOpen ? 'text-red' : 'text-muted'}`}
                      >
                        {service.number}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-1.5 transition-colors duration-300 ${isOpen ? 'bg-red/10 text-red' : 'bg-charcoal/5 text-muted group-hover:text-red'}`}>
                          <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div className="relative inline-block max-w-3xl">
                          <h3 className="font-serif text-[20px] leading-tight text-charcoal transition-colors duration-300 group-hover:text-red sm:text-[22px]">
                            {service.title}
                          </h3>
                          <span className={`absolute bottom-[-6px] left-0 h-[2px] bg-gradient-to-r from-red to-gold transition-all duration-300 ${isOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                        </div>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? 12 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[620px] font-sans text-[14px] leading-6 text-muted sm:text-[15px]">
                          {service.description}
                        </p>
                        <span className="mt-2 inline-block rounded-full bg-charcoal/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                          {service.category}
                        </span>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="ml-2 flex items-center pt-1 sm:ml-4"
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-5 w-5 text-red/60" strokeWidth={1.5} />
                    </motion.div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — FOUR PILLARS */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="mb-10 max-w-2xl"
            >
              <span className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-gold">
                OUR EXPERTISE
              </span>
              <h2 className="mt-2 font-serif text-[36px] font-bold leading-tight sm:text-[44px]">
                Our Four Pillars of <span className="text-gold">Facilitation</span>
              </h2>
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pillars.map((pillar, index) => {
              const isExpanded = expandedPillar === index;
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={pillar.eyebrow}
                  variants={fadeInUp}
                  className="overflow-hidden rounded-[12px] border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setExpandedPillar(index)}
                    onMouseLeave={() => setExpandedPillar(null)}
                    onClick={() => setExpandedPillar(isExpanded ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-2 transition-colors duration-300 ${isExpanded ? 'bg-gold/20 text-gold' : 'bg-white/5 text-gold/60'}`}>
                        <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                          {pillar.eyebrow}
                        </p>
                        <h3 className="mt-1 font-serif text-[20px] leading-tight text-white sm:text-[22px]">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <motion.span 
                      className="text-[28px] font-light text-gold"
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      +
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                      paddingBottom: isExpanded ? 24 : 0,
                      paddingLeft: isExpanded ? 32 : 0,
                      paddingRight: isExpanded ? 32 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-0"
                  >
                    <p className="max-w-3xl font-sans text-[15px] leading-7 text-white/75">
                      {pillar.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — PROCESS */}
      <section id="process-section" className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-red"
            >
              OUR APPROACH
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="mt-2 font-serif text-[36px] font-bold leading-tight text-charcoal sm:text-[40px]"
            >
              How <span className="text-red">We Work</span>
            </motion.h2>
          </motion.div>

          <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
            {/* Decorative line */}
            <div className="absolute left-6 top-10 hidden h-[1px] w-[calc(100%-4.5rem)] border-t border-dashed border-red/40 md:block" />
            <div className="absolute left-7 top-10 hidden h-[calc(100%-2.5rem)] w-[1px] border-l border-dashed border-red/40 md:hidden" />

            {processSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = visibleSteps.includes(stepNumber);
              const IconComponent = step.icon;
              return (
                <motion.div 
                  key={step.title} 
                  className="relative flex-1 md:pr-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                    <motion.div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        isActive 
                          ? 'border-red bg-red text-white shadow-lg shadow-red/20' 
                          : 'border-charcoal/20 bg-white text-charcoal/40'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                    </motion.div>
                    <div className="md:mt-4">
                      <p className={`font-mono text-[12px] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
                        isActive ? 'text-red' : 'text-muted'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`mt-2 max-w-[220px] font-sans text-[14px] leading-6 transition-colors duration-300 ${
                        isActive ? 'text-charcoal' : 'text-muted'
                      }`}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="relative z-30 bg-gradient-to-br from-red to-red/90 px-6 py-20 text-white lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, white 0%, transparent 70%)`
        }} />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        
        <motion.div 
          className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={fadeInUp}
            className="max-w-xl space-y-4 text-center lg:text-left"
          >
            <h2 className="font-serif text-[40px] font-bold leading-tight">
              Ready to Build <span className="text-gold">Sustainable Impact?</span>
            </h2>
            <p className="font-sans text-base text-white/80">
              Lets discuss how our technical services can support your development goals.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex shrink-0 flex-col items-center space-y-4"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 font-sans text-xs font-bold uppercase tracking-widest text-charcoal shadow-lg transition-all duration-300 hover:bg-forest hover:text-white hover:shadow-2xl hover:-translate-y-1"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="font-mono text-xs tracking-wider text-white/60">
              Or email us at niaz@brainbox.com.pk
            </span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}