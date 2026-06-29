import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, Phone, Mail, Globe, ArrowUpRight, 
  Building2, Award, Shield 
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Impact", href: "/impact" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Gallery", href: "/gallery" },
    { name: "Strategy 2030", href: "/strategy" },
    { name: "Team", href: "/team" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Development Advisory", href: "/services#advisory" },
    { name: "Monitoring & Evaluation", href: "/services#mel" },
    { name: "Research & Analytics", href: "/services#research" },
    { name: "Capacity Building", href: "/services#capacity" },
    { name: "Project Management", href: "/services#management" },
  ];

  const socialLinks = [
    { icon: ArrowUpRight, href: "#", label: "LinkedIn" },
    { icon: ArrowUpRight, href: "#", label: "Twitter" },
    { icon: ArrowUpRight, href: "#", label: "YouTube" },
    { icon: ArrowUpRight, href: "#", label: "Facebook" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-charcoal to-[#1A1A1A] text-cream overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red/30 to text-white-transparent" />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-6 lg:col-span-4">
            <Link href="/" className="inline-flex w-fit items-center rounded-xl bg-cream/5 p-4 backdrop-blur-sm border border-cream/10 transition-all hover:bg-cream/10 hover:border-cream/20">
              <Image 
                src="/images/brainbox_Logo.png" 
                alt="Brainbox Syndicate" 
                width={180} 
                height={55} 
                className="h-10 w-auto object-contain brightness-0 invert" 
              />
            </Link>
            
            <p className="max-w-sm font-sans text-sm leading-relaxed text-cream/60">
              Advancing resilient institutions, inclusive growth, and measurable impact since 2008.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red/60" text-white />
                <span className="text-xs text-cream/50">ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-red/60" text-white />
                <span className="text-xs text-cream/50">Certified Partner</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/5 text-cream/50 transition-all hover:bg-red hover:text text-white-charcoal hover:scale-110"
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4 lg:col-span-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-red/80"> text-white
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-1 text-sm text-cream/60 transition-all hover:text-cream hover:translate-x-1"
                  >
                    <span className="h-1 w-1 rounded-full bg-red/0 transition text-white-all group-hover:bg-red/60" text-white />
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col space-y-4 lg:col-span-2">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-red/80"> text-white
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="group inline-flex items-center gap-1 text-sm text-cream/60 transition-all hover:text-cream hover:translate-x-1"
                  >
                    <span className="h-1 w-1 rounded-full bg-red/0 transition text-white-all group-hover:bg-red/60" text-white />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col space-y-4 lg:col-span-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-red/80"> text-white
              Get in Touch
            </h3>
            
            <div className="space-y-5">
              {/* UK Office */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-red/60" text-white />
                  <span className="text-xs font-semibold uppercase tracking-wider text-cream/40">
                    London Office
                  </span>
                </div>
                <ul className="space-y-2 font-sans text-sm text-cream/60">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-red/40" text-white />
                    <span>180 Forest Lane, Forest Gate, London E7 9BB</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-red/40" text-white />
                    <span>+44 7793 003306</span>
                  </li>
                </ul>
              </div>

              {/* Pakistan Office */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-red/60" text-white />
                  <span className="text-xs font-semibold uppercase tracking-wider text-cream/40">
                    Islamabad Office
                  </span>
                </div>
                <ul className="space-y-2 font-sans text-sm text-cream/60">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-red/40" text-white />
                    <span>1359, Street 2, Sector I-11/2, Islamabad</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-red/40" text-white />
                    <span>+92 333 9855932</span>
                  </li>
                </ul>
              </div>

              {/* Contact Details */}
              <div className="pt-2 border-t border-cream/5">
                <ul className="space-y-2 font-sans text-sm text-cream/60">
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-red/40" text-white />
                    <a 
                      href="mailto:niaz@brainbox.com.pk" 
                      className="transition hover:text-red hover:underline text-white underline-offset-2"
                    >
                      niaz@brainbox.com.pk
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="h-4 w-4 shrink-0 text-red/40" text-white />
                    <a 
                      href="https://www.brainbox.com.pk" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="transition hover:text-red hover:underline text-white underline-offset-2"
                    >
                      www.brainbox.com.pk
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-cream/5">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h4 className="font-sans text-sm font-semibold text-cream">
                Stay Updated
              </h4>
              <p className="text-sm text-cream/40">
                Subscribe to our newsletter for the latest insights
              </p>
            </div>
            <form className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 border border-cream/10 focus:border-red/50 focus text-white:outline-none focus:ring-1 focus:ring-red/50 transition text-white-all"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-red px-6 text-white py-3 text-sm font-semibold text-charcoal transition-all hover:bg-red/90 hover text-white:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/5 bg-[#141414]">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-cream/30">
              © 2025 Brainbox Syndicate (Pvt.) Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-cream/30">
              <Link href="/privacy" className="transition hover:text-cream/60">
                Privacy Policy
              </Link>
              <span className="h-3 w-px bg-cream/10" />
              <Link href="/terms" className="transition hover:text-cream/60">
                Terms of Service
              </Link>
              <span className="h-3 w-px bg-cream/10" />
              <Link href="/cookies" className="transition hover:text-cream/60">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}