'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Target,
  Users,
  BookOpen,
  Globe,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  CheckCircle,
  TrendingUp,
  Building2,
  Layers,
  Download,
  Eye,
  BarChart3,
  Network,
  Lightbulb,
  Rocket,
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
interface Objective {
  number: string;
  title: string;
  body: string;
  metric: string;
  icon: LucideIcon;
  color: string;
}

interface TheoryColumn {
  header: string;
  items: string[];
  icon: LucideIcon;
}

interface Phase {
  range: string;
  title: string;
  items: string[];
  progress: number;
  icon: LucideIcon;
}

interface Region {
  name: string;
  description: string;
  tag: string;
  icon: LucideIcon;
  color: string;
}

interface KPI {
  value: string;
  label: string;
  icon: LucideIcon;
}

const objectives: Objective[] = [
  {
    number: '01',
    title: 'Strengthen Institutional Capacity',
    body: 'Enhance technical and operational capabilities across 200+ partner organizations through embedded capacity building, coaching, and toolkits.',
    metric: '200+ organizations',
    icon: Building2,
    color: 'red',
  },
  {
    number: '02',
    title: 'Build a Premier Global Expert Network',
    body: 'Expand and actively manage a diverse roster of vetted consultants, sector specialists, and field researchers across the globe.',
    metric: '500+ vetted experts',
    icon: Network,
    color: 'gold',
  },
  {
    number: '03',
    title: 'Curate and Generate Knowledge',
    body: 'Develop, validate, and disseminate open-source technical toolkits and learning products informed by real fieldwork.',
    metric: '50+ toolkits',
    icon: BookOpen,
    color: 'blue',
  },
  {
    number: '04',
    title: 'Foster South-South Collaboration',
    body: 'Establish and sustain vibrant regional communities of practice enabling cross-border knowledge exchange.',
    metric: '5+ CoPs',
    icon: Globe,
    color: 'green',
  },
  {
    number: '05',
    title: 'Drive Ecosystem Quality',
    body: 'Achieve industry-leading partner satisfaction through rigorous quality assurance, feedback loops, and adaptive management.',
    metric: '90% satisfaction',
    icon: Award,
    color: 'purple',
  },
];

const theoryColumns: TheoryColumn[] = [
  {
    header: 'Inputs',
    items: ['Vetted expert network', 'Partner relationships', 'Field evidence and data'],
    icon: Layers,
  },
  {
    header: 'Activities',
    items: ['Technical facilitation', 'Capacity-building delivery', 'Knowledge toolkit development'],
    icon: Zap,
  },
  {
    header: 'Outputs',
    items: ['Validated tools and methods', 'Training and advisory services', 'Regional learning exchanges'],
    icon: CheckCircle,
  },
  {
    header: 'Outcomes',
    items: ['Stronger institutions', 'Improved program quality', 'Broader partner reach'],
    icon: TrendingUp,
  },
  {
    header: 'Impact',
    items: ['Resilient systems', 'Sustained local capability', 'Greater development effectiveness'],
    icon: Shield,
  },
];

const phases: Phase[] = [
  {
    range: '2025–2026',
    title: 'Foundation & Network Building',
    items: ['Expert roster and consultancy partnerships established', 'Initial toolkits developed and field-tested', 'Pilot facilitation with 50 core partner organizations'],
    progress: 33,
    icon: Rocket,
  },
  {
    range: '2027–2028',
    title: 'Scaling & Systems Strengthening',
    items: ['Full suite of services operational across all regions', 'Learning exchanges and communities of practice active', '150+ partner organizations engaged'],
    progress: 66,
    icon: TrendingUp,
  },
  {
    range: '2029–2030',
    title: 'Sustainability & Influence',
    items: ['Partners demonstrate self-sustaining capabilities', 'Brainbox recognized as regional thought leader', 'Ecosystem-wide impact documented and published'],
    progress: 100,
    icon: Award,
  },
];

const regions: Region[] = [
  {
    name: 'Pakistan',
    description: 'Comprehensive technical backstopping for federal and provincial partners',
    tag: 'National facilitation',
    icon: MapPin,
    color: 'from-red/40 to-red/20',
  },
  {
    name: 'Afghanistan',
    description: 'Remote technical support and expert deployment for humanitarian partners',
    tag: 'Adaptive delivery',
    icon: Shield,
    color: 'from-gold/40 to-gold/20',
  },
  {
    name: 'Africa',
    description: 'South-South learning facilitation through regional hubs',
    tag: 'Regional exchange',
    icon: Globe,
    color: 'from-green-500/40 to-green-500/20',
  },
  {
    name: 'CAREC Region',
    description: 'Cross-border technical exchange and standardized tools',
    tag: 'Cross-border collaboration',
    icon: Network,
    color: 'from-blue-500/40 to-blue-500/20',
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
          id="leaf-pattern-strategy"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-strategy)" />
    </svg>
  );
}

