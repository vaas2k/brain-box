'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Target, 
  TrendingUp, 
  Award,
  Calendar,
  MapPin,
  BookOpen,
  LineChart,
  Shield,
  Globe,
  Briefcase,
  CheckCircle,
  Clock,
  Building2,
  GraduationCap,
  BarChart3,
  HeartHandshake,
  Droplets,
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
interface StatItem {
  value: string;
  label: string;
  span: string;
  accent: string;
  icon: LucideIcon;
}

interface Project {
  title: string;
  meta: string;
  description: string;
  period?: string;
  location?: string;
}

interface Tab {
  id: string;
  label: string;
  color: string;
  icon: LucideIcon;
  projects: Project[];
}

interface TrainingEvent {
  year: string;
  title: string;
  details: string;
  alignment: 'left' | 'right';
  icon: LucideIcon;
}

interface PartnerGroup {
  row: string;
  names: string[];
}

interface CountUpStatProps {
  value: string;
  label: string;
  icon: LucideIcon;
}

const statItems: StatItem[] = [
  {
    value: '120+',
    label: 'Baseline assessments for women entrepreneurs',
    span: 'md:col-span-2',
    accent: 'left-0',
    icon: Users,
  },
  {
    value: '300+',
    label: 'CSOs and grassroots orgs empowered',
    span: 'md:col-span-1',
    accent: 'left-0',
    icon: Building2,
  },
  {
    value: '30+',
    label: 'Impact evaluations executed',
    span: 'md:col-span-1',
    accent: 'left-0',
    icon: Target,
  },
  {
    value: '200+',
    label: 'Partner orgs targeted by 2030',
    span: 'md:col-span-1',
    accent: 'left-0',
    icon: Globe,
  },
];

