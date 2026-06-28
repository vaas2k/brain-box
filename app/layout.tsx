import type { Metadata } from "next";
import { Fraunces, DM_Sans, DM_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/app/components/PageTransition";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const baseUrl = new URL("https://www.brainbox.com.pk");

export const metadata: Metadata = {
  title: {
    default: "Brainbox Syndicate | Pakistan's Premier Development Consulting Firm",
    template: "%s | Brainbox Syndicate",
  },
  description:
    "Expert sustainable development consulting — gender equality, green innovation, climate resilience, MEL, and capacity building since 2008.",
  metadataBase: baseUrl,
  viewport: { width: "device-width", initialScale: 1 },
  keywords: [
    "development consulting",
    "gender equality",
    "climate resilience",
    "green innovation",
    "MEL",
    "capacity building",
    "Pakistan consulting",
    "strategic advisory",
  ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brainbox Syndicate",
    description:
      "Expert sustainable development consulting — gender equality, green innovation, climate resilience, MEL, and capacity building since 2008.",
    siteName: "Brainbox Syndicate",
    locale: "en_PK",
    type: "website",
    url: new URL("/", baseUrl),
    images: [
      {
        url: "/images/impact-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Brainbox Syndicate sustainable development consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainbox Syndicate",
    description:
      "Expert sustainable development consulting — gender equality, green innovation, climate resilience, MEL, and capacity building since 2008.",
    images: ["/images/impact-bg.jpg"],
  },
  icons: {
    icon: "/images/icon_logo.ico",
    apple: "/images/icon_logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Brainbox Syndicate",
              url: baseUrl.toString(),
              logo: `${baseUrl.origin}/images/brainbox_Logo.png`,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+92 333 9855932",
                  contactType: "customer service",
                  areaServed: "PK",
                  availableLanguage: ["English"],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable} antialiased min-h-screen flex flex-col bg-cream text-charcoal`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-red focus:px-4 focus:py-2 focus:text-white">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
