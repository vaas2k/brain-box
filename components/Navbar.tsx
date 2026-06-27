"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 80;

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Impact", href: "/impact" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Strategy 2030", href: "/strategy" },
    { name: "Team", href: "/team" },
    { name: "Clients", href: "/clients" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${
        scrolled 
          ? 'bg-cream/95 shadow-lg backdrop-blur-xl border-b border-charcoal/5' 
          : 'bg-transparent backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center transition-all duration-300 hover:opacity-80"
            >
              {scrolled ? (
                <Image
                  src="/images/Brainbox_logo.png"
                  alt="Brainbox Syndicate"
                  width={170}
                  height={52}
                  className="h-10 w-auto object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/images/Brainbox_logo.png"
                  alt="Brainbox Syndicate"
                  width={170}
                  height={52}
                  className="h-10 w-auto object-contain"
                  priority
                />
              )}
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative py-2 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                    scrolled 
                      ? `text-charcoal/80 hover:text-red ${isActive ? 'text-red' : ''}`
                      : `text-white/90 hover:text-white ${isActive ? 'text-gold' : ''}`
                  }`}
                >
                  <span className="relative">
                    {link.name}
                    <span 
                      className={`absolute left-0 top-full h-[2px] bg-gradient-to-r from-red to-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} 
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-6 py-3 font-sans font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                scrolled 
                  ? 'bg-red text-cream hover:bg-charcoal hover:shadow-red/30' 
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-red hover:border-red hover:shadow-red/30'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center rounded-full p-2.5 transition-all duration-300 focus:outline-none ${
                scrolled 
                  ? 'text-charcoal/80 hover:bg-charcoal/10 hover:text-red' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              } ${isOpen ? 'bg-charcoal/10' : ''}`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-0" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        id="mobile-menu"
      >
        <div 
          className={`px-6 pt-4 pb-8 space-y-1 border-t ${
            scrolled 
              ? 'bg-cream/98 backdrop-blur-xl border-charcoal/5' 
              : 'bg-forest/95 backdrop-blur-xl border-white/5'
          }`}
        >
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                  scrolled
                    ? `text-charcoal/80 hover:bg-charcoal/5 hover:text-red ${isActive ? 'text-red bg-charcoal/5' : ''}`
                    : `text-white/80 hover:bg-white/10 hover:text-white ${isActive ? 'text-gold bg-white/5' : ''}`
                } ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    isActive 
                      ? scrolled ? 'bg-red' : 'bg-gold'
                      : 'bg-transparent'
                  }`} />
                  {link.name}
                </span>
              </Link>
            );
          })}
          
          <div className={`pt-4 px-4 border-t ${
            scrolled ? 'border-charcoal/5' : 'border-white/10'
          }`}>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`w-full text-center block px-6 py-3.5 font-sans font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-red text-cream hover:bg-charcoal'
                  : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-red hover:border-red'
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}