// UPDATED CURRENT PROJECTS from the image
const tabs: Tab[] = [
  {
    id: 'current',
    label: 'Current Projects 2026',
    color: 'red',
    icon: Clock,
    projects: [
      {
        title: 'Consultancy for Development of a Gender-Responsive Leadership-Focused CBDRM/CERT Curriculum and ToT for AKHP Project Staff',
        meta: 'AKHP · GB & Sindh · April – July 2026',
        description: 'Development of a gender-responsive leadership-focused CBDRM/CERT curriculum and Training of Trainers (ToT) for AKHP project staff to enhance community-based disaster risk management capabilities.',
        period: 'April – July 2026',
        location: 'GB & Sindh'
      },
      {
        title: 'Development of Training Content and Delivery of Training of Trainers (ToT) on Green Skills and Climate-Smart Technologies of Project Staff',
        meta: 'Care International Pakistan · KP, Balochistan, Islamabad and GB · April – August 2026',
        description: 'Development of comprehensive training content and delivery of Training of Trainers (ToT) on green skills and climate-smart technologies for project staff across multiple regions.',
        period: 'April – August 2026',
        location: 'KP, Balochistan, Islamabad and GB'
      },
      {
        title: 'Update of the State of the Environment (SoE) 2018: Agriculture, Livestock, and Food Security',
        meta: 'Azad Jammu & Kashmir (AJ&K) · All Districts of AJK · May – December 2026',
        description: 'Update of the State of the Environment (SoE) 2018 report focusing on Agriculture, Livestock, and Food Security sectors across all districts of Azad Jammu & Kashmir.',
        period: 'May – December 2026',
        location: 'All Districts of AJK'
      },
      {
        title: 'Women-led Climate Enterprise Baseline',
        meta: 'IRC · Khyber Pakhtunkhwa · 2025',
        description: 'A mixed-method assessment shaping women-led resilient livelihood pathways in climate-vulnerable districts.',
        period: '2025',
        location: 'Khyber Pakhtunkhwa'
      },
      {
        title: 'Gender and Social Inclusion Review',
        meta: 'UN Women · Punjab · 2024',
        description: 'Rapid review supporting inclusive programming design for women and youth-led initiatives.',
        period: '2024',
        location: 'Punjab'
      },
      {
        title: 'MEL System Strengthening for Local Partners',
        meta: 'Oxfam · Sindh · 2025',
        description: 'A practical systems upgrade for evidence-based learning and accountability in partner organizations.',
        period: '2025',
        location: 'Sindh'
      },
    ],
  },
  {
    id: 'review',
    label: 'Program Review',
    color: 'sage',
    icon: BookOpen,
    projects: [
      {
        title: 'Institutional Capacity Review',
        meta: 'PPAF · Islamabad · 2024',
        description: 'Strategic review of governance, systems, and delivery capacity for a national NGO network.',
        period: '2024',
        location: 'Islamabad'
      },
      {
        title: 'Organizational Development Strategy',
        meta: 'RSPN · Gilgit · 2025',
        description: 'A forward-looking development plan focused on program quality, partnerships, and growth.',
        period: '2025',
        location: 'Gilgit'
      },
      {
        title: 'Program Quality Assessment',
        meta: 'Islamic Relief · Karachi · 2024',
        description: 'A structured review of implementation practices and strategic alignment across field programs.',
        period: '2024',
        location: 'Karachi'
      },
      {
        title: 'Policy Alignment and Strategy Support',
        meta: 'Government of Pakistan · Islamabad · 2025',
        description: 'Evidence-based strategy facilitation for aligning cross-sector interventions with policy priorities.',
        period: '2025',
        location: 'Islamabad'
      },
    ],
  },
  {
    id: 'monitoring',
    label: 'Third-Party Monitoring',
    color: 'gold',
    icon: LineChart,
    projects: [
      {
        title: 'Flood Response Monitoring',
        meta: 'Oxfam · Pakistan · 2024',
        description: 'Independent third-party monitoring to verify field delivery and accountability for emergency response.',
        period: '2024',
        location: 'Pakistan'
      },
      {
        title: 'Resilience Program Evaluation',
        meta: 'IRC · Punjab · 2025',
        description: 'Performance tracking and validation across multi-site resilience interventions.',
        period: '2025',
        location: 'Punjab'
      },
      {
        title: 'WASH Services Verification',
        meta: 'UNICEF · Sindh · 2024',
        description: 'Field verification of service delivery quality and beneficiary reach in priority districts.',
        period: '2024',
        location: 'Sindh'
      },
      {
        title: 'Community Accountability Review',
        meta: 'Action Against Hunger · Balochistan · 2025',
        description: 'An independent review of complaint mechanisms and community feedback processes.',
        period: '2025',
        location: 'Balochistan'
      },
    ],
  },
  {
    id: 'assessments',
    label: 'Assessments Portfolio',
    color: 'forest',
    icon: BarChart3,
    projects: [
      {
        title: 'Baseline Study for Women Entrepreneurs',
        meta: 'IRC · KP · 2024',
        description: 'An evidence-based baseline informing entrepreneurship support and climate-resilient livelihoods.',
        period: '2024',
        location: 'Khyber Pakhtunkhwa'
      },
      {
        title: 'Market Systems Assessment',
        meta: 'UNFAO · Sindh · 2023',
        description: 'Sectoral analysis of market opportunities, constraints, and adaptation pathways.',
        period: '2023',
        location: 'Sindh'
      },
      {
        title: 'Institutional Capacity Assessment',
        meta: 'PPAF · Islamabad · 2022',
        description: 'A structured diagnostic of organizational capability and operational readiness.',
        period: '2022',
        location: 'Islamabad'
      },
      {
        title: 'Community Needs Assessment',
        meta: 'WHO · Gilgit · 2021',
        description: 'Multisector assessment to identify service gaps and priority needs in hard-to-reach areas.',
        period: '2021',
        location: 'Gilgit'
      },
      {
        title: 'Rural Livelihoods Study',
        meta: 'World Bank · Punjab · 2020',
        description: 'An applied assessment of livelihood challenges and transition opportunities for rural households.',
        period: '2020',
        location: 'Punjab'
      },
      {
        title: 'Social Accountability Scan',
        meta: 'Government of Pakistan · Federal · 2017',
        description: 'An institutional review of accountability mechanisms and service delivery feedback loops.',
        period: '2017',
        location: 'Federal'
      },
    ],
  },
];

const trainingEvents: TrainingEvent[] = [
  {
    year: '2025',
    title: 'Training of Trainers for Local MEL Practitioners',
    details: '42 participants · Islamabad · USAID',
    alignment: 'left',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Gender-Responsive Program Design Workshop',
    details: '38 participants · Peshawar · UN Women',
    alignment: 'right',
    icon: HeartHandshake,
  },
  {
    year: '2023',
    title: 'Climate Risk Assessment Bootcamp',
    details: '51 participants · Lahore · UNFAO',
    alignment: 'left',
    icon: Shield,
  },
  {
    year: '2022',
    title: 'WASH and DRR Facilitation Lab',
    details: '46 participants · Quetta · UNICEF',
    alignment: 'right',
    icon: Droplets,
  },
  {
    year: '2021',
    title: 'Community Engagement and SBCC Refresher',
    details: '33 participants · Multan · WHO',
    alignment: 'left',
    icon: Users,
  },
  {
    year: '2020',
    title: 'Project Design and PCM Masterclass',
    details: '29 participants · Karachi · PPAF',
    alignment: 'right',
    icon: Briefcase,
  },
];

