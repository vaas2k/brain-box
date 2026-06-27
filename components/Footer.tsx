import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Impact", href: "/impact" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Strategy 2030", href: "/strategy" },
    { name: "Team", href: "/team" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col space-y-6 lg:col-span-5">
            <Link href="/" className="inline-flex w-fit items-center rounded-none bg-cream/95 p-3.5 shadow-sm transition hover:bg-cream">
              <Image src="/images/Brainbox_Logo.png" alt="Brainbox Syndicate" width={150} height={46} className="h-9 w-auto object-contain" />
            </Link>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-cream/70">
              Advancing resilient institutions, inclusive growth, and measurable impact since 2008.
            </p>
          </div>

          <div className="flex flex-col space-y-4 lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-cream/70 transition hover:text-gold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-4 lg:col-span-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold">Contact</h3>
            <ul className="space-y-3 font-sans text-sm text-cream/70">
              <li>1359, Street 2, Sector I-11/2, Islamabad</li>
              <li>+92 333 9855932</li>
              <li>
                <a href="mailto:niaz@brainbox.com.pk" className="transition hover:text-gold">
                  niaz@brainbox.com.pk
                </a>
              </li>
              <li>
                <a href="https://www.brainbox.com.pk" target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                  www.brainbox.com.pk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 bg-[#1C1C1C] py-6 text-center text-xs uppercase tracking-[0.25em] text-cream/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p>© 2025 Brainbox Syndicate (Pvt.) Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
