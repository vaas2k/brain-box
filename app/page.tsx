"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight, Award, Users, TrendingUp, Shield, Sparkles, LucideIcon } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

// Properly typed AnimatedStat component
interface AnimatedStatProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  isFirstRow?: boolean;
}

function AnimatedStat({
  value,
  label,
  icon: Icon,
  isFirstRow,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const numericPart = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    const duration = 1800;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.floor(easedProgress * numericPart));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericPart);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, numericPart]);

  return (
    <motion.div
      ref={elementRef}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group relative flex flex-col items-center justify-center p-8 text-center transition-all duration-500 hover:scale-105 ${
        isFirstRow ? "border-b border-white/10 lg:border-b-0" : ""
      }`}
    >
      {Icon && (
        <motion.div 
          className="mb-3 rounded-full bg-white/5 p-3 text-gold/60 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-gold"
          whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      )}
      <motion.div 
        className="font-serif font-black text-[64px] text-gold mb-2 tracking-tight leading-none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {hasStarted ? count : 0}
        <span className="text-gold">{suffix}</span>
      </motion.div>
      <div className="font-sans text-sm uppercase tracking-widest text-white/70 max-w-[200px]">
        {label}
      </div>
    </motion.div>
  );
}

// Client interface
interface Client {
  name: string;
  logo: string;
}

// Client Logo Carousel Component
function ClientLogosCarousel() {
  const clients: Client[] = [
    { name: "USAID", logo: "/images/clients/usaid_logo.png" },
    { name: "UN Women", logo: "/images/clients/unwomen_logo.png" },
    { name: "Oxfam", logo: "/images/clients/oxfam_logo.png" },
    { name: "IRC", logo: "/images/clients/irc_logo.png" },
    { name: "UNFAO", logo: "/images/clients/unfao_logo.png" },
    { name: "Islamic Relief", logo: "/images/clients/islamic_relief_logo.png" },
    { name: "PPAF", logo: "/images/clients/ppaf_logo.png" },
    { name: "PRCS", logo: "/images/clients/prcs_logo.png" },
    { name: "World Bank", logo: "/images/clients/world_bank_logo.png" },
    { name: "UNICEF", logo: "/images/clients/unicef_Logo.png" },
  ];

  return (
    <section className="overflow-hidden bg-white py-16 border-y border-charcoal/5">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-widest text-muted">
            Trusted By Leading Organizations
          </span>
          <h3 className="mt-2 font-serif text-2xl font-bold text-charcoal">
            Our Valued Partners & Clients
          </h3>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {clients.map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center justify-center h-16 w-32 bg-gray-50 rounded-lg border border-charcoal/5 p-4">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={100}
                      height={50}
                      className="object-contain max-h-12"
                    />
                  ) : (
                    <span className="font-sans text-sm font-bold text-charcoal/50">
                      {client.name}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
            {/* Duplicate for seamless looping */}
            {clients.map((client, index) => (
              <motion.div
                key={`${client.name}-duplicate-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center justify-center h-16 w-32 bg-gray-50 rounded-lg border border-charcoal/5 p-4">
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={100}
                      height={50}
                      className="object-contain max-h-12"
                    />
                  ) : (
                    <span className="font-sans text-sm font-bold text-charcoal/50">
                      {client.name}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient overlays for smooth fade */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

// Type definitions
interface Service {
  num: string;
  title: string;
  desc: string;
  icon: string;
}

interface Project {
  tag: string;
  org: string;
  title: string;
  desc: string;
  image: string;
}

interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides: string[] = [
    "/images/hero/slide-1.jpg",
    "/images/hero/slide-2.jpg",
    "/images/hero/slide-3.jpg",
    "/images/hero/slide-4.jpg",
    "/images/hero/slide-5.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const section2Ref = useScrollReveal();
  const section3Ref = useScrollReveal();
  const section4Ref = useScrollReveal();
  const section5Ref = useScrollReveal();
  const section6Ref = useScrollReveal();
  const section7Ref = useScrollReveal();
  const section8Ref = useScrollReveal();

  const handleScrollDown = () => {
    const nextSection = document.getElementById("impact-stats");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services: Service[] = [
    {
      num: "01",
      title: "Evidence-Based Research",
      desc: "Rigorous analytical studies grounding every intervention in data",
      icon: "📊",
    },
    {
      num: "02",
      title: "Gender-Responsive Programming",
      desc: "GBV/SEA-sensitive design for equitable development outcomes",
      icon: "⚖️",
    },
    {
      num: "03",
      title: "Climate Resilience Analysis",
      desc: "Environmental assessments for climate-smart, sustainable futures",
      icon: "🌿",
    },
    {
      num: "04",
      title: "WASH & DRR Assessments",
      desc: "Water, sanitation, and disaster risk technical advisory",
      icon: "💧",
    },
    {
      num: "05",
      title: "MEL System Development",
      desc: "Monitoring, evaluation, accountability and learning frameworks",
      icon: "📈",
    },
    {
      num: "06",
      title: "Capacity Building & Training",
      desc: "Empowering CSOs, NGOs, and institutions with lasting skills",
      icon: "🎯",
    },
  ];

  const projects: Project[] = [
    {
      tag: "GENDER",
      org: "IRC · PAKISTAN · 2024",
      title: "Baseline Assessment for Women Entrepreneurs in KP",
      desc: "120+ assessments providing data for climate-resilient business development programs",
      image: "/images/projects/impact1.jpg",
    },
    {
      tag: "CLIMATE",
      org: "UNFAO · SINDH · 2023",
      title: "Climate Resilience Analysis — Sindh Agricultural Zones",
      desc: "Environmental study supporting 40,000+ smallholder farmers in climate adaptation",
      image: "/images/projects/impact2.jpg",
    },
    {
      tag: "MEL",
      org: "OXFAM · PAKISTAN · 2024",
      title: "Third-Party Monitoring — Flood Response Program",
      desc: "Independent evaluation ensuring accountability across 6 provinces",
      image: "/images/projects/impact3.jpg",
    },
  ];

  const trustedPartners: string[] = [
    "USAID",
    "UN Agencies",
    "Oxfam",
    "IRC",
    "UNFAO",
    "Islamic Relief",
    "PPAF",
    "PRCS",
  ];

  const stats: Stat[] = [
    { value: "120+", label: "Baseline Assessments", icon: Award },
    { value: "150+", label: "CSOs Empowered", icon: Users },
    { value: "30+", label: "Impact Evaluations", icon: TrendingUp },
    { value: "17+", label: "Years of Impact", icon: Shield },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1 — FULLSCREEN HERO WITH FRAMER MOTION SLIDESHOW */}
      <section className="relative h-screen w-full overflow-hidden bg-forest text-white">
        {/* Slideshow background with Framer Motion */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false}>
            {slides.map((slide, idx) => (
              idx === activeSlide && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide}
                    alt={`Slideshow image ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/60 to-transparent" />
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(26,60,46,0.4) 100%)`
                  }} />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Hero content */}
        <div className="relative z-30 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-[25px]">
            <div className="max-w-3xl">
              <motion.div
                variants={fadeInLeft}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red"></span>
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-sage">
                  ESTABLISHED 2008 · ISLAMABAD, PAKISTAN
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="mt-8 font-serif text-[48px] font-bold leading-[1.05] tracking-tight text-white md:text-[72px] lg:text-[64px]"
              >
                Driving Sustainable
                <br />
                Development Across
                <br />
                <span className="text-gold relative">
                  Pakistan & Beyond
                  <motion.svg 
                    className="absolute -bottom-2 left-0 w-full" 
                    height="4" 
                    viewBox="0 0 100 4"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <line x1="0" y1="2" x2="100" y2="2" stroke="#C49B3F" strokeWidth="2" strokeDasharray="6 4" />
                  </motion.svg>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="mt-6 max-w-[560px] font-sans text-lg leading-relaxed text-white/80"
              >
                A premier consulting firm specializing in gender equality, green
                innovation, climate resilience, and evidence-driven development
                since 2008.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-red px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-red/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-crimson hover:shadow-xl hover:shadow-red/30"
                >
                  Explore Our Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 font-sans text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 ease-out hover:border-white hover:bg-white/20 hover:-translate-y-1"
                >
                  Our Services
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="mt-12 border-t border-white/20 pt-6"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Trusted By:
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-y-2 font-sans text-sm text-white/70">
                  {trustedPartners.map((partner, index) => (
                    <span key={partner} className="flex items-center transition-colors hover:text-white">
                      {partner}
                      {index < trustedPartners.length - 1 && (
                        <span className="mx-3 font-black text-red">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={handleScrollDown}
          className="absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-white/70 transition-colors duration-200 hover:text-white focus:outline-none"
          aria-label="Scroll to next section"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="mb-1 h-6 w-6" />
          <span className="font-sans text-[10px] uppercase tracking-widest">
            Scroll to explore
          </span>
        </motion.button>

        {/* Slide indicator dots */}
        <div className="absolute bottom-10 right-6 z-30 flex space-x-3 lg:right-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                index === activeSlide
                  ? "w-10 bg-red shadow-lg shadow-red/50"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40 h-[3px] bg-white/10">
          <motion.div 
            key={activeSlide} 
            className="h-full bg-gradient-to-r from-red to-gold"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </div>
      </section>

      {/* SECTION 2 — IMPACT NUMBERS */}
      <section
        id="impact-stats"
        ref={section2Ref}
        className="relative z-30 border-b border-white/10 bg-gradient-to-b from-forest to-forest/95 py-16 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 gap-y-8 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:divide-white/20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                isFirstRow={index < 2}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLIENT LOGOS CAROUSEL SECTION - NEW */}
      <ClientLogosCarousel />

      {/* SECTION 3 — WHO WE ARE */}
      <section ref={section3Ref} className="overflow-hidden bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <motion.div 
            className="space-y-6 lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-red/10 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-red" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-red">
                OUR PURPOSE
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="font-serif text-4xl font-bold leading-[1.1] text-charcoal md:text-[52px]"
            >
              Pakistan&apos;s Most Trusted Partner in 
              <span className="text-red block mt-2">Sustainable Development</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl font-sans text-[17px] leading-[1.8] text-[#4B5563]"
            >
              Brainbox Syndicate is a premier Pakistani consulting firm, formally
              incorporated in 2015, with a legacy of driving change since 2008. We
              specialize in delivering high-impact solutions in complex
              environments — from gender equality and civil society empowerment
              to green innovation and climate resilience.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-3 pt-2"
            >
              <span className="group rounded-full bg-gradient-to-r from-red/10 to-red/5 px-4 py-2 font-mono text-xs font-medium text-red transition-all hover:scale-105 hover:shadow-md">
                🌱 Gender Equality
              </span>
              <span className="group rounded-full bg-gradient-to-r from-gold/10 to-gold/5 px-4 py-2 font-mono text-xs font-medium text-charcoal transition-all hover:scale-105 hover:shadow-md">
                🌍 Green Innovation
              </span>
              <span className="group rounded-full bg-gradient-to-r from-blue-500/10 to-blue-500/5 px-4 py-2 font-mono text-xs font-medium text-blue-600 transition-all hover:scale-105 hover:shadow-md">
                📊 Evidence-Based MEL
              </span>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="pt-4"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-widest text-red transition-all hover:gap-4"
              >
                Read our full story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative lg:col-span-5"
          >
            <div className="relative rotate-1 overflow-hidden rounded-2xl bg-gradient-to-br from-forest to-forest/80 shadow-2xl aspect-[4/5]">
              <div className="flex h-full items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="./images/awards/green_award.jpg" alt="Green Innovation Award" className="h-full w-full object-cover" />
              </div>

              <motion.div 
                className="absolute bottom-6 left-6 -rotate-1 rounded-xl border border-white/10 bg-white/95 p-4 shadow-2xl backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span className="font-serif text-sm font-bold text-charcoal">
                    Green Innovation Award
                  </span>
                </div>
                <p className="font-sans text-xs text-muted">International Recognition</p>
                <div className="mt-2 flex gap-0.5 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — SERVICES */}
      <section ref={section4Ref} className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 flex flex-col justify-between space-y-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <motion.span 
                variants={fadeInUp}
                className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-red"
              >
                WHAT WE DO
              </motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-3xl font-bold leading-tight md:text-[48px]"
              >
                Technical Services That 
                <span className="text-gold block">Drive Impact</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-widest text-sage transition-colors duration-300 hover:text-white"
              >
                View all 14 services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((svc) => (
              <motion.div
                key={svc.num}
                variants={fadeInUp}
                className="group relative cursor-pointer border-t border-white/10 pt-6 transition-all duration-500 ease-out hover:border-red hover:pl-4"
              >
                <div className="absolute -left-4 top-6 text-3xl opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:left-0">
                  {svc.icon}
                </div>
                <span className="font-mono text-sm text-white/30 transition-colors duration-300 ease-out group-hover:text-red">
                  {svc.num}
                </span>
                <h3 className="mt-3 flex items-center font-serif text-[22px] font-bold text-white transition-colors duration-300 ease-out group-hover:text-red">
                  <span>{svc.title}</span>
                  <span className="ml-2 -translate-x-2 text-red opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </h3>
                <p className="mt-2 font-sans text-sm text-white/60">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — FEATURED INSIGHT / QUOTE */}
      <section
        ref={section5Ref}
        className="relative overflow-hidden bg-gradient-to-b from-forest to-forest/90 px-6 py-28 text-center text-white lg:px-8"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/impact-bg.jpg"
            alt="Impact background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 z-10 bg-forest/85" />
        </div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-20 mx-auto max-w-4xl space-y-8"
        >
          <motion.div 
            className="flex justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-full bg-red/20 p-4">
              <svg
                className="h-12 w-12 text-red"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </motion.div>
          <motion.p 
            className="mx-auto max-w-[800px] font-serif text-[32px] italic leading-relaxed text-white md:text-[40px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            &ldquo;We are not direct implementers — we are technical facilitators,
            capacity builders, and knowledge brokers for the organizations
            working on the frontlines of change.&rdquo;
          </motion.p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-red"></div>
            <span className="font-mono text-sm font-semibold uppercase tracking-widest text-gold">
              — Brainbox Strategy 2030
            </span>
            <div className="h-px w-12 bg-red"></div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6 — RECENT WORK / PROJECT HIGHLIGHTS */}
      <section ref={section6Ref} className="bg-gradient-to-b from-cream to-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <motion.span 
                variants={fadeInUp}
                className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-red"
              >
                OUR IMPACT
              </motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-3xl font-bold text-charcoal md:text-[44px]"
              >
                Stories of <span className="text-red">Change</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-widest text-red transition-all hover:gap-4"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((proj) => (
              <motion.div
                key={proj.title}
                variants={fadeInUp}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-forest to-forest/80">
                  {proj.image ? (
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-6xl opacity-20">📋</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 z-20 rounded-full bg-red px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red/20">
                    {proj.tag}
                  </div>
                </div>

                <div className="flex flex-grow flex-col justify-between space-y-4 p-6">
                  <div className="space-y-2">
                    <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                      {proj.org}
                    </span>
                    <h3 className="font-serif text-[20px] font-bold leading-snug text-charcoal transition-colors duration-300 group-hover:text-red">
                      {proj.title}
                    </h3>
                    <p className="line-clamp-2 font-sans text-sm text-muted">
                      {proj.desc}
                    </p>
                  </div>
                  <span className="group inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-red transition-all hover:gap-3">
                    Read more
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7 — PARTNERS MARQUEE */}
      <section
        ref={section7Ref}
        className="overflow-hidden border-y border-charcoal/5 bg-gradient-to-b from-white to-cream py-16"
      >
        <div className="mx-auto mb-8 max-w-7xl px-6 text-center">
          <motion.span 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-block font-mono text-[11px] font-bold uppercase tracking-widest text-muted"
          >
            PARTNERING WITH LEADING ORGANIZATIONS WORLDWIDE
          </motion.span>
        </div>

        <div className="group relative mb-6 w-full overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ display: 'flex' }}
          >
            {[
              "USAID",
              "UN Agencies",
              "Oxfam",
              "Islamic Relief",
              "NCA",
              "RSPN",
              "PPAF",
              "IRC",
              "USAID",
              "UN Agencies",
              "Oxfam",
              "Islamic Relief",
              "NCA",
              "RSPN",
              "PPAF",
              "IRC",
            ].map((partner, idx) => (
              <motion.span
                key={`row1-${idx}`}
                className="mx-8 cursor-pointer font-sans text-[15px] font-medium text-charcoal/50 transition-all duration-300 hover:text-red hover:scale-110"
                whileHover={{ scale: 1.2 }}
              >
                {partner}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="group relative w-full overflow-hidden">
          <motion.div 
            className="flex whitespace-nowrap"
            animate={{ x: [0, 1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ display: 'flex' }}
          >
            {[
              "UNFAO",
              "ACF",
              "PRCS",
              "WHH",
              "Government of Pakistan",
              "World Bank",
              "UNICEF",
              "UNFAO",
              "ACF",
              "PRCS",
              "WHH",
              "Government of Pakistan",
              "World Bank",
              "UNICEF",
            ].map((partner, idx) => (
              <motion.span
                key={`row2-${idx}`}
                className="mx-8 cursor-pointer font-sans text-[15px] font-medium text-charcoal/50 transition-all duration-300 hover:text-red hover:scale-110"
                whileHover={{ scale: 1.2 }}
              >
                {partner}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — CTA BANNER */}
      <section ref={section8Ref} className="relative z-30 bg-gradient-to-br from-red to-red/90 px-6 py-20 text-white lg:px-8 overflow-hidden">
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
              Ready to Accelerate Your Impact?
            </h2>
            <p className="font-sans text-base text-white/80">
              Partner with Pakistan&apos;s most trusted sustainable development firm.
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