const partners: PartnerGroup[] = [
  { row: 'UN & Multilateral', names: ['USAID', 'UNFAO', 'UN Agencies', 'World Bank', 'UNICEF'] },
  { row: 'International NGOs', names: ['Oxfam', 'Islamic Relief', 'IRC', 'NCA', 'ACF', 'WHH', 'PRCS'] },
  { row: 'National Partners', names: ['PPAF', 'RSPN', 'Government of Pakistan', 'Provincial Governments'] },
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
          id="leaf-pattern-impact"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-impact)" />
    </svg>
  );
}

function CountUpStat({ value, label, icon: Icon }: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const node = document.getElementById(`stat-${value}`);
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!hasStarted) return;
    const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
    let start: number | null = null;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numericValue);
    };
    requestAnimationFrame(step);
  }, [hasStarted, value]);

  return (
    <motion.div 
      id={`stat-${value}`} 
      variants={fadeInUp}
      className="group border-l-[3px] border-red/80 pl-5 transition-all hover:border-red"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-red/10 p-2 text-red">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
      </div>
      <div className="font-serif text-[64px] font-bold leading-none text-gold sm:text-[78px] lg:text-[88px]">
        {hasStarted ? count : 0}
        <span className="ml-1 text-gold">{value.replace(/\d/g, '')}</span>
      </div>
      <p className="mt-3 max-w-[180px] font-sans text-[15px] leading-6 text-muted">{label}</p>
    </motion.div>
  );
}

