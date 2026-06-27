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
  FolderOpen,
  Briefcase,
  ClipboardList,
  GraduationCap,
  BarChart3,
  MapPin,
  Calendar,
  Tag,
  Filter,
  Layers,
  Award,
  Users,
  Target,
  BookOpen,
  LucideIcon
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
}

const categoryOptions: CategoryOption[] = [
  { value: 'all', label: 'All Projects', icon: Layers },
  { value: 'current', label: 'Current (2024-25)', icon: Briefcase },
  { value: 'baseline', label: 'Baseline & Assessments', icon: ClipboardList },
  { value: 'training', label: 'Training & Capacity', icon: GraduationCap },
  { value: 'evaluation', label: 'Evaluations & Research', icon: BarChart3 },
];

const categoryColors: Record<string, string> = {
  current: 'from-red to-red/80',
  baseline: 'from-blue-500 to-blue-500/80',
  training: 'from-green-500 to-green-500/80',
  evaluation: 'from-purple-500 to-purple-500/80',
  all: 'from-gold to-gold/80',
};

const categoryBadgeColors: Record<string, string> = {
  current: 'bg-red/10 text-red border-red/20',
  baseline: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  training: 'bg-green-500/10 text-green-600 border-green-500/20',
  evaluation: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
};

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
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expandedBaselineRows, setExpandedBaselineRows] = useState<string[]>([]);
  const [expandedTrainingGroups, setExpandedTrainingGroups] = useState<Record<string, boolean>>({});

  const allPortfolioItems = useMemo<PortfolioItem[]>(() => {
    return [
      ...portfolioData.currentProjects.map((project) => ({ category: 'current' as const, project })),
      ...portfolioData.baselineAssessments.map((project) => ({ category: 'baseline' as const, project })),
      ...portfolioData.trainingCapacity.map((project) => ({ category: 'training' as const, project })),
      ...portfolioData.evaluationResearch.map((project) => ({ category: 'evaluation' as const, project })),
    ];
  }, []);

  const allTags = useMemo(() => {
    return Array.from(new Set(allPortfolioItems.flatMap((item) => item.project.tags))).sort((a, b) => a.localeCompare(b));
  }, [allPortfolioItems]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredByCategory = allPortfolioItems.filter((item) => {
      if (activeCategory === 'all') return true;
      return item.category === activeCategory;
    });

    return filteredByCategory.filter((item) => {
      const matchesSearch =
        normalizedQuery.length === 0 || getSearchableText(item).includes(normalizedQuery);

      const matchesTags = activeTags.every((tag) => item.project.tags.some((itemTag) => itemTag.toLowerCase() === tag.toLowerCase()));

      return matchesSearch && matchesTags;
    });
  }, [activeCategory, searchQuery, activeTags, allPortfolioItems]);

  const totalCount = useMemo(() => {
    if (activeCategory === 'all') {
      return allPortfolioItems.length;
    }

    return allPortfolioItems.filter((item) => item.category === activeCategory).length;
  }, [activeCategory, allPortfolioItems]);

  const isFiltering = searchQuery.trim().length > 0 || activeTags.length > 0;

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  const toggleExpandedRow = (id: string) => {
    setExpandedBaselineRows((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleTrainingGroup = (groupName: string) => {
    setExpandedTrainingGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveTags([]);
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

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <LeafPattern />

        <div className="relative mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center px-6 py-24 lg:px-8">
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
                SINCE 2008 · 50+ PROJECTS · ALL PROVINCES
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 max-w-3xl font-serif text-[44px] font-bold leading-[1.08] text-white sm:text-[56px] lg:text-[72px]"
            >
              Our Complete <span className="text-gold">Portfolio</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/70 sm:text-[18px]"
            >
              A full record of every project, assessment, training, and evaluation delivered across Pakistan and beyond.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6"
            >
              {[
                ['4 Categories', '4 Categories'],
                ['50+ Projects', '50+ Projects'],
                ['All Provinces', 'All Provinces'],
                ['17 Years', '17 Years'],
              ].map(([label], index) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/90">{label}</span>
                  {index < 3 ? <span className="h-4 w-px bg-white/20" /> : null}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — FILTER BAR */}
      <section className="sticky top-16 z-40 border-b border-charcoal/10 bg-white/95 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <motion.div 
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
                    setSearchQuery('');
                    setActiveTags([]);
                  }}
                  className={`group flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive
                      ? 'border-red bg-red text-white shadow-md shadow-red/20'
                      : 'border-charcoal/10 bg-cream text-charcoal hover:border-red hover:text-red hover:shadow-sm'
                  }`}
                >
                  <IconComponent className={`h-3.5 w-3.5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-muted group-hover:text-red'}`} />
                  {option.label}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div 
            className="flex-1 lg:max-w-xl"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title, client, location, or tag..."
                className="w-full rounded-lg border border-charcoal/15 bg-white pl-10 pr-4 py-2.5 font-sans text-sm text-charcoal outline-none transition-all focus:border-red focus:ring-2 focus:ring-red/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-red"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-4 lg:px-8">
          <motion.div 
            className="flex flex-wrap items-center gap-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Tags:</span>
            </motion.div>
            {allTags.slice(0, 15).map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <motion.button
                  key={tag}
                  variants={fadeInUp}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    active 
                      ? 'bg-red text-white shadow-sm shadow-red/20' 
                      : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10 hover:text-charcoal'
                  }`}
                >
                  {active ? `${tag} ×` : tag}
                </motion.button>
              );
            })}
            {allTags.length > 15 && (
              <motion.span 
                variants={fadeInUp}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
              >
                +{allTags.length - 15} more
              </motion.span>
            )}
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="mt-3 font-mono text-[12px] uppercase tracking-[0.25em] text-charcoal/60"
          >
            Showing {filteredItems.length} of {totalCount} projects
          </motion.p>
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
                className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 pb-6"
              >
                <div>
                  <h2 className="font-serif text-[26px] text-charcoal">
                    {searchQuery.trim() && `Results for: "${searchQuery.trim()}"`}
                    {activeTags.length > 0 && !searchQuery.trim() && `Filtered by: ${activeTags.join(', ')}`}
                    {searchQuery.trim() && activeTags.length > 0 && ` · ${activeTags.join(', ')}`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="group flex items-center gap-2 rounded-full border border-red/30 px-4 py-2 font-sans text-sm text-red transition-all hover:bg-red hover:text-white"
                >
                  <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!filteredItems.length ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-white px-6 py-24 text-center shadow-lg"
            >
              <div className="inline-flex rounded-full bg-charcoal/5 p-4">
                <Search className="h-12 w-12 text-muted" />
              </div>
              <h3 className="mt-6 font-serif text-[28px] text-charcoal">No projects found</h3>
              <p className="mx-auto mt-3 max-w-lg font-sans text-[15px] text-charcoal/60">
                Try adjusting your search or clearing the active filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-8 rounded-full bg-red px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-crimson"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : activeCategory === 'all' && !isFiltering ? (
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
                <div className="mb-6 flex items-center justify-between border-l-4 border-red pl-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-red" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red">CURRENT PROJECTS</p>
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] text-charcoal">Current Projects (2024–2025)</h2>
                  </div>
                  <span className="rounded-full bg-red/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-red">
                    {currentProjects.length} projects
                  </span>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  {currentProjects.map((item, idx) => (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      className="group rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(192,57,43,0.10)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{item.project.period}</span>
                        <span className="rounded-full bg-charcoal/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60">
                          {item.project.id}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-[22px] leading-tight text-charcoal group-hover:text-red transition-colors duration-300">
                        {item.project.title}
                      </h3>
                      <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
                        <Users className="h-3.5 w-3.5" />
                        CLIENT · {item.project.client}
                      </p>
                      <p className="mt-2 font-sans text-[14px] leading-7 text-charcoal/70">{item.project.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-sage/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-forest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              {/* Baseline Projects */}
              <motion.section 
                id="baseline-projects" 
                className="scroll-mt-[120px]"
                variants={fadeInUp}
              >
                <div className="mb-6 flex items-center justify-between border-l-4 border-blue-500 pl-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-blue-500" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-blue-500">BASELINE & MARKET ASSESSMENTS</p>
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] text-charcoal">Baseline & Market Assessments</h2>
                  </div>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-600">
                    {baselineProjects.length} projects
                  </span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm">
                  <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-charcoal/10 bg-charcoal/5 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/60">
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
                      Tags
                    </span>
                  </div>
                  {baselineProjects.map((item, index) => {
                    const isExpanded = expandedBaselineRows.includes(item.project.id);
                    return (
                      <div
                        key={item.project.id}
                        className={`grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 border-b border-charcoal/10 px-6 py-5 transition ${
                          index % 5 === 4 ? 'bg-charcoal/[0.03]' : 'bg-white'
                        } hover:bg-red/[0.03]`}
                      >
                        <div>
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-500">{item.project.id}</span>
                            <div>
                              <h3 className="font-sans text-[15px] font-semibold text-charcoal">{item.project.title}</h3>
                              <p className="mt-2 font-sans text-[13px] leading-6 text-charcoal/60">
                                {item.project.keyActivities.slice(0, 2).join(' · ')}
                              </p>
                              <button
                                type="button"
                                onClick={() => toggleExpandedRow(item.project.id)}
                                className="mt-3 flex items-center gap-1 font-sans text-[13px] font-medium text-blue-500 hover:text-blue-600"
                              >
                                {isExpanded ? 'Hide details' : 'Show details'}
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </button>
                              <motion.div 
                                initial={false}
                                animate={{ 
                                  height: isExpanded ? 'auto' : 0,
                                  opacity: isExpanded ? 1 : 0,
                                  marginTop: isExpanded ? 12 : 0
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-2 pl-4 text-[13px] text-charcoal/60">
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
                            <span key={tag} className="rounded-full bg-blue-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600">
                              {tag}
                            </span>
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
                <div className="mb-6 flex items-center justify-between border-l-4 border-green-500 pl-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-green-500" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-green-500">TRAINING & CAPACITY BUILDING</p>
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] text-charcoal">Training & Capacity Building</h2>
                  </div>
                  <span className="rounded-full bg-green-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-green-600">
                    {trainingProjects.length} trainings
                  </span>
                </div>
                <div className="space-y-3">
                  {Object.entries(groupedTraining).map(([groupName, entries]) => {
                    const isExpanded = expandedTrainingGroups[groupName] ?? true;
                    return (
                      <motion.div 
                        key={groupName} 
                        className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-sm"
                        variants={fadeInUp}
                      >
                        <button
                          type="button"
                          onClick={() => toggleTrainingGroup(groupName)}
                          className="flex w-full items-center justify-between bg-gradient-to-r from-forest to-forest/90 px-6 py-4 text-left text-white transition-all hover:from-forest/90 hover:to-forest/80"
                        >
                          <div>
                            <h3 className="font-sans text-[15px] font-semibold">{groupName}</h3>
                            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">
                              {entries.length} trainings
                            </p>
                          </div>
                          <motion.span 
                            className="text-xl"
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
                                <div key={entry.id} className="grid gap-4 px-6 py-4 md:grid-cols-[1.1fr_0.8fr_1fr_0.7fr] md:items-center hover:bg-charcoal/5 transition-colors duration-200">
                                  <div>
                                    <p className="font-sans text-[14px] font-semibold text-charcoal">{entry.client}</p>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50">{entry.id}</p>
                                  </div>
                                  <div className="flex items-center gap-2 font-sans text-[13px] text-charcoal/60">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {entry.duration}
                                  </div>
                                  <div className="flex items-center gap-2 font-sans text-[13px] text-charcoal/60">
                                    <MapPin className="h-3.5 w-3.5" />
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
                <div className="mb-6 flex items-center justify-between border-l-4 border-purple-500 pl-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-purple-500">EVALUATION & RESEARCH</p>
                    </div>
                    <h2 className="mt-2 font-serif text-[28px] text-charcoal">Evaluation & Research</h2>
                  </div>
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-600">
                    {evaluationProjects.length} studies
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {evaluationProjects.map((item, idx) => (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      className="group rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(128,90,213,0.16)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/50">{item.project.id}</span>
                        <span className="rounded-full bg-purple-500 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                          {item.project.client}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-[20px] leading-tight text-charcoal transition-colors duration-300 group-hover:text-purple-600">
                        {item.project.title}
                      </h3>
                      <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/50">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.project.duration}
                        <span className="mx-2">·</span>
                        <MapPin className="h-3.5 w-3.5" />
                        {item.project.location}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-purple-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-purple-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="border-l-4 border-red pl-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getCategoryIcon(activeCategory);
                    return <Icon className="h-4 w-4 text-red" />;
                  })()}
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-red">{getCategoryLabel(activeCategory)}</p>
                </div>
                <h2 className="mt-2 font-serif text-[28px] text-charcoal">{getCategoryLabel(activeCategory)}</h2>
              </div>
              {filteredItems.map((item, idx) => {
                if (item.category === 'current') {
                  return (
                    <motion.article 
                      key={item.project.id} 
                      variants={fadeInUp}
                      className="rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-serif text-[22px] text-charcoal">{item.project.title}</h3>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">{item.project.period}</span>
                      </div>
                      <p className="mt-3 font-sans text-[14px] leading-7 text-charcoal/70">{item.project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-sage/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-forest">
                            {tag}
                          </span>
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
                    </motion.article>
                  );
                }

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
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
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