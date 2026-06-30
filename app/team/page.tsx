'use client';

import { useMemo, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, Sparkles, User, Briefcase, Users, Award, LucideIcon } from 'lucide-react';

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
interface LeadershipPerson {
  name: string;
  title: string;
  email: string;
  bio: string;
  image: string;
  initials: string;
  reverse: boolean;
  linkedin: string;
}

interface Expert {
  name: string;
  role: string;
  area: string;
  image: string | null;
  linkedin: string;
}

type FilterKey = 'All' | 'Senior Consultants' | 'Regional Leads' | 'Technical Specialists';

interface TeamAvatarProps {
  initials: string;
  image?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

interface SocialLinksProps {
  linkedin?: string;
  email?: string;
  className?: string;
}

interface LinkedInIconProps {
  className?: string;
}

// SECTION 1: Leadership (CEO + Co-Founder - stacked vertically)
const leadership: LeadershipPerson[] = [
  {
    name: 'Rookh Niaz Khan',
    title: 'CHIEF EXECUTIVE OFFICER',
    email: 'niaz@brainbox.com.pk',
    bio: 'Rookh leads Brainbox Syndicate with deep experience in sustainable development, institutional strengthening, and strategic advisory across Pakistan and the region. Since 2015, he has guided the firm\'s growth as a trusted partner for evidence-driven programming and resilient systems.',
    image: '/images/team/01-Rookh Niaz Khan.jpg',
    initials: 'RN',
    reverse: false,
    linkedin: 'https://www.linkedin.com/in/rookh-niaz-khan-b18a9449/',
  },
  {
    name: 'Gulfam Mustafa',
    title: 'CO-FOUNDER & PROGRAM DESIGN',
    email: 'gulfam@brainbox.com.pk',
    bio: 'Gulfam is the Co-Founder of Brainbox Syndicate, bringing extensive expertise in program design, strategic planning, and organizational development. He has been instrumental in shaping the firm\'s approach to sustainable development and capacity building across Pakistan.',
    image: '/images/team/02-Gulfam Mustafa.jpg',
    initials: 'GM',
    reverse: false,
    linkedin: 'https://www.linkedin.com/in/gulfamnet/',
  },
];

// SECTION 2: Senior Team (2 rows × 3 columns)
const seniorTeam: Expert[] = [
  { name: 'Tasleem Ayaz', role: 'Principal Consultant', area: 'Senior Consultants', image: '/images/team/03-Miss Tasleem Ayyaz.jpg', linkedin: 'https://www.linkedin.com/in/tasleem-ayaz/' },
  { name: 'Sarir Ahmed Farooqi', role: 'Marker Assessment & Value Chain Lead', area: 'Regional Leads', image: '/images/team/09-Sharir Ahmad Farooqi.jpg', linkedin: 'https://www.linkedin.com/in/sarir-ahmad-farooqi-77b97822/' },
  { name: 'Muhammad Kashif Younis', role: 'MEL/Program Design/Implementations', area: 'Senior Consultants', image: '/images/team/11-Kashif Younis.jpg', linkedin: 'https://www.linkedin.com/in/kashif-younus/' },
  { name: 'Sajida Hameed', role: 'Regional Lead, Southern Punjab', area: 'Regional Leads', image: '/images/team/04-Sajida Hameed.jpg', linkedin: 'https://www.linkedin.com/in/sajida-hameed/' },
  { name: 'Muhammad Anis Danish', role: 'Research & Evaluation Specialist', area: 'Technical Specialists', image: '/images/team/12-Anis Danish.jpg', linkedin: 'https://www.linkedin.com/in/muhammadanisdanish/' },
  { name: 'Shabnam Ayub', role: 'Trainer Enterprise & Skill Development', area: 'Technical Specialists', image: '/images/team/05-Shabnam Ayub.jpg', linkedin: 'https://www.linkedin.com/in/shabnam-ayub/' },
];

// SECTION 3: All remaining experts (mixed)
const otherExperts: Expert[] = [
  { name: 'Firuza Sultan-Zada', role: 'Senior Consultant, Regional Affairs', area: 'Senior Consultants', image: '/images/team/14-FIRUZA SULTAN-ZADA.jpg', linkedin: 'https://www.linkedin.com/in/firuza-sultan-zada/' },
  { name: 'Dr. Odimbe David Bwire', role: 'International Advisor, East Africa', area: 'Regional Leads', image: '/images/team/13-ODIMBE DAVID BWIRE.jpg', linkedin: 'https://www.linkedin.com/in/dr-odimbe-david-bwire/' },
  { name: 'Yasrab Nazir', role: 'Regional Lead, Peshawar KP', area: 'Regional Leads', image: '/images/team/06-Yasrab Nazir.png', linkedin: 'https://www.linkedin.com/in/yasrab-nazir/' },
  { name: 'Irshad Begum', role: 'Technical Specialist, Community Engagement', area: 'Technical Specialists', image: '/images/team/07-Irshad Begum.jpg', linkedin: 'https://www.linkedin.com/in/irshad-begum/' },
  { name: 'Fayaz Muhammad', role: 'Climate change and Livelihoods Specialist', area: 'Senior Consultants', image: '/images/team/08-Fayyaz Muhammad.jpg', linkedin: 'https://www.linkedin.com/in/fayaz-muhammad/' },
  { name: 'Engr Shafi Ullah', role: 'disaster risk reduction, climate change, public health', area: 'Technical Specialists', image: '/images/team/15-SHAFI ULLAH.jpg', linkedin: 'https://www.linkedin.com/in/shafi-ullah/' },
  { name: 'AB Shahid', role: 'Manual Development and Trainer', area: 'Technical Specialists', image: '/images/team/10-AB Shahid.jpg', linkedin: 'https://www.linkedin.com/in/ab-shahid/' },
  { name: 'Rafat Malik', role: ' M & E Specialist ', area: 'Senior Consultants', image: '/images/team/16-RAFAT MALIK.jpg', linkedin: 'https://www.linkedin.com/in/rafat-malik/' },
  { name: 'Feeroz Rafiq', role: 'Research & Evaluation Specialist', area: 'Technical Specialists', image: '/images/team/17-FEEROZ RAFIQ.jpg', linkedin: 'https://www.linkedin.com/in/feeroz-rafiq/' },
  { name: 'Engr Ihsan Ullah', role: 'Sustainability & Climate Change Specialist', area: 'Technical Specialists', image: '/images/team/18-IHSAN ULLAH.jpg', linkedin: ' https://www.linkedin.com/in/ihsan-ullah-86748811/' },
  { name: 'Jay Musyoka', role: 'Monitoring, Evaluation, Research, and Learning (MERL)', area: 'Research Specialists', image: '/images/team/19-Jay Musyoka.jpg', linkedin: 'https://www.linkedin.com/in/jay-musyoka-01a721121/' },
  { name: 'Engr Salman Ahmed Khan', role: 'Software Developer and IT Specialist', area: 'Technical Specialists', image: '/images/team/20-Salman Ahmed Khan.jpg', linkedin: 'https://www.linkedin.com/in/salman-ahmed-khan-salsuqe/' },
  { name: 'Naseem Akhtar Shaikh', role: 'Focal Person Sindh', area: 'Research Specialists', image: '/images/team/21-Naseem akhtar.jpg', linkedin: '' },
];

// Combined experts for filtering (senior + other)
const allExperts = [...seniorTeam, ...otherExperts];

const filters: FilterKey[] = ['All', 'Senior Consultants', 'Regional Leads', 'Technical Specialists'];

function LeafPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.05]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="leaf-pattern-team"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-team)" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-4 w-4" }: LinkedInIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TeamAvatar({ initials, image, name, size = "md" }: TeamAvatarProps) {
  const sizeClasses = {
    sm: "w-20 h-20 text-lg",
    md: "w-24 h-24 text-xl",
    lg: "w-32 h-32 text-2xl",
  };

  if (image) {
    return (
      <div className={`relative aspect-square overflow-hidden rounded-full border-2 border-charcoal/10 bg-white shadow-md transition-all duration-300 group-hover:border-red/40 group-hover:shadow-lg ${sizeClasses[size]}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
    );
  }

  return (
    <div className={`flex aspect-square items-center justify-center rounded-full bg-gradient-to-br from-sage/30 to-sage/10 text-forest shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 ${sizeClasses[size]}`}>
      <span className="font-serif font-bold">{initials}</span>
    </div>
  );
}

function SocialLinks({ linkedin, email, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {linkedin && (
        <motion.a 
          href={linkedin} 
          target="_blank" 
          rel="noreferrer" 
          className="rounded-full border border-charcoal/10 p-2 text-charcoal/60 transition-all duration-300 hover:border-red/40 hover:bg-red/5 hover:text-red hover:shadow-md"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LinkedInIcon className="h-4 w-4" />
        </motion.a>
      )}
      {email && (
        <motion.a 
          href={`mailto:${email}`} 
          className="rounded-full border border-charcoal/10 p-2 text-charcoal/60 transition-all duration-300 hover:border-red/40 hover:bg-red/5 hover:text-red hover:shadow-md"
          aria-label="Email"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Mail className="h-4 w-4" />
        </motion.a>
      )}
    </div>
  );
}

// Expert Card component
function ExpertCard({ person, size = "md" }: { person: Expert; size?: 'sm' | 'md' | 'lg' }) {
  const initials = person.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  
  const avatarSize = {
    sm: "w-16",
    md: "w-24",
    lg: "w-32",
  };
  
  return (
    <motion.div 
      variants={fadeInScale}
      className={`group overflow-hidden rounded-[20px] border border-charcoal/10 bg-white text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${sizeClasses[size]}`}
    >
      <div className={`mx-auto mb-4 ${avatarSize[size]}`}>
        <TeamAvatar 
          initials={initials} 
          image={person.image} 
          name={person.name}
          size={size}
        />
      </div>
      <h3 className="font-sans text-[16px] font-bold text-charcoal group-hover:text-red transition-colors duration-300">
        {person.name}
      </h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {person.role}
      </p>
      
      {person.linkedin && (
        <motion.a 
          href={person.linkedin} 
          target="_blank" 
          rel="noreferrer" 
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-charcoal/10 px-4 py-2 text-charcoal/60 transition-all duration-300 hover:border-red/40 hover:bg-red/5 hover:text-red"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LinkedInIcon className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Connect</span>
        </motion.a>
      )}
    </motion.div>
  );
}

// Leadership Card component
function LeadershipCard({ person, index }: { person: LeadershipPerson; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative rounded-[24px] border border-charcoal/10 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-xl max-w-3xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative w-full max-w-[200px] flex-shrink-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-charcoal/10 bg-cream shadow-lg transition-all duration-300 hover:shadow-xl">
            {person.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-sage/20 to-sage/5 text-[54px] font-serif font-bold text-forest">
                {person.initials}
              </div>
            )}
          </div>
          {index === 0 && (
            <div className="absolute -top-2 -right-2 rounded-full bg-red px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-red/20">
              Founder & CEO
            </div>
          )}
          {index === 1 && (
            <div className="absolute -top-2 -right-2 rounded-full bg-gold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-gold/20">
              Co-Founder
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-red">
            {person.title}
          </p>
          <h3 className="mt-2 font-serif text-[28px] font-bold leading-tight text-charcoal transition-colors duration-300 hover:text-red">
            {person.name}
          </h3>
          
          <SocialLinks linkedin={person.linkedin} email={person.email} className="justify-center md:justify-start mt-3" />
          
          <p className="mt-4 font-sans text-[14px] leading-7 text-muted">
            {person.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');

  const filteredExperts = useMemo(() => {
    if (activeFilter === 'All') return allExperts;
    return allExperts.filter((person) => person.area === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      {/* SECTION 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
          <div className="absolute inset-0 bg-charcoal/40" />
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
                OUR TEAM · EXPERTS · NETWORK
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 font-serif text-[42px] font-bold leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[68px]"
            >
              The People Behind <span className="text-gold">the Impact</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/70 sm:text-[18px]"
            >
              A diverse network of multilingual experts, united by a shared commitment to sustainable development.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — LEADERSHIP (CEO Line 1, Co-Founder Line 2) */}
      <section className="bg-gradient-to-b from-white to-cream px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <div className="h-8 w-1 rounded-full bg-red" />
              <h2 className="font-serif text-[32px] font-bold text-charcoal sm:text-[36px]">
                Our <span className="text-red">Leadership</span>
              </h2>
              <div className="h-8 w-1 rounded-full bg-red" />
            </motion.div>
          </motion.div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* CEO - Line 1 */}
            <LeadershipCard person={leadership[0]} index={0} />
            {/* Co-Founder - Line 2 */}
            <LeadershipCard person={leadership[1]} index={1} />
          </div>
        </div>
      </section>

      {/* SECTION 3 — SENIOR TEAM (2 rows × 3 columns) */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gold" />
              <h2 className="font-serif text-[32px] font-bold text-charcoal sm:text-[36px]">
                Senior <span className="text-gold">Team</span>
              </h2>
              <div className="h-8 w-1 rounded-full bg-gold" />
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-2 text-muted">
              Our most experienced consultants and specialists
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {seniorTeam.map((person) => (
              <ExpertCard key={person.name} person={person} size="md" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — EXPERTS NETWORK (All remaining - mixed) */}
      <section className="bg-gradient-to-b from-white to-cream px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <motion.p 
                variants={fadeInUp}
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-red"
              >
                OUR EXPERTS
              </motion.p>
              <motion.h2 
                variants={fadeInUp}
                className="mt-3 font-serif text-[32px] font-bold text-charcoal sm:text-[40px]"
              >
                A Network Built for <span className="text-red">Impact</span>
              </motion.h2>
            </div>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-3"
            >
              {/* {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <motion.button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isActive 
                        ? 'bg-red text-white shadow-md shadow-red/20' 
                        : 'bg-white text-muted border border-charcoal/10 hover:border-red/30 hover:text-red hover:shadow-sm'
                    }`}
                  >
                    {filter}
                  </motion.button>
                );
              })} */}
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredExperts.map((person) => {
              // Skip senior team members (they're shown above)
              const isSenior = seniorTeam.some(senior => senior.name === person.name);
              if (isSenior) return null;
              
              return <ExpertCard key={person.name} person={person} size="md" />;
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                JOIN OUR NETWORK
              </span>
              <h2 className="mt-3 font-serif text-[36px] font-bold leading-tight sm:text-[44px]">
                Are You a <span className="text-gold">Development Expert?</span>
              </h2>
              <p className="mt-5 max-w-[500px] font-sans text-[16px] leading-7 text-white/75">
                We&apos;re always expanding our roster of vetted consultants, sector specialists, and field researchers. If you have expertise in gender, WASH, MEL, climate, or governance — we want to hear from you.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInScale}
              className="rounded-[20px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              <div className="space-y-4">
                <input 
                  className="w-full rounded-[10px] border border-white/20 bg-cream/95 px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none placeholder:text-charcoal/50 focus:border-red/50 focus:ring-2 focus:ring-red/20 transition-all duration-300" 
                  placeholder="Full Name" 
                />
                <input 
                  className="w-full rounded-[10px] border border-white/20 bg-cream/95 px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none placeholder:text-charcoal/50 focus:border-red/50 focus:ring-2 focus:ring-red/20 transition-all duration-300" 
                  placeholder="Email Address" 
                />
                <select className="w-full rounded-[10px] border border-white/20 bg-cream/95 px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none focus:border-red/50 focus:ring-2 focus:ring-red/20 transition-all duration-300">
                  <option>Gender &amp; GBV</option>
                  <option>WASH &amp; DRR</option>
                  <option>MEL &amp; Research</option>
                  <option>Climate &amp; Environment</option>
                  <option>Governance &amp; Policy</option>
                  <option>Capacity Building</option>
                  <option>Other</option>
                </select>
                <motion.button 
                  className="w-full rounded-[10px] bg-red px-4 py-4 font-serif text-[18px] font-semibold text-white transition-all duration-300 hover:bg-crimson hover:shadow-lg hover:shadow-red/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Our Expert Network
                </motion.button>
                <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                  We typically respond within 5 working days
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}