export default function ImpactPage() {
  const [activeTab, setActiveTab] = useState('current');
  const [isTabVisible, setIsTabVisible] = useState(false);
  const [visibleTimelineDots, setVisibleTimelineDots] = useState<number[]>([]);

  const activeTabContent = useMemo(() => tabs.find((tab) => tab.id === activeTab) ?? tabs[0], [activeTab]);
  
  const getBadgeClasses = (color: string): string => {
    const classes: Record<string, string> = {
      red: 'bg-red/10 text-red border-red/20',
      sage: 'bg-sage/10 text-sage border-sage/20',
      gold: 'bg-gold/10 text-gold border-gold/20',
      forest: 'bg-forest/10 text-forest border-forest/20',
    };
    return classes[color] || classes.red;
  };

  const getTopBarClasses = (color: string): string => {
    const classes: Record<string, string> = {
      red: 'bg-gradient-to-r from-red to-red/80',
      sage: 'bg-gradient-to-r from-sage to-sage/80',
      gold: 'bg-gradient-to-r from-gold to-gold/80',
      forest: 'bg-gradient-to-r from-forest to-forest/80',
    };
    return classes[color] || classes.red;
  };

  useEffect(() => {
    setIsTabVisible(false);
    const timer = window.setTimeout(() => setIsTabVisible(true), 60);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisibleTimelineDots([1, 2, 3, 4, 5, 6]);
      },
      { threshold: 0.25 }
    );

    const node = document.getElementById('timeline-section');
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/impact-banner.jpg"
            alt="Impact background"
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
                IMPACT · EVIDENCE · LEARNING
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 font-serif text-[42px] font-bold leading-[1.08] tracking-tight text-white sm:text-[56px] lg:text-[68px]"
            >
              Measuring What <span className="text-gold inline-block">Matters</span>
            </motion.h1>
            <motion.div 
              variants={fadeInUp}
              className="mt-3 h-[2px] w-[180px] overflow-hidden bg-white/20"
            >
              <motion.div 
                className="h-full w-full origin-left bg-gradient-to-r from-red to-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/80 sm:text-[18px]"
            >
              Every engagement is tracked, evaluated, and built to create lasting change.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — STATS */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid gap-8 md:grid-cols-4 md:items-end"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {statItems.map((stat) => (
              <div key={stat.value} className={stat.span}>
                <CountUpStat value={stat.value} label={stat.label} icon={stat.icon} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — PROJECTS TABS */}
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-serif text-3xl font-bold text-charcoal md:text-[36px]"
            >
              Our <span className="text-red">Project Portfolio</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="mt-2 font-sans text-muted"
            >
              Browse our work across different sectors and engagement types
            </motion.p>
          </motion.div>

          <motion.div 
            className="mt-10 border-b border-charcoal/10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-6 pb-3">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    variants={fadeInUp}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative pb-3 flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive ? 'text-charcoal' : 'text-muted hover:text-red'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 transition-colors duration-300 ${
                      isActive ? 'text-red' : 'text-muted group-hover:text-red'
                    }`} />
                    {tab.label}
                    <motion.span 
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-red to-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTabContent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10"
            >
              <div className={`grid gap-6 md:grid-cols-2 ${isTabVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                {activeTabContent.projects.map((project, idx) => {
                  const IconComponent = activeTabContent.icon;
                  return (
                    <motion.article 
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group overflow-hidden rounded-[12px] border border-charcoal/10 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.10)]"
                    >
                      <div className={`h-2 w-full ${getTopBarClasses(activeTabContent.color)}`} />
                      <div className="p-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] border ${getBadgeClasses(activeTabContent.color)}`}
                          >
                            <IconComponent className="h-3 w-3 mr-1.5" />
                            {activeTabContent.id === 'current' ? 'Current 2026' : activeTabContent.label}
                          </span>
                        </div>
                        <h3 className="mt-4 font-serif text-[20px] leading-tight text-charcoal group-hover:text-red transition-colors duration-300">
                          {project.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {project.meta.split('·')[0]?.trim()}
                          </p>
                          {project.location && (
                            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </p>
                          )}
                          {project.period && (
                            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {project.period}
                            </p>
                          )}
                        </div>
                        <p className="mt-4 font-sans text-[14px] leading-6 text-muted line-clamp-3">
                          {project.description}
                        </p>
                        <motion.a 
                          href="#" 
                          className="mt-6 inline-flex items-center gap-2 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-red transition-all duration-300 hover:gap-4"
                          whileHover={{ x: 3 }}
                        >
                          View Details
                          <ArrowRight className="h-4 w-4" />
                        </motion.a>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 4 — TRAINING TIMELINE */}
      <section id="timeline-section" className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 max-w-2xl"
          >
            <motion.p 
              variants={fadeInUp}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold"
            >
              BUILDING LASTING CAPABILITY
            </motion.p>
            <motion.h2 
              variants={fadeInUp}
              className="mt-3 font-serif text-[36px] font-bold leading-tight sm:text-[44px]"
            >
              Training & <span className="text-gold">Capacity Building</span>
            </motion.h2>
          </motion.div>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-white/10 md:block" />
            <motion.div 
              className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-red via-gold to-red md:block"
              initial={{ height: 0 }}
              animate={{ height: visibleTimelineDots.length ? '100%' : '0%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            <div className="space-y-8">
              {trainingEvents.map((event, index) => {
                const isVisible = visibleTimelineDots.includes(index + 1);
                const IconComponent = event.icon;
                return (
                  <motion.div 
                    key={event.year} 
                    className={`relative flex flex-col ${event.alignment === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <div className={`w-full md:w-1/2 ${event.alignment === 'left' ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                      <motion.div 
                        className={`rounded-[12px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-red/30 ${
                          event.alignment === 'left' ? 'md:ml-auto md:max-w-[420px]' : 'md:max-w-[420px]'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="rounded-lg bg-gold/10 p-2 text-gold">
                            <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                          </div>
                          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-gold">
                            {event.year}
                          </p>
                        </div>
                        <h3 className="font-sans text-[16px] font-bold text-white">
                          {event.title}
                        </h3>
                        <p className="mt-3 font-sans text-[14px] leading-6 text-white/60">
                          {event.details}
                        </p>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="relative z-10 my-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-charcoal shadow-lg md:my-0"
                      whileHover={{ scale: 1.2 }}
                    >
                      <motion.span 
                        className={`h-3 w-3 rounded-full bg-gradient-to-r from-red to-gold transition-all duration-500 ${
                          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                      />
                    </motion.div>
                    
                    <div className={`w-full md:w-1/2 ${event.alignment === 'right' ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PARTNERS */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="max-w-2xl"
            >
              <span className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-red">
                OUR PARTNERS
              </span>
              <h2 className="mt-2 font-serif text-[36px] font-bold leading-tight text-charcoal sm:text-[40px]">
                Organizations That <span className="text-red">Trust Us</span>
              </h2>
              <p className="mt-4 font-sans text-[15px] leading-7 text-muted">
                A portfolio of partnerships spanning UN agencies, INGOs, and government institutions.
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map((partnerGroup, index) => (
              <motion.div key={partnerGroup.row} variants={fadeInUp}>
                <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                  {partnerGroup.row}
                </p>
                <div className="flex flex-wrap gap-3 border-t border-charcoal/10 pt-4">
                  {partnerGroup.names.map((name) => (
                    <motion.span
                      key={name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="rounded-full border border-charcoal/10 bg-white px-4 py-2 font-sans text-[14px] font-semibold text-charcoal/70 transition-all duration-300 hover:border-red/30 hover:text-red hover:shadow-md"
                    >
                      {name}
                    </motion.span>
                  ))}
                </div>
                {index < partners.length - 1 && <div className="mt-6 h-[1px] w-full bg-charcoal/5" />}
              </motion.div>
            ))}
          </motion.div>
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
              Ready to Make an <span className="text-gold">Impact?</span>
            </h2>
            <p className="font-sans text-base text-white/80">
              Lets discuss how we can help you measure and achieve meaningful results.
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