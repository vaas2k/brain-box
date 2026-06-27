'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  User, 
  Send, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  AlertCircle,
  LucideIcon
} from 'lucide-react';

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
interface Office {
  city: string;
  contact: string;
  location: string;
}

interface FormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface SubmitStatus {
  type: 'success' | 'error' | null;
  message: string;
}

interface QuickContactCard {
  icon: LucideIcon;
  title: string;
  detail: string;
  label: string;
}

const offices: Office[] = [
  { city: 'Southern Punjab', contact: 'Sajida Hameed', location: 'Multan' },
  { city: 'Peshawar, KP', contact: 'Yasrab Nazir', location: 'Nowshera' },
  { city: 'Sukkur, Sindh', contact: 'Nazeer Ahmed Ujjan', location: 'Sukkur' },
  { city: 'Karachi, Sindh', contact: 'Muhammad Anis Danish', location: 'Karachi' },
  { city: 'Quetta, Balochistan', contact: 'Rabia Zakir', location: 'Quetta' },
  { city: 'Gilgit Baltistan', contact: 'Sadia Kanval', location: 'Gilgit' },
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
          id="leaf-pattern-contact"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-contact)" />
    </svg>
  );
}

export default function ContactPage() {
  const [expandedOffice, setExpandedOffice] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (_error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickContactCards: QuickContactCard[] = [
    { icon: Mail, title: 'Email Us', detail: 'niaz@brainbox.com.pk', label: 'For project inquiries and partnerships' },
    { icon: Phone, title: 'Call Us', detail: '+92 333 9855932', label: 'Weekdays 9am–6pm PKT' },
    { icon: MapPin, title: 'Visit Us', detail: '1359, Street 2, Sector I-11/2, Islamabad', label: 'By appointment' },
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

        <div className="relative mx-auto flex min-h-[55vh] max-w-6xl flex-col justify-center px-6 py-24 text-center lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm mx-auto"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                GET IN TOUCH
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 font-serif text-[42px] font-bold leading-[1.05] tracking-tight text-white sm:text-[56px] lg:text-[64px]"
            >
              Let&apos;s Build Something <span className="text-gold">That Lasts</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/70 sm:text-[18px]"
            >
              Whether you&apos;re exploring a partnership, seeking expert deployment, or joining our network — we&apos;re ready to listen.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — CONTACT FORM & INFO */}
      <section className="bg-gradient-to-b from-white to-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <motion.h2 
                variants={fadeInUp}
                className="font-serif text-[28px] font-bold text-charcoal"
              >
                Send Us a <span className="text-red">Message</span>
              </motion.h2>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">Full Name *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-red/40 focus:ring-2 focus:ring-red/10" 
                    placeholder="John Doe" 
                  />
                </div>
                
                <div>
                  <label className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">Organization</label>
                  <input 
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-red/40 focus:ring-2 focus:ring-red/10" 
                    placeholder="Your Organization" 
                  />
                </div>
                
                <div>
                  <label className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">Email *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1.5 w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-red/40 focus:ring-2 focus:ring-red/10" 
                    placeholder="you@example.com" 
                  />
                </div>
                
                <div>
                  <label className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-red/40 focus:ring-2 focus:ring-red/10" 
                    placeholder="+92 300 1234567" 
                  />
                </div>
                
                <div>
                  <label className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-red/40 focus:ring-2 focus:ring-red/10"
                  >
                    <option>General Inquiry</option>
                    <option>Partnership Opportunity</option>
                    <option>Expert Network</option>
                    <option>Project Collaboration</option>
                    <option>Media &amp; Press</option>
                  </select>
                </div>
                
                <div>
                  <label className="font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-muted">Message *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5} 
                    className="mt-1.5 w-full rounded-[10px] border border-charcoal/15 bg-white px-4 py-3.5 font-sans text-[14px] text-charcoal outline-none transition-all duration-300 focus:border-red/40 focus:ring-2 focus:ring-red/10 resize-none" 
                    placeholder="Tell us about your inquiry..." 
                  />
                </div>
                
                {/* Submit Status */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 rounded-[10px] p-4 ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-sans text-[14px]">{submitStatus.message}</span>
                  </motion.div>
                )}
                
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full rounded-[10px] bg-red px-4 py-4 font-serif text-[18px] font-semibold text-white transition-all duration-300 hover:bg-crimson hover:shadow-lg hover:shadow-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              variants={fadeInUp}
              className="rounded-[20px] bg-gradient-to-br from-cream to-white p-8 border border-charcoal/10 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-red">
                  HEAD OFFICE — ISLAMABAD
                </p>
                <div className="mt-4 space-y-3 font-sans text-[15px] leading-7 text-charcoal">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-red shrink-0 mt-1" />
                    1359 , Street 2 , Sector I-11/2, Islamabad
                  </p>
                  <p className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-red shrink-0 mt-1" />
                    <span>
                      +92 (333) 9855932 | +92 (345) 9793311
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-red shrink-0 mt-1" />
                    niaz@brainbox.com.pk
                  </p>
                </div>
              </div>

              <div className="my-6 h-[2px] w-full bg-gradient-to-r from-red/20 to-gold/20" />

              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-red">
                  KEY CONTACTS
                </p>
                <div className="mt-4 space-y-3 font-sans text-[14px] leading-7 text-charcoal">
                  <div className="rounded-[10px] border border-charcoal/5 bg-white p-3 hover:border-red/20 transition-colors duration-300">
                    <p className="font-semibold">Rookh Niaz Khan</p>
                    <p className="text-muted text-[13px]">CEO — niaz@brainbox.com.pk</p>
                  </div>
                  <div className="rounded-[10px] border border-charcoal/5 bg-white p-3 hover:border-red/20 transition-colors duration-300">
                    <p className="font-semibold">Tasleem Ayaz</p>
                    <p className="text-muted text-[13px]">Principal Consultant — tasleem.ayaz@brainbox.com.pk</p>
                  </div>
                </div>
              </div>

              <div className="my-6 h-[2px] w-full bg-gradient-to-r from-red/20 to-gold/20" />

              <div>
                <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-red">
                  REGIONAL OFFICES
                </p>
                <div className="mt-4 space-y-2">
                  {offices.map((office, index) => {
                    const isOpen = expandedOffice === index;
                    return (
                      <div key={office.city} className="overflow-hidden rounded-[10px] border border-charcoal/10 bg-white transition-all duration-300 hover:border-red/20">
                        <button
                          type="button"
                          onClick={() => setExpandedOffice(isOpen ? null : index)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-red/5 transition-colors duration-200"
                        >
                          <span className="font-sans text-[14px] font-semibold text-charcoal">{office.city}</span>
                          <span className="text-red transition-transform duration-300">
                            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </span>
                        </button>
                        <motion.div 
                          initial={false}
                          animate={{ 
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                            paddingBottom: isOpen ? 16 : 0,
                            paddingLeft: isOpen ? 16 : 0,
                            paddingRight: isOpen ? 16 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden px-0"
                        >
                          <p className="font-sans text-[13px] text-muted flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-red" />
                            {office.contact}
                          </p>
                          <p className="font-sans text-[13px] text-muted flex items-center gap-2 mt-1">
                            <MapPin className="h-3.5 w-3.5 text-red" />
                            {office.location}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — MAP */}
      <section className="bg-gray-50 px-0 py-0">
        <motion.div 
          className="mx-auto max-w-7xl overflow-hidden rounded-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Brainbox Syndicate Office Map"
            src="https://www.google.com/maps?q=33.7294,73.0931&z=14&output=embed"
            className="h-[450px] w-full border-0"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* SECTION 4 — QUICK CONTACT CARDS */}
      <section className="bg-gradient-to-b from-charcoal to-charcoal/95 px-6 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {quickContactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  key={card.title} 
                  variants={fadeInScale}
                  className="group rounded-[16px] border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-xl"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-red/20 group-hover:text-red">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[22px] text-white group-hover:text-gold transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14px] leading-6 text-white/80">{card.detail}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">{card.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}