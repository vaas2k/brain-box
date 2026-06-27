'use client';

import { useMemo, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Building2, Globe, Users, Award, Star, ChevronRight, LucideIcon } from 'lucide-react';
import Image from 'next/image';

// Properly typed animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeInScale: Variants = {
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
const tabs = ['UN & Multilateral', 'International NGOs', 'National Partners'] as const;
type TabKey = typeof tabs[number];

interface Client {
  name: string;
  type: string;
  logo?: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: LucideIcon;
}

type ClientGroups = Record<TabKey, Client[]>;

const clientGroups: ClientGroups = {
  'UN & Multilateral': [
    { name: 'USAID', type: 'Development Cooperation', logo: '/images/clients/usaid_logo.png' },
    { name: 'UNFAO', type: 'Food & Agriculture', logo: '/images/clients/unfao_logo.png' },
    { name: 'UN Agencies', type: 'Multilateral Network', logo: '/images/clients/unicef_Logo.png' },
    { name: 'World Bank', type: 'Development Finance', logo: '/images/clients/world_bank_logo.png' },
    { name: 'UNICEF', type: 'Child Welfare', logo: '/images/clients/unicef_Logo.png' },
    { name: 'UN Women', type: 'Gender Equality', logo: '/images/clients/unwomen_logo.png' },
  ],
  'International NGOs': [
    { name: 'Oxfam', type: 'Humanitarian Response', logo: '/images/clients/oxfam_logo.png' },
    { name: 'Islamic Relief', type: 'Community Development', logo: '/images/clients/islamic_relief_logo.png' },
    { name: 'IRC', type: 'Resilience Programming', logo: '/images/clients/irc_logo.png' },
    { name: 'PRCS', type: 'Humanitarian Services', logo: '/images/clients/prcs_logo.png' },
    { name: 'NCA', type: 'Development Cooperation', logo: '/images/clients/nca_logo.png' },
    { name: 'ACF', type: 'Nutrition & Emergencies', logo: '/images/clients/acf_logo.png' },
    { name: 'WHH', type: 'Rural Development', logo: '/images/clients/whh_logo.png' },
  ],
  'National Partners': [
    { name: 'PPAF', type: 'Community Finance', logo: '/images/clients/ppaf_logo.png' },
    { name: 'RSPN', type: 'Social Development', logo: '/images/clients/rspn_logo.png' },
    { name: 'Government Institutions', type: 'Public Sector', logo: '/images/clients/gov_logo.png' },
    { name: 'Provincial Governments', type: 'Local Delivery', logo: '/images/clients/gov_logo.png' },
  ],
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
          id="leaf-pattern-clients"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-clients)" />
    </svg>
  );
}

function getTabIcon(tab: TabKey): LucideIcon {
  switch (tab) {
    case 'UN & Multilateral':
      return Globe;
    case 'International NGOs':
      return Users;
    case 'National Partners':
      return Building2;
    default:
      return Building2;
  }
}

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('UN & Multilateral');

  const activeClients = useMemo(() => clientGroups[activeTab], [activeTab]);
  const IconComponent = getTabIcon(activeTab);

  const stats: StatItem[] = [
    { value: '15+ years', label: 'Field-tested partnership experience', icon: Award },
    { value: '148+ countries', label: 'Of partner reach', icon: Globe },
    { value: '12+ INGOs', label: 'Active partner organizations', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <LeafPattern />

        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl items-center px-6 py-24 lg:px-8">
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
                CLIENTS & PARTNERS
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 font-serif text-[42px] font-bold leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[68px]"
            >
              Partners in <span className="text-gold">Sustainable Development</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/70 sm:text-[18px]"
            >
              Trusted by the organizations working on the world&apos;s most complex challenges.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — QUOTE & STATS */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="pointer-events-none absolute left-0 top-0 -translate-x-4 -translate-y-8 font-serif text-[140px] leading-none text-red/10">
                “
              </div>
              <p className="mx-auto max-w-[750px] font-serif text-[24px] italic leading-[1.7] text-charcoal sm:text-[28px]">
                At Brainbox, social impact lives at the heart of our work. For decades, our team has partnered with communities nationwide to advance equitable development across agriculture, education, health, and disaster response.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="mt-12 flex flex-col gap-6 border-t border-charcoal/10 pt-10 md:flex-row md:justify-center md:gap-12"
            >
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div 
                    key={stat.label} 
                    variants={fadeInUp}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="rounded-lg bg-red/10 p-2.5 text-red group-hover:scale-110 transition-transform duration-300">
                        <StatIcon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <p className="font-mono text-[24px] font-semibold text-red">{stat.value}</p>
                    </div>
                    <p className="mt-2 font-sans text-[14px] text-muted">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — CLIENT PORTFOLIO */}
      <section className="bg-gradient-to-b from-white to-cream px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-red" />
              <h2 className="font-serif text-[32px] font-bold text-charcoal sm:text-[40px]">
                Our <span className="text-red">Client Portfolio</span>
              </h2>
            </motion.div>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 border-b border-charcoal/10 pb-4"
          >
            {tabs.map((tab) => {
              const isActive = tab === activeTab;
              const TabIcon = getTabIcon(tab);
              return (
                <motion.button
                  key={tab}
                  variants={fadeInUp}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive 
                      ? 'bg-red text-white shadow-md shadow-red/20' 
                      : 'bg-white text-muted border border-charcoal/10 hover:border-red/30 hover:text-red hover:shadow-sm'
                  }`}
                >
                  <TabIcon className={`h-4 w-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-muted group-hover:text-red'}`} />
                  {tab}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Client Grid */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            {activeClients.map((client, idx) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-[20px] border border-charcoal/10 bg-white p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-red/30 hover:shadow-xl"
              >
                {/* Decorative top bar */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-red to-gold transition-all duration-300 group-hover:w-full" />
                
                <div className="relative">
                  {/* Logo */}
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/80 p-2 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    {client.logo ? (
                      <div className="relative h-14 w-14">
                        <Image
                          src={client.logo}
                          alt={`${client.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red/10 text-red transition-all duration-300 group-hover:bg-red group-hover:text-white">
                        <Building2 className="h-7 w-7" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-[22px] font-semibold text-charcoal transition-colors duration-300 group-hover:text-red">
                    {client.name}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                    {client.type}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-center gap-1 text-gold/50 group-hover:text-gold transition-colors duration-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Active tab info */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-[0.25em] text-muted"
          >
            <IconComponent className="h-4 w-4 text-red" />
            <span>Showing {activeClients.length} partners in <span className="text-red font-semibold">{activeTab}</span></span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — TESTIMONIAL */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInScale}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5"
            >
              <span className="text-3xl">💬</span>
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 font-serif text-[24px] italic leading-[1.7] text-white sm:text-[28px]"
            >
              &ldquo;Brainbox Syndicate has been an invaluable resource, providing a unique approach, support, and direction for many of our projects.&rdquo;
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-6 flex items-center justify-center gap-4"
            >
              <div className="h-px w-8 bg-red" />
              <span className="font-mono text-[13px] uppercase tracking-[0.25em] text-gold">
                — Partner Organization, Islamabad
              </span>
              <div className="h-px w-8 bg-red" />
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="mt-4 flex justify-center gap-1 text-gold"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
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
              Ready to <span className="text-gold">Partner With Us?</span>
            </h2>
            <p className="font-sans text-base text-white/80">
              Join our network of trusted partners and make a lasting impact together.
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
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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