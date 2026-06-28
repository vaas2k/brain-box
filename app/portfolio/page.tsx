'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  ClipboardList,
  GraduationCap,
  BarChart3,
  MapPin,
  Calendar,
  Tag,
  Filter,
  Layers,
  Users,
  BookOpen,
  LucideIcon,
  Clock,
  Globe,
  Building2,
  FileText,
  TrendingUp,
  Shield,
  Leaf,
  Target
} from 'lucide-react';
import {
  portfolioData,
  type BaselineProject,
  type CurrentProject,
  type EvaluationProject,
  type TrainingProject,
} from '@/lib/portfolio-data';

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
type CategoryKey = 'all' | 'current' | 'baseline' | 'training' | 'evaluation';

type PortfolioItem =
  | { category: 'current'; project: CurrentProject }
  | { category: 'baseline'; project: BaselineProject }
  | { category: 'training'; project: TrainingProject }
  | { category: 'evaluation'; project: EvaluationProject };

interface CategoryOption {
  value: CategoryKey;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

const categoryOptions: CategoryOption[] = [
  { 
    value: 'all', 
    label: 'All Projects', 
    icon: Layers, 
    color: 'from-gold to-gold/80',
    description: 'Complete portfolio overview'
  },
  { 
    value: 'current', 
    label: 'Current Projects', 
    icon: Briefcase, 
    color: 'from-red to-red/80',
    description: 'Ongoing initiatives'
  },
  { 
    value: 'baseline', 
    label: 'Baseline & Assessments', 
    icon: ClipboardList, 
    color: 'from-blue-500 to-blue-500/80',
    description: 'Research & analysis'
  },
  { 
    value: 'training', 
    label: 'Training & Capacity', 
    icon: GraduationCap, 
    color: 'from-green-500 to-green-500/80',
    description: 'Skill development'
  },
  { 
    value: 'evaluation', 
    label: 'Evaluation & Research', 
    icon: BarChart3, 
    color: 'from-purple-500 to-purple-500/80',
    description: 'Impact assessment'
  },
];

const categoryBadgeColors: Record<string, string> = {
  current: 'bg-red/10 text-red border-red/20',
  baseline: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  training: 'bg-green-500/10 text-green-600 border-green-500/20',
  evaluation: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

// Current projects data
const currentProjectsData: CurrentProject[] = [
  {
    id: 'CURRENT-001',
    title: 'Consultancy for Development of a Gender-Responsive Leadership-Focused CBDRM/CERT Curriculum and ToT for AKHP Project Staff',
    client: 'AKHP',
    period: 'April – July 2026',
    location: 'GB & Sindh',
    description: 'Development of a gender-responsive leadership-focused CBDRM/CERT curriculum and Training of Trainers (ToT) for AKHP project staff to enhance community-based disaster risk management capabilities.',
    tags: ['Gender', 'CBDRM', 'CERT', 'Leadership', 'Training', 'AKHP'],
  },
  {
    id: 'CURRENT-002',
    title: 'Development of Training Content and Delivery of Training of Trainers (ToT) on Green Skills and Climate-Smart Technologies of Project Staff',
    client: 'Care International Pakistan',
    period: 'April – August 2026',
    location: 'KP, Balochistan, Islamabad and GB',
    description: 'Development of comprehensive training content and delivery of Training of Trainers (ToT) on green skills and climate-smart technologies for project staff across multiple regions.',
    tags: ['Green Skills', 'Climate-Smart', 'ToT', 'Care International', 'Climate Change'],
  },
  {
    id: 'CURRENT-003',
    title: 'Update of the State of the Environment (SoE) 2018: Agriculture, Livestock, and Food Security',
    client: 'Azad Jammu & Kashmir (AJ&K)',
    period: 'May – December 2026',
    location: 'All Districts of AJK',
    description: 'Update of the State of the Environment (SoE) 2018 report focusing on Agriculture, Livestock, and Food Security sectors across all districts of Azad Jammu & Kashmir.',
    tags: ['Environment', 'Agriculture', 'Livestock', 'Food Security', 'SoE', 'AJK'],
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
          id="leaf-pattern-portfolio"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-portfolio)" />
    </svg>
  );
}

function getTrainingGroup(firstTag: string): string {
  if (['Health', 'Nutrition'].includes(firstTag)) return 'Health & Nutrition';
  if (['Gender', 'MHPSS', 'Protection'].includes(firstTag)) return 'Gender & Protection';
  if (['DRR', 'Climate'].includes(firstTag)) return 'DRR & Climate';
  if (['Agriculture', 'Livelihoods'].includes(firstTag)) return 'Agriculture & Livelihoods';
  if (firstTag === 'Education') return 'Education';
  if (['Peace Building', 'Governance'].includes(firstTag)) return 'Peace & Governance';
  return 'Other';
}

function getSearchableText(item: PortfolioItem): string {
  if (item.category === 'current') {
    return [item.project.title, item.project.client, item.project.location, item.project.description, ...item.project.tags]
      .join(' ')
      .toLowerCase();
  }

  if (item.category === 'baseline') {
    return [item.project.title, item.project.client, item.project.location, ...item.project.keyActivities, ...item.project.tags]
      .join(' ')
      .toLowerCase();
  }

  if (item.category === 'training') {
    return [item.project.client, item.project.duration, item.project.location, item.project.description, ...item.project.tags]
      .join(' ')
      .toLowerCase();
  }

  return [item.project.client, item.project.duration, item.project.title, item.project.location, ...item.project.tags]
    .join(' ')
    .toLowerCase();
}

function getCategoryLabel(category: CategoryKey): string {
  switch (category) {
    case 'current':
      return 'Current Projects';
    case 'baseline':
      return 'Baseline & Market Assessments';
    case 'training':
      return 'Training & Capacity Building';
    case 'evaluation':
      return 'Evaluation & Research';
    default:
      return 'All Projects';
  }
}

function getCategoryIcon(category: CategoryKey): LucideIcon {
  switch (category) {
    case 'current':
      return Briefcase;
    case 'baseline':
      return ClipboardList;
    case 'training':
      return GraduationCap;
    case 'evaluation':
      return BarChart3;
    default:
      return Layers;
  }
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [expandedBaselineRows, setExpandedBaselineRows] = useState<string[]>([]);
  const [expandedTrainingGroups, setExpandedTrainingGroups] = useState<Record<string, boolean>>({});

  const allPortfolioItems = useMemo<PortfolioItem[]>(() => {
    return [
      ...currentProjectsData.map((project) => ({ category: 'current' as const, project })),
      ...portfolioData.baselineAssessments.map((project) => ({ category: 'baseline' as const, project })),
      ...portfolioData.trainingCapacity.map((project) => ({ category: 'training' as const, project })),
      ...portfolioData.evaluationResearch.map((project) => ({ category: 'evaluation' as const, project })),
    ];
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredByCategory = allPortfolioItems.filter((item) => {
      if (activeCategory === 'all') return true;
      return item.category === activeCategory;
    });

    if (normalizedQuery.length === 0) {
      return filteredByCategory;
    }

    return filteredByCategory.filter((item) => {
      const searchableText = getSearchableText(item);
      return searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, searchQuery, allPortfolioItems]);

  const totalCount = useMemo(() => {
    if (activeCategory === 'all') {
      return allPortfolioItems.length;
    }
    return allPortfolioItems.filter((item) => item.category === activeCategory).length;
  }, [activeCategory, allPortfolioItems]);

  const isFiltering = searchQuery.trim().length > 0;

  const clearFilters = () => {
    setSearchQuery('');
    setActiveTag('');
    // Don't reset activeCategory - keep the current category filter
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      // If clicking the same tag, clear filters but keep category
      setSearchQuery('');
      setActiveTag('');
      return;
    }

    setActiveTag(tag);
    // Use the tag as the search query - don't change the category
    // This allows filtering within the current category view
    setSearchQuery(tag);
  };

  const currentProjects = filteredItems.filter((item) => item.category === 'current');
  const baselineProjects = filteredItems.filter((item) => item.category === 'baseline');
  const trainingProjects = filteredItems.filter((item) => item.category === 'training');
  const evaluationProjects = filteredItems.filter((item) => item.category === 'evaluation');

  const groupedTraining = useMemo(() => {
    const groups: Record<string, TrainingProject[]> = {};

    trainingProjects.forEach((item) => {
      const groupName = getTrainingGroup(item.project.tags[0] ?? 'Other');
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(item.project);
    });

    return groups;
  }, [trainingProjects]);

  // Stats for the hero section
  const stats = [
    { label: 'Categories', value: '4', icon: Layers },
    { label: 'Projects', value: `${allPortfolioItems.length}+`, icon: FileText },
    { label: 'Provinces', value: 'All', icon: Globe },
    { label: 'Years', value: '17', icon: Clock },
  ];

  // Determine what to show based on filters
  const showGroupedView = activeCategory === 'all' && !isFiltering;
  const showFilteredView = isFiltering || activeCategory !== 'all';

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
          <div className="absolute inset-0 bg-charcoal/40" />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-red/20 blur-3xl" />
            <div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
          </div>
        </div>
        <LeafPattern />

        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-8">
          <motion.div
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
                OUR PORTFOLIO · 50+ PROJECTS
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 max-w-3xl font-serif text-[44px] font-bold leading-[1.08] text-white sm:text-[56px] lg:text-[72px]"
            >
              Driving <span className="text-gold">Impact</span> Through<br />
              Evidence &amp; Innovation
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/70 sm:text-[18px]"
            >
              Explore our complete portfolio of projects, assessments, trainings, and evaluations 
              delivered across Pakistan since 2008.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all hover:bg-white/10">
                    <div className="flex items-center justify-center gap-2">
                      <Icon className="h-4 w-4 text-gold" />
                      <span className="font-serif text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L1440 0L1440 60C960 60 480 0 0 60L0 0Z" fill="#F8F4F0" />
          </svg>
        </div>
      </section>

      {/* SECTION 2 — CATEGORY FILTERS & SEARCH */}
      <section className="sticky top-16 z-40 border-b border-charcoal/10 bg-white/95 shadow-sm backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* <motion.div 
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categoryOptions.map((option) => {
                const isActive = activeCategory === option.value;
                const IconComponent = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    variants={fadeInUp}
                    type="button"
                    onClick={() => {
                      setActiveCategory(option.value);
                      // Clear search when changing category, but keep tag if it exists
                      // We'll keep the search query to maintain tag filtering
                      if (option.value === 'all') {
                        // If switching to 'all', keep the search if there is one
                        // This allows seeing all projects with a specific tag
                      } else {
                        // If switching to a specific category, keep the search
                        // to filter within that category
                      }
                      // Don't clear searchQuery - this allows tag filtering across categories
                    }}
                    className={`group relative flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 ${
                      isActive
                        ? 'border-red bg-red text-white shadow-lg shadow-red/20'
                        : 'border-charcoal/10 bg-cream text-charcoal hover:border-red hover:text-red hover:shadow-md'
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-muted group-hover:text-red'}`} />
                    {option.label}
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-red"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div> */}

            {/* <motion.div 
              className="flex-1 lg:max-w-xs"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  value={searchQuery}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSearchQuery(value);
                    // If search is cleared, also clear the active tag
                    if (value === '') {
                      setActiveTag('');
                    } else {
                      // If there's a tag that matches the search, set it as active
                      // This keeps the UI in sync
                      const matchingTag = allPortfolioItems
                        .flatMap(item => {
                          if (item.category === 'current') return item.project.tags;
                          if (item.category === 'baseline') return item.project.tags;
                          if (item.category === 'training') return item.project.tags;
                          if (item.category === 'evaluation') return item.project.tags;
                          return [];
                        })
                        .find(tag => tag.toLowerCase() === value.toLowerCase());
                      
                      if (matchingTag) {
                        setActiveTag(matchingTag);
                      } else {
                        setActiveTag('');
                      }
                    }
                  }}
                  placeholder="Search projects..."
                  className="w-full rounded-lg border border-charcoal/15 bg-white pl-10 pr-4 py-2.5 font-sans text-sm text-charcoal outline-none transition-all focus:border-red focus:ring-2 focus:ring-red/20"
                />
                {searchQuery && (
                  <button
                    onClick={clearFilters}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-red"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div> */}
          </div>

          {/* Results counter */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 flex items-center gap-2 border-t border-charcoal/5 pt-3"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-red" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-charcoal/60">
              Showing {filteredItems.length} of {totalCount} projects
            </span>
            {isFiltering && (
              <button
                onClick={clearFilters}
                className="ml-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-red transition-colors hover:text-crimson"
              >
                <X className="h-3 w-3" />
                Clear search
              </button>
            )}
            {activeTag && (
              <span className="ml-2 rounded-full bg-red/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-red">
                Tag: {activeTag}
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — PROJECTS */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            {isFiltering && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 rounded-xl bg-white p-4 shadow-md"
              >
                <p className="font-sans text-sm text-charcoal/70">
                  <span className="font-semibold text-charcoal">Search results:</span> {searchQuery}
                  {activeCategory !== 'all' && (
                    <span className="ml-2 text-charcoal/50">
                      in {getCategoryLabel(activeCategory)}
                    </span>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!filteredItems.length ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-white px-6 py-24 text-center shadow-lg"
            >
              <div className="inline-flex rounded-full bg-charcoal/5 p-6">
                <Search className="h-12 w-12 text-muted" />
              </div>
              <h3 className="mt-6 font-serif text-[28px] text-charcoal">No projects found</h3>
              <p className="mx-auto mt-3 max-w-lg font-sans text-[15px] text-charcoal/60">
                Try adjusting your search or selecting a different category.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-8 rounded-full bg-red px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-crimson"
              >
                Clear search
              </button>
            </motion.div>
          ) : showGroupedView ? (
            <motion.div 
              className="space-y-16"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Current Projects */}
              <motion.section 
                id="current-projects" 
                className="scroll-mt-[120px]"
                variants={fadeInUp}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-red/10 p-2">
                      <Briefcase className="h-5 w-5 text-red" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red">CURRENT PROJECTS</p>
                      <h2 className="font-serif text-[28px] text-charcoal">Current Projects (2026)</h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-red/10 px-4 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-red">
                    {currentProjects.length} projects
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm">
                  <div className="grid grid-cols-[60px_1.2fr_1.8fr_1fr_1.2fr] border-b border-charcoal/10 bg-gradient-to-r from-charcoal/5 to-transparent px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-charcoal/60">
                    <span>#</span>
                    <span>Client</span>
                    <span>Project Title</span>
                    <span>Duration</span>
                    <span>Location</span>
                  </div>
                  {currentProjects.map((item, index) => (
                    <motion.div
                      key={item.project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`grid grid-cols-[60px_1.2fr_1.8fr_1fr_1.2fr] gap-4 border-b border-charcoal/10 px-6 py-4 transition-all hover:bg-red/5 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-charcoal/[0.02]'
                      }`}
                    >
                      <span className="font-mono text-[13px] font-semibold text-charcoal">{index + 1}</span>
                      <div>
                        <span className="font-sans text-[14px] font-semibold text-charcoal">{item.project.client}</span>
                      </div>
                      <div>
                        <p className="font-sans text-[13px] leading-tight text-charcoal/80">{item.project.title}</p>
                      </div>
                      <div className="flex items-center gap-1 font-sans text-[13px] text-charcoal/60">
                        <Calendar className="h-3 w-3" />
                        {item.project.period}
                      </div>
                      <div className="flex items-center gap-1 font-sans text-[13px] text-charcoal/60">
                        <MapPin className="h-3 w-3" />
                        {item.project.location}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Baseline Projects */}
              <motion.section 
                id="baseline-projects" 
                className="scroll-mt-[120px]"
                variants={fadeInUp}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-500/10 p-2">
                      <ClipboardList className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-500">BASELINE & MARKET ASSESSMENTS</p>
                      <h2 className="font-serif text-[28px] text-charcoal">Baseline & Market Assessments</h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-4 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-blue-600">
                    {baselineProjects.length} projects
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm">
                  <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-charcoal/10 bg-gradient-to-r from-charcoal/5 to-transparent px-6 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-charcoal/60">
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5" />
                      Assignment
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      Location
                    </span>
                    <span className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5" />
                      Focus Areas
                    </span>
                  </div>
                  {baselineProjects.map((item, index) => {
                    const isExpanded = expandedBaselineRows.includes(item.project.id);
                    return (
                      <div
                        key={item.project.id}
                        className={`grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 border-b border-charcoal/10 px-6 py-4 transition-all hover:bg-blue-50/30 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-charcoal/[0.02]'
                        }`}
                      >
                        <div>
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-500">{item.project.id}</span>
                            <div>
                              <h3 className="font-sans text-[15px] font-semibold text-charcoal">{item.project.title}</h3>
                              <p className="mt-1 font-sans text-[13px] leading-6 text-charcoal/60">
                                {item.project.keyActivities.slice(0, 2).join(' · ')}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setExpandedBaselineRows((prev) =>
                                    prev.includes(item.project.id)
                                      ? prev.filter((id) => id !== item.project.id)
                                      : [...prev, item.project.id]
                                  );
                                }}
                                className="mt-2 flex items-center gap-1 font-sans text-[13px] font-medium text-blue-500 hover:text-blue-600"
                              >
                                {isExpanded ? 'Show less' : 'Show more'}
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </button>
                              <motion.div 
                                initial={false}
                                animate={{ 
                                  height: isExpanded ? 'auto' : 0,
                                  opacity: isExpanded ? 1 : 0,
                                  marginTop: isExpanded ? 8 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-1 pl-4 text-[13px] text-charcoal/60">
                                  {item.project.keyActivities.map((activity) => (
                                    <li key={activity} className="list-disc">
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                        <div className="font-sans text-[13px] text-charcoal/60">{item.project.location}</div>
                        <div className="flex flex-wrap gap-2">
                          {item.project.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagClick(tag)}
                              className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 ${
                                activeTag === tag
                                  ? 'bg-red text-white border border-red'
                                  : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>

              {/* Training Projects */}
              <motion.section 
                id="training-projects" 
                className="scroll-mt-[120px]"
                variants={fadeInUp}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-green-500/10 p-2">
                      <GraduationCap className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-green-500">TRAINING & CAPACITY BUILDING</p>
                      <h2 className="font-serif text-[28px] text-charcoal">Training & Capacity Building</h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-500/10 px-4 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-green-600">
                    {trainingProjects.length} trainings
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.entries(groupedTraining).map(([groupName, entries]) => {
                    const isExpanded = expandedTrainingGroups[groupName] ?? true;
                    return (
                      <motion.div 
                        key={groupName} 
                        className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm transition-all hover:shadow-md"
                        variants={fadeInUp}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setExpandedTrainingGroups((prev) => ({
                              ...prev,
                              [groupName]: !prev[groupName],
                            }));
                          }}
                          className="flex w-full items-center justify-between bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 text-left text-white transition-all hover:from-green-700 hover:to-green-600"
                        >
                          <div className="flex items-center gap-3">
                            <Target className="h-5 w-5" />
                            <div>
                              <h3 className="font-sans text-[16px] font-semibold">{groupName}</h3>
                              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                                {entries.length} training{entries.length > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <motion.span 
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5" />
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="divide-y divide-charcoal/10"
                            >
                              {entries.map((entry) => (
                                <div 
                                  key={entry.id} 
                                  className="grid gap-3 px-6 py-4 md:grid-cols-[1.2fr_0.8fr_1fr_0.8fr] md:items-center hover:bg-green-50/30 transition-colors duration-200"
                                >
                                  <div>
                                    <p className="font-sans text-[14px] font-semibold text-charcoal">{entry.client}</p>
                                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/40">{entry.id}</p>
                                  </div>
                                  <div className="flex items-center gap-2 font-sans text-[13px] text-charcoal/60">
                                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                    {entry.duration}
                                  </div>
                                  <div className="flex items-center gap-2 font-sans text-[13px] text-charcoal/60">
                                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                    {entry.location}
                                  </div>
                                  <div className="font-sans text-[13px] leading-6 text-charcoal/60">{entry.description}</div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              {/* Evaluation Projects */}
              <motion.section 
                id="evaluation-projects" 
                className="scroll-mt-[120px]"
                variants={fadeInUp}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-purple-500/10 p-2">
                      <BarChart3 className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-500">EVALUATION & RESEARCH</p>
                      <h2 className="font-serif text-[28px] text-charcoal">Evaluation & Research</h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-purple-500/10 px-4 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.25em] text-purple-600">
                    {evaluationProjects.length} studies
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {evaluationProjects.map((item, index) => (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      custom={index}
                      className="group rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(128,90,213,0.16)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/40">{item.project.id}</span>
                        <span className="rounded-full bg-purple-500 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                          {item.project.client}
                        </span>
                      </div>
                      <h3 className="mt-4 font-serif text-[20px] leading-tight text-charcoal transition-colors duration-300 group-hover:text-purple-600">
                        {item.project.title}
                      </h3>
                      <div className="mt-3 flex flex-col gap-1">
                        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/50">
                          <Calendar className="h-3.5 w-3.5" />
                          {item.project.duration}
                        </p>
                        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/50">
                          <MapPin className="h-3.5 w-3.5" />
                          {item.project.location}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                              activeTag === tag
                                ? 'bg-red text-white border border-red'
                                : 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          ) : (
            // FILTERED VIEW - Shows when searching or when a specific category is selected
            <motion.div 
              className="space-y-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 border-l-4 border-red pl-4">
                <div className="rounded-lg bg-red/10 p-2">
                  {(() => {
                    const Icon = getCategoryIcon(activeCategory);
                    return <Icon className="h-5 w-5 text-red" />;
                  })()}
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red">{getCategoryLabel(activeCategory)}</p>
                  <h2 className="font-serif text-[28px] text-charcoal">{getCategoryLabel(activeCategory)}</h2>
                  {isFiltering && (
                    <p className="font-sans text-sm text-charcoal/60">
                      Filtered by: <span className="font-semibold">{searchQuery}</span>
                    </p>
                  )}
                </div>
              </div>
              {filteredItems.map((item) => {
                if (item.category === 'current') {
                  return (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-serif text-[22px] text-charcoal">{item.project.title}</h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">{item.project.period}</span>
                      </div>
                      <p className="mt-3 font-sans text-[14px] leading-7 text-charcoal/70">{item.project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                              activeTag === tag
                                ? 'bg-red text-white border border-red'
                                : 'bg-sage/15 text-forest hover:bg-sage/25'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </motion.article>
                  );
                }

                if (item.category === 'baseline') {
                  return (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-500">{item.project.id}</p>
                          <h3 className="mt-2 font-sans text-[16px] font-semibold text-charcoal">{item.project.title}</h3>
                        </div>
                        <p className="font-sans text-[13px] text-charcoal/60">{item.project.location}</p>
                      </div>
                      <ul className="mt-4 space-y-2 pl-5 text-[13px] text-charcoal/60">
                        {item.project.keyActivities.slice(0, 3).map((activity) => (
                          <li key={activity} className="list-disc">
                            {activity}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                              activeTag === tag
                                ? 'bg-red text-white border border-red'
                                : 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </motion.article>
                  );
                }

                if (item.category === 'training') {
                  return (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-green-500">{item.project.id}</p>
                          <h3 className="mt-2 font-sans text-[16px] font-semibold text-charcoal">{item.project.client}</h3>
                        </div>
                        <p className="font-sans text-[13px] text-charcoal/60">{item.project.duration}</p>
                      </div>
                      <p className="mt-3 font-sans text-[14px] leading-7 text-charcoal/70">{item.project.description}</p>
                      <p className="mt-3 flex items-center gap-2 font-sans text-[13px] text-charcoal/60">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.project.location}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                              activeTag === tag
                                ? 'bg-red text-white border border-red'
                                : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </motion.article>
                  );
                }

                // Evaluation
                return (
                  <motion.article 
                    key={item.project.id} 
                    variants={fadeInUp}
                    className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-500">{item.project.id}</p>
                      <span className="rounded-full bg-purple-500 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                        {item.project.client}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-[20px] text-charcoal">{item.project.title}</h3>
                    <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/50">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.project.duration}
                      <span className="mx-2">·</span>
                      <MapPin className="h-3.5 w-3.5" />
                      {item.project.location}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.project.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagClick(tag)}
                          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                            activeTag === tag
                              ? 'bg-red text-white border border-red'
                              : 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="relative bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-20 text-white lg:px-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-red/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-serif text-[34px] leading-tight sm:text-[36px]"
            >
              Have a project that needs <span className="text-gold">our expertise?</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="mt-4 max-w-xl font-sans text-[16px] leading-7 text-white/70"
            >
              Browse our portfolio, then get in touch — we&apos;ll match you with the right team and approach.
            </motion.p>
          </motion.div>
          <motion.div 
            className="flex flex-col gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Link 
                href="/contact" 
                className="group flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-center font-sans text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all hover:bg-crimson hover:shadow-lg hover:shadow-red/20"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.a 
              variants={fadeInUp}
              href="/Brainbox_Profile_2025.pdf" 
              download 
              className="group flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-center font-sans text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all hover:bg-white hover:text-charcoal"
            >
              Download Company Profile
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}