export default function StrategyPage() {
  const [activeTheoryColumn, setActiveTheoryColumn] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const kpis: KPI[] = useMemo(
    () => [
      { value: '200+', label: 'Partners', icon: Building2 },
      { value: '500+', label: 'Expert Network', icon: Users },
      { value: '90%', label: 'Satisfaction Target', icon: Award },
    ],
    []
  );

  const getObjectiveColor = (color: string): string => {
    const colors: Record<string, string> = {
      red: 'border-red/20 bg-red/10 text-red',
      gold: 'border-gold/20 bg-gold/10 text-gold',
      blue: 'border-blue-500/20 bg-blue-500/10 text-blue-500',
      green: 'border-green-500/20 bg-green-500/10 text-green-500',
      purple: 'border-purple-500/20 bg-purple-500/10 text-purple-500',
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[length:30px_30px] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0,_transparent_65%)]" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </div>
        <LeafPattern />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6 h-[2px] w-[140px] overflow-hidden bg-white/20 mx-auto"
            >
              <motion.div
                className="h-full w-full origin-center bg-gradient-to-r from-red to-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                BRAINBOX STRATEGY 2030
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mt-6 max-w-5xl font-serif text-[48px] font-bold leading-[0.95] tracking-tight text-white sm:text-[64px] lg:text-[80px]"
            >
              Technical Facilitation
              <br />
              <span className="text-gold">for a Resilient World</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-2xl font-sans text-[16px] leading-7 text-white/70 sm:text-[18px]"
            >
              A strategic framework for partnership, expertise, and lasting impact — 2025 to 2030
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-col items-center text-white/70"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Scroll</span>
              <div className="mt-3 h-8 w-5 rounded-full border border-white/25" />
              <motion.div
                className="mt-2 h-2 w-2 rounded-full bg-red"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — QUOTE & KPIs */}
      <section className="relative bg-gradient-to-b from-cream to-white px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="pointer-events-none absolute left-0 top-0 -translate-x-4 -translate-y-8 font-serif text-[180px] leading-none text-red/10">
              “
            </div>
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-4xl font-serif text-[24px] italic leading-[1.6] text-charcoal sm:text-[32px]"
            >
              By 2030, Brainbox will have enhanced the capabilities of 200+ partner organizations, developed 50+ field-validated technical toolkits, and facilitated a 40% increase in South-South learning across Pakistan, Afghanistan, the CAREC region, and Africa.
            </motion.p>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 font-mono text-[13px] uppercase tracking-[0.25em] text-muted"
          >
            — Brainbox Strategy 2030, Executive Summary
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex flex-col gap-6 border-t border-charcoal/10 pt-8 md:flex-row md:justify-center md:gap-12"
          >
            {kpis.map((kpi) => {
              const IconComponent = kpi.icon;
              return (
                <motion.div
                  key={kpi.label}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-lg bg-red/10 p-2 text-red group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <p className="font-mono text-[24px] font-semibold text-red">{kpi.value}</p>
                  </div>
                  <p className="mt-2 font-sans text-[14px] text-muted">{kpi.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — STRATEGIC SIGNAL */}
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[24px] border border-charcoal/10 bg-gradient-to-br from-cream to-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              className="p-8 sm:p-10 lg:p-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p
                variants={fadeInUp}
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-red"
              >
                STRATEGIC SIGNAL
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="mt-4 font-serif text-[30px] font-bold leading-tight text-charcoal sm:text-[36px]"
              >
                A practical roadmap for <span className="text-red">resilient systems</span> and trusted partnerships.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-5 max-w-2xl font-sans text-[15px] leading-7 text-muted"
              >
                From field-ready toolkits to regional learning exchanges, each objective is designed to strengthen delivery, deepen local capability, and institutionalize impact.
              </motion.p>
            </motion.div>
            <motion.div
              className="relative min-h-[280px] lg:min-h-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-full w-full bg-gradient-to-br from-charcoal to-forest">
                <Image
                  src="/strategy/strategy_planning.jpeg"
                  alt="Strategy Visualization"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OBJECTIVES */}
      <section className="bg-gradient-to-b from-white to-cream px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 max-w-2xl"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-[36px] font-bold leading-tight text-charcoal sm:text-[44px]"
            >
              Five Strategic <span className="text-red">Objectives</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-sans text-[15px] leading-7 text-muted"
            >
              Guiding our work from 2025 to 2030.
            </motion.p>
          </motion.div>

          <motion.div
            className="space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {objectives.map((objective) => {
              const IconComponent = objective.icon;
              const colorClasses = getObjectiveColor(objective.color);
              return (
                <motion.div
                  key={objective.number}
                  variants={fadeInUp}
                  className="group border-b border-charcoal/10 py-8 transition-all duration-300 hover:bg-red/5 md:py-10"
                >
                  <div className="grid gap-6 md:grid-cols-[160px_1fr_110px] md:items-start">
                    <div className="flex items-center gap-3 md:block">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${colorClasses} md:mb-3 md:h-14 md:w-14 transition-all duration-300 group-hover:scale-110`}>
                        <IconComponent className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div className="font-serif text-[96px] leading-none text-gold/10 transition-colors duration-300 group-hover:text-red/20 md:text-[140px]">
                        {objective.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-serif text-[24px] leading-tight text-charcoal transition-all duration-300 group-hover:text-red">
                        {objective.title}
                      </h3>
                      <p className="mt-4 max-w-2xl font-sans text-[15px] leading-7 text-muted">
                        {objective.body}
                      </p>
                      <motion.p
                        className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-red"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red" />
                        {objective.metric}
                      </motion.p>
                    </div>
                    <div className="flex items-center justify-start md:justify-end">
                      <div className={`rounded-xl p-3 ${colorClasses} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                        <IconComponent className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — THEORY OF CHANGE */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold"
            >
              OUR FRAMEWORK
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 font-serif text-[36px] font-bold leading-tight sm:text-[44px]"
            >
              Our <span className="text-gold">Theory of Change</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid gap-3 lg:grid-cols-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {theoryColumns.map((column, index) => {
              const isExpanded = activeTheoryColumn === index || !isMobile;
              const IconComponent = column.icon;
              return (
                <motion.div
                  key={column.header}
                  variants={fadeInUp}
                  className="rounded-[12px] border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:bg-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTheoryColumn(isExpanded ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-gold/10 p-1.5 text-gold">
                        <IconComponent className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-gold">
                        {column.header}
                      </span>
                    </div>
                    {isMobile && (
                      <span className="text-[16px] text-gold">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </span>
                    )}
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                      marginTop: isExpanded ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-3">
                      {column.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 font-sans text-[14px] leading-6 text-white/75">
                          <span className="mt-2 h-[2px] w-3 shrink-0 bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  {!isMobile && index < theoryColumns.length - 1 && (
                    <motion.div
                      className="mt-5 flex items-center justify-center text-gold/30"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — PHASED IMPLEMENTATION */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-red"
            >
              IMPLEMENTATION ROADMAP
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 font-serif text-[36px] font-bold leading-tight text-charcoal sm:text-[44px]"
            >
              Phased Implementation <span className="text-red">2025–2030</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid gap-6 xl:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <motion.div
                  key={phase.range}
                  variants={fadeInUp}
                  className="group rounded-[16px] border border-charcoal/10 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(192,57,43,0.10)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-red/10 p-2 text-red">
                        <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-gold">
                        {phase.range}
                      </p>
                    </div>
                    <span className="rounded-full bg-red/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-red">
                      Phase 0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-[24px] leading-tight text-charcoal group-hover:text-red transition-colors duration-300">
                    {phase.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {phase.items.map((item) => (
                      <li key={item} className="flex gap-2 font-sans text-[15px] leading-6 text-muted">
                        <CheckCircle className="h-5 w-5 shrink-0 text-red" strokeWidth={1.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 h-[6px] overflow-hidden rounded-full bg-charcoal/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-red to-gold"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${phase.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {phase.progress}% Complete
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 — REGIONS */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 max-w-2xl"
          >
            <motion.span
              variants={fadeInUp}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold"
            >
              GEOGRAPHIC REACH
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-2 font-serif text-[36px] font-bold leading-tight sm:text-[44px]"
            >
              Where Strategy Meets <span className="text-gold">Ground</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {regions.map((region) => {
              const IconComponent = region.icon;
              return (
                <motion.div
                  key={region.name}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-[16px] bg-white/5 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-50`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-white/10 p-2 text-gold">
                        <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-gold/80">
                        {region.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="mt-3 font-serif text-[24px] leading-tight text-white group-hover:text-gold transition-colors duration-300">
                        {region.name}
                      </h3>
                      <p className="mt-3 max-w-[260px] font-sans text-[14px] leading-6 text-white/70">
                        {region.description}
                      </p>
                      <motion.div
                        className="mt-6 opacity-0 translate-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        <span className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="/strategy/brainbox-strategy-2030.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-red px-6 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-crimson hover:shadow-lg hover:shadow-red/20"
            >
              <Download className="h-4 w-4" />
              Download Strategy PDF
            </a>
            <span className="font-sans text-[14px] text-white/60">
              Full strategic document available for partners and stakeholders.
            </span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — CTA */}
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
              Ready to Build <span className="text-gold">Resilient Systems?</span>
            </h2>
            <p className="font-sans text-base text-white/80">
              Partner with us to achieve your strategic goals and create lasting impact.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex shrink-0 flex-col items-center space-y-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 font-sans text-xs font-bold uppercase tracking-widest text-charcoal shadow-lg transition-all duration-300 hover:bg-forest hover:text-white hover:shadow-2xl hover:-translate-y-1"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="font-mono text-xs tracking-wider text-white/60">
              Or email us at niaz@brainbox.com.pk
            </span>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}