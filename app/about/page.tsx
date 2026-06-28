"use client";

import { useState } from "react";
import { 
  X, Award, MapPin, Clock, Users, Target, Sparkles, 
  Eye, Rocket, Gem, Trophy, Leaf, BarChart, Handshake, 
  Star, Globe, Award as AwardIcon, LucideIcon
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";

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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Type definitions
interface Milestone {
  year: string;
  title: string;
}

interface VMVPanel {
  icon: LucideIcon;
  label: string;
  text: string;
  color: string;
}

interface Advantage {
  num: string;
  title: string;
  body: string;
  stat: string;
  icon: LucideIcon;
}

interface ProfileItem {
  label: string;
  value: string;
}

interface CorporateProfile {
  left: ProfileItem[];
  right: ProfileItem[];
}

interface Office {
  city: string;
  region: string;
  focal: string;
  contact: string;
  cx: number;
  cy: number;
}

interface Award {
  id: number;
  label: string;
  aspect: string;
  icon: LucideIcon;
  image: string; // Added image path
  description?: string; // Optional description
}

interface PakistanMapProps {
  activeOffice: number | null;
  onSelect: (index: number | null) => void;
}

interface ProfileRowProps {
  label: string;
  value: string;
  index: number;
}

const milestones: Milestone[] = [
  { year: "2008", title: "Founded as a boutique development advisory" },
  { year: "2015", title: "Formally incorporated as Brainbox Syndicate (Pvt.) Ltd." },
  { year: "2018", title: "Expanded expert network to 50+ consultants" },
  { year: "2020", title: "Received Green Innovation Award — International Recognition" },
  { year: "2022", title: "Regional offices established across 7 provinces" },
  { year: "2025", title: "Brainbox Strategy 2030 launched" },
];

const vmvPanels: VMVPanel[] = [
  {
    icon: Eye,
    label: "VISION",
    text: "A world where every development actor is empowered with expertise and connections to build prosperous, climate-resilient communities.",
    color: "from-red/20 to-red/5",
  },
  {
    icon: Rocket,
    label: "MISSION",
    text: "To accelerate impact by providing superior technical facilitation, curating knowledge, and connecting a global network of experts.",
    color: "from-gold/20 to-gold/5",
  },
  {
    icon: Gem,
    label: "VALUES",
    text: "Collaboration · Excellence · Localization · Innovation · Integrity",
    color: "from-blue-500/20 to-blue-500/5",
  },
];

const advantages: Advantage[] = [
  {
    num: "01",
    title: "Top-Tier Talent",
    body: "A curated network of multilingual experts from leading global institutions — UN, World Bank, USAID — embedded in Pakistan's development ecosystem.",
    stat: "500+ experts by 2030",
    icon: Users,
  },
  {
    num: "02",
    title: "World-Class Project Management",
    body: "An embedded PMO structure ensuring every engagement is on-time, on-budget, and measurably on-scope. No exceptions.",
    stat: "100% on-scope delivery commitment",
    icon: Target,
  },
  {
    num: "03",
    title: "Unmatched Efficiency",
    body: "Our nationwide presence and 56-hour work week commitment reduces project timelines by up to 40% versus standard delivery.",
    stat: "Up to 40% faster delivery",
    icon: Clock,
  },
];

const corporateProfile: CorporateProfile = {
  left: [
    { label: "Company Registration No", value: "0091921" },
    { label: "Date of Incorporation", value: "February 13, 2015" },
    { label: "Chief Executive Officer", value: "Rookh Niaz Khan" },
    { label: "NTN", value: "7290561-3" },
    { label: "STRN", value: "3277876173903" },
  ],
  right: [
    {
      label: "Registered Address",
      value: "Brainbox House 1359, Street No.02, Sector I-11/2, Islamabad",
    },
    {
      label: "Operating Address",
      value: "Suit No. 03, First Floor, Plaza No. 15, E-11/3 Markaz, Islamabad",
    },
    {
      label: "Bank",
      value: "United Bank Limited (UBL), E-11/3 Markaz Islamabad",
    },
    { label: "IBAN", value: "PK93 UNIL 0109 0002 3230 6161" },
  ],
};

const offices: Office[] = [
  {
    city: "Islamabad",
    region: "Federal Capital",
    focal: "Rookh Niaz Khan",
    contact: "+92 (51) 8445007",
    cx: 118,
    cy: 72,
  },
  {
    city: "Peshawar",
    region: "Khyber Pakhtunkhwa",
    focal: "Ayesha Malik",
    contact: "+92 (91) 5843200",
    cx: 98,
    cy: 58,
  },
  {
    city: "Gilgit",
    region: "Gilgit-Baltistan",
    focal: "Hassan Raza",
    contact: "+92 (5811) 452100",
    cx: 148,
    cy: 38,
  },
  {
    city: "Multan",
    region: "Punjab",
    focal: "Sana Iqbal",
    contact: "+92 (61) 6789000",
    cx: 108,
    cy: 118,
  },
  {
    city: "Sukkur",
    region: "Sindh",
    focal: "Farhan Ali",
    contact: "+92 (71) 5632100",
    cx: 92,
    cy: 138,
  },
  {
    city: "Karachi",
    region: "Sindh",
    focal: "Zainab Hussain",
    contact: "+92 (21) 3456789",
    cx: 78,
    cy: 188,
  },
  {
    city: "Quetta",
    region: "Balochistan",
    focal: "Imran Baloch",
    contact: "+92 (81) 2824500",
    cx: 52,
    cy: 112,
  },
];

// Updated awards with image paths
const awards: Award[] = [
  { 
    id: 1, 
    label: "Appreciation Certificate", 
    aspect: "aspect-[4/5]", 
    icon: Trophy, 
    image: "/images/certificates/4.png",
    description: "For outstanding contributions to development sector"
  },
  { 
    id: 2, 
    label: "Green Innovation Award", 
    aspect: "aspect-[3/4]", 
    icon: Leaf, 
    image: "/images/awards/green_award.jpg",
    description: "International recognition for sustainable development"
  },
  { 
    id: 3, 
    label: "Excellence in MEL", 
    aspect: "aspect-square", 
    icon: BarChart, 
    image: "/images/certificates/6.png",
    description: "Monitoring, Evaluation & Learning excellence"
  },
  { 
    id: 4, 
    label: "Partner Recognition", 
    aspect: "aspect-[4/3]", 
    icon: Handshake, 
    image: "/images/certificates/1.png",
    description: "Recognized by key development partners"
  },
  { 
    id: 5, 
    label: "USAID Appreciation", 
    aspect: "aspect-[3/5]", 
    icon: Star, 
    image: "/images/certificates/2.png",
    description: "USAID Certificate of Appreciation"
  },
  { 
    id: 6, 
    label: "", 
    aspect: "aspect-[4/5]", 
    icon: Globe, 
    image: "/images/certificates/3.png",
    description: "Climate Action & Sustainability recognition"
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
          id="leaf-pattern"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
    </svg>
  );
}

function PakistanMap({ activeOffice, onSelect }: PakistanMapProps) {
  return (
    <motion.div
      className="relative mx-auto max-w-md"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox="0 0 200 230"
        className="mx-auto h-auto w-full max-h-[320px]"
        aria-label="Map of Pakistan showing office locations"
      >
        {/* Simplified Pakistan outline */}
        <path
          d="M155 18 L168 28 L175 45 L170 62 L158 75 L145 82 L138 95 L130 105 L125 118 L118 128 L112 142 L105 155 L98 168 L92 182 L85 195 L78 210 L72 218 L65 212 L58 198 L52 182 L48 165 L45 148 L42 130 L40 112 L42 95 L48 78 L55 62 L62 48 L72 35 L85 25 L100 18 L118 15 L135 14 Z"
          fill="#1A202C"
          stroke="#4A5568"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Province detail lines */}
        <path
          d="M118 128 L125 118 L130 105"
          fill="none"
          stroke="#4A5568"
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />
        <path
          d="M92 182 L98 168 L105 155"
          fill="none"
          stroke="#4A5568"
          strokeWidth="0.75"
          strokeOpacity="0.25"
        />

        {offices.map((office, idx) => (
          <g key={office.city}>
            <circle
              cx={office.cx}
              cy={office.cy}
              r="14"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => onSelect(idx)}
              onMouseLeave={() => onSelect(null)}
              onFocus={() => onSelect(idx)}
              onBlur={() => onSelect(null)}
              tabIndex={0}
              role="button"
              aria-label={`${office.city} — ${office.focal}`}
            />
            <circle
              cx={office.cx}
              cy={office.cy}
              r={activeOffice === idx ? 6 : 4}
              fill="#DC2626"
              className="pointer-events-none transition-all duration-200"
            />
            <circle
              cx={office.cx}
              cy={office.cy}
              r="8"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1"
              strokeOpacity={activeOffice === idx ? 0.6 : 0}
              className="pointer-events-none transition-all duration-200"
            />
            <motion.circle
              cx={office.cx}
              cy={office.cy}
              r="12"
              fill="none"
              stroke="#DC2626"
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: activeOffice === idx ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              opacity={activeOffice === idx ? 0.3 : 0}
            />
          </g>
        ))}
      </svg>

      <AnimatePresence>
        {activeOffice !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="pointer-events-none absolute z-10 rounded-lg bg-charcoal px-4 py-3 text-center shadow-xl"
            style={{
              left: `${(offices[activeOffice].cx / 200) * 100}%`,
              top: `${(offices[activeOffice].cy / 230) * 100}%`,
              transform: "translate(-50%, -130%)",
            }}
          >
            <p className="font-sans text-sm font-bold text-white">
              {offices[activeOffice].focal}
            </p>
            <p className="font-mono text-[10px] text-white/70">
              {offices[activeOffice].contact}
            </p>
            <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-full rotate-45 bg-charcoal" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProfileRow({ label, value, index }: ProfileRowProps) {
  return (
    <motion.div
      variants={slideInFromLeft}
      className="border-b border-charcoal/10 py-4 hover:border-red/30 transition-colors duration-300"
    >
      <dt className="font-mono text-xs text-muted flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red/50" />
        {label}
      </dt>
      <dd className="mt-1 font-sans text-[15px] font-bold text-charcoal">{value}</dd>
    </motion.div>
  );
}

export default function AboutPage() {
  const [activeMapOffice, setActiveMapOffice] = useState<number | null>(null);
  const [lightboxAward, setLightboxAward] = useState<Award | null>(null);

  const storyRef = useScrollReveal();
  const vmvRef = useScrollReveal();
  const advantageRef = useScrollReveal();
  const profileRef = useScrollReveal();
  const mapRef = useScrollReveal();
  const awardsRef = useScrollReveal();

  return (
    <>
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/feature-1.jpg"
            alt="Brainbox Syndicate background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
        </div>
        <LeafPattern />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red"></span>
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-gold">
              WHO WE ARE · SINCE 2008
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-white md:text-[72px]"
          >
            Built on Expertise.
            <br />
            <span className="text-gold">Driven by Impact.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-6 max-w-[600px] font-sans text-lg text-white/75"
          >
            Formally incorporated in 2015, Brainbox Syndicate has been
            Pakistan&apos;s quiet force in sustainable development — trusted by
            the world&apos;s most demanding donors.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — STORY SPLIT */}
      <section ref={storyRef} className="bg-gradient-to-b from-cream to-white px-6 py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left — sticky editorial column */}
          <motion.div
            className="relative lg:col-span-6 lg:sticky lg:top-28 lg:self-start"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span
              className="pointer-events-none absolute -left-2 -top-8 select-none font-serif text-[200px] font-black leading-none text-gold/10"
              aria-hidden="true"
            >
              17
            </span>

            <motion.span
              variants={fadeInUp}
              className="relative block font-mono text-xs font-bold uppercase tracking-widest text-red"
            >
              OUR STORY
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="relative mt-4 font-serif text-3xl font-bold leading-tight text-charcoal md:text-[42px]"
            >
              A Legacy of Driving <span className="text-red">Sustainable Change</span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="relative mt-8 space-y-6"
            >
              <p className="font-sans text-[17px] leading-[1.8] text-[#4B5563]">
                Brainbox Syndicate began in 2008 as a boutique development
                advisory, built on a simple conviction: Pakistan&apos;s most
                complex challenges deserve world-class analytical rigor. Formally
                incorporated in 2015 as Brainbox Syndicate (Private) Limited, the
                firm has grown from a specialist consultancy into one of the
                country&apos;s most trusted development partners.
              </p>
              <p className="font-sans text-[17px] leading-[1.8] text-[#4B5563]">
                Our unique position lies at the intersection of deep local
                expertise and international best practices. We bring the
                methodological precision of global institutions — UN agencies,
                the World Bank, USAID — into contexts where cultural nuance and
                political sensitivity are paramount.
              </p>
              <p className="font-sans text-[17px] leading-[1.8] text-[#4B5563]">
                From flood-affected communities in Sindh to conflict-sensitive
                programming in Khyber Pakhtunkhwa, we work across Pakistan&apos;s
                most challenging environments — delivering evidence that
                informs policy, builds capacity, and accelerates impact.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-10 h-0.5 w-[60px] bg-gradient-to-r from-red to-gold"
            />
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            className="lg:col-span-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ul className="relative ml-4 border-l-2 border-charcoal/20">
              {milestones.map((milestone, idx) => (
                <motion.li
                  key={milestone.year}
                  variants={slideInFromLeft}
                  className="relative mb-10 pl-8 last:mb-0 group"
                >
                  <motion.span
                    className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-charcoal/30 bg-cream transition-all duration-300 group-hover:border-red group-hover:scale-125"
                    whileHover={{ scale: 1.3 }}
                  >
                    <span className="absolute inset-1 rounded-full bg-red" />
                  </motion.span>
                  <span className="font-mono text-sm font-bold text-gold">
                    {milestone.year}
                  </span>
                  <p className="mt-1 font-sans text-[15px] font-bold text-charcoal transition-colors duration-300 group-hover:text-red">
                    {milestone.title}
                  </p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — VISION / MISSION / VALUES */}
      <section ref={vmvRef} className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {vmvPanels.map((panel, idx) => {
              const Icon = panel.icon;
              return (
                <motion.div
                  key={panel.label}
                  variants={fadeInUp}
                  className={`group p-10 transition-all duration-500 hover:bg-white/5 md:p-12 ${idx === 0 ? 'rounded-t-2xl md:rounded-l-2xl md:rounded-t-none' : ''} ${idx === vmvPanels.length - 1 ? 'rounded-b-2xl md:rounded-r-2xl md:rounded-b-none' : ''}`}
                >
                  <motion.div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-gold/20 group-hover:text-gold"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-7 w-7" />
                  </motion.div>
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-gold">
                    {panel.label}
                  </span>
                  <p className="mt-4 font-serif text-[22px] italic leading-[1.5] text-white">
                    {panel.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — THE BRAINBOX ADVANTAGE */}
      <section ref={advantageRef} className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeInUp}
              className="block font-mono text-xs font-bold uppercase tracking-widest text-red"
            >
              WHY BRAINBOX
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 font-serif text-3xl font-bold text-charcoal md:text-[44px]"
            >
              The <span className="text-red">Brainbox Advantage</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="-mx-6 mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mx-0 md:mt-20 md:flex-col md:gap-20 md:overflow-visible md:px-0 md:pb-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {advantages.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.num}
                  variants={fadeInUp}
                  className="min-w-[85vw] shrink-0 snap-center md:min-w-0 md:w-full"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-16">
                    <div className="relative shrink-0">
                      <span
                        className="font-serif text-[80px] font-bold leading-none text-gold/10 md:text-[120px]"
                        aria-hidden="true"
                      >
                        {item.num}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-red/70" />
                        <h3 className="font-serif text-2xl font-bold text-charcoal md:text-[28px]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="max-w-2xl font-sans text-base text-muted leading-relaxed">
                        {item.body}
                      </p>
                      <motion.p
                        className="inline-flex items-center gap-2 font-mono text-xl font-bold text-red"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red" />
                        {item.stat}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — CORPORATE PROFILE */}
      <section ref={profileRef} className="bg-white px-6 py-20 lg:px-8">
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
              Corporate Profile & <span className="text-red">Legal Status</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-sans text-[15px] text-muted"
            >
              Brainbox Syndicate (Pvt.) Limited — a fully registered, tax-compliant
              legal entity.
            </motion.p>

            <motion.dl
              variants={staggerContainer}
              className="mt-12 grid grid-cols-1 gap-x-16 md:grid-cols-2"
            >
              <div>
                {corporateProfile.left.map((row, idx) => (
                  <ProfileRow key={row.label} label={row.label} value={row.value} index={idx} />
                ))}
              </div>
              <div>
                {corporateProfile.right.map((row, idx) => (
                  <ProfileRow key={row.label} label={row.label} value={row.value} index={idx + 5} />
                ))}
              </div>
            </motion.dl>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — GEOGRAPHIC PRESENCE */}
      <section ref={mapRef} className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeInUp}
              className="block font-mono text-xs font-bold uppercase tracking-widest text-gold"
            >
              WHERE WE WORK
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 font-serif text-3xl font-bold text-white md:text-[44px]"
            >
              Nationwide Reach, <span className="text-gold">Local Expertise</span>
            </motion.h2>
          </motion.div>

          <PakistanMap
            activeOffice={activeMapOffice}
            onSelect={setActiveMapOffice}
          />

          <motion.div
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {offices.map((office, idx) => (
              <motion.div
                key={office.city}
                variants={fadeInUp}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-red hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {office.city}
                  </h3>
                  <MapPin className="h-4 w-4 text-gold/50 group-hover:text-gold transition-colors duration-300" />
                </div>
                <p className="mt-1 font-sans text-sm text-white/60">{office.region}</p>
                <p className="mt-3 font-sans text-sm font-medium text-gold">
                  {office.focal}
                </p>
                <p className="mt-1 font-mono text-xs text-white/50">
                  {office.contact}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 — AWARDS & RECOGNITION with Images */}
      <section ref={awardsRef} className="bg-gradient-to-b from-cream to-white px-6 py-20 lg:px-8">
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
              Recognition & <span className="text-red">Certificates</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-sans text-[15px] text-muted"
            >
              Click on any certificate to view it in full detail
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {awards.map((award) => {
              const Icon = award.icon;
              return (
                <motion.button
                  key={award.id}
                  variants={fadeInUp}
                  type="button"
                  onClick={() => setLightboxAward(award)}
                  className={`group relative mb-6 block w-full overflow-hidden rounded-xl ${award.aspect} break-inside-avoid shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full min-h-[220px] w-full bg-gradient-to-br from-charcoal/5 to-charcoal/10">
                    {/* Certificate Image */}
                    <Image
                      src={award.image}
                      alt={award.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Default state - icon and label shown when image is loading or as fallback */}
                    {/* <div clas sName="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-charcoal/5 to-charcoal/10 group-hover:opacity-0 transition-opacity duration-300"> */}
                      {/* <Icon className="h-12 w-12 mb-3 text-charcoal/40 group-hover:text-red/30 transition-colors duration-300" /> */}
                      {/* <span className="font-serif text-sm italic text-muted text-center px-4">
                        {award.label}
                      </span>
                    </div> */}

                    {/* Hover overlay with action prompt */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      initial={false}
                    >
                      <AwardIcon className="h-10 w-10 text-gold mb-3" />
                      <span className="font-mono text-sm font-bold uppercase tracking-widest text-gold">
                        View Certificate
                      </span>
                      {award.description && (
                        <span className="mt-2 font-sans text-xs text-white/70 text-center px-4">
                          {award.description}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Lightbox modal with certificate image */}
      <AnimatePresence>
        {lightboxAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md"
            onClick={() => setLightboxAward(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${lightboxAward.label}`}
          >
            <motion.button
              type="button"
              onClick={() => setLightboxAward(null)}
              className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white z-10"
              aria-label="Close lightbox"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-8 w-8" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] md:aspect-[4/3] w-full">
                <Image
                  src={lightboxAward.image}
                  alt={lightboxAward.label}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">
                      {lightboxAward.label}
                    </h3>
                    {lightboxAward.description && (
                      <p className="mt-1 font-sans text-sm text-white/80">
                        {lightboxAward.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <AwardIcon className="h-6 w-6 text-gold" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}