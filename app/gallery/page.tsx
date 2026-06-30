"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, X, 
  Clock, Camera, Eye, Sparkles, ZoomIn, 
  Share2, Heart, Download,
  Calendar, MapPin, Users, Target, ArrowRight
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
}

// Animation variants matching Impact page
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

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      ease: [0.23, 1, 0.32, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.92, 
    transition: { 
      duration: 0.3, 
      ease: [0.23, 1, 0.32, 1] 
    } 
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const headerVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.1
    }
  }
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
          id="leaf-pattern-gallery"
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
      <rect width="100%" height="100%" fill="url(#leaf-pattern-gallery)" />
    </svg>
  );
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isLiked, setIsLiked] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useScrollReveal();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef:any = useScrollReveal();

  // Initialize gallery images
  useEffect(() => {
    const images: GalleryImage[] = Array.from({ length: 23 }, (_, i) => {
      const categories = ["Community Engagement", "Project Implementation", "Team Collaboration", "Events & Workshops"];
      const locations = ["Islamabad", "Peshawar", "Karachi", "Lahore", "Gilgit", "Quetta"];
      const descriptions = [
        "Community engagement and capacity building initiatives across Pakistan",
        "Project implementation and monitoring with measurable impact",
        "Team collaboration and professional development in action",
        "Event and stakeholder engagement driving positive change",
        "Field work and data collection for evidence-based solutions",
        "Training and knowledge sharing for sustainable development"
      ];
      return {
        id: i + 1,
        src: `/gallery/${i + 1}.jpg`,
        alt: `Gallery image ${i + 1}`,
        // category: categories[i % categories.length],
        date: `202${i % 3 + 2}`,
        // location: locations[i % locations.length],
        // description: descriptions[i % descriptions.length],
      };
    });
    setGalleryImages(images);
    setIsLoadingImages(false);
  }, []);

  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1;
    });
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1;
    });
  }, [galleryImages.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    if (e.key === "ArrowLeft") handlePrevImage();
    if (e.key === "ArrowRight") handleNextImage();
    if (e.key === "Escape") setSelectedImageIndex(null);
  }, [selectedImageIndex, handlePrevImage, handleNextImage]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen bg-cream text-charcoal overflow-hidden">
      {/* SECTION 1 — PAGE HERO - Same as Impact page */}
      <section className="relative isolate overflow-hidden bg-charcoal text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery-banner.jpg"
            alt="Gallery background"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <LeafPattern />

        <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-24 lg:px-8">
          <motion.div 
            className="max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            >
              <Camera className="h-4 w-4 text-gold" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
                GALLERY · VISUAL STORIES
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 font-serif text-[42px] font-bold leading-[1.08] tracking-tight text-white sm:text-[56px] lg:text-[68px]"
            >
              Our Visual <span className="text-gold inline-block">Journey</span>
            </motion.h1>
            <motion.div 
              variants={fadeInUp}
              className="mt-3 h-[2px] w-[180px] overflow-hidden bg-white/20"
            >
              <motion.div 
                className="h-full w-full origin-left bg-gradient-to-r from-red to-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-2xl font-sans text-[16px] leading-7 text-white/80 sm:text-[18px]"
            >
              Explore snapshots of our impactful projects, team moments, and success stories.
              Each image represents our commitment to excellence and positive change across Pakistan.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="mt-8 flex items-center gap-6"
            >
              <span className="flex items-center gap-2 text-sm text-white/40 font-mono">
                <Eye className="h-4 w-4" />
                {galleryImages.length} Images
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-sm text-white/40 font-mono">
                Click any image to explore
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — GALLERY GRID - Clean cream background */}
      <section className="bg-gradient-to-b from-cream to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-serif text-3xl font-bold text-charcoal md:text-[36px]"
            >
              Moments That <span className="text-red">Matter</span>
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="mt-2 font-sans text-muted"
            >
              A collection of images capturing our work and impact across Pakistan
            </motion.p>
          </motion.div>

          {!isLoadingImages ? (
            <motion.div
              ref={gridRef}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
                layout
              >
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    custom={index}
                    variants={scaleIn}
                    layout
                    onClick={() => setSelectedImageIndex(index)}
                    className="group relative cursor-pointer overflow-hidden rounded-[12px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] border border-charcoal/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12),0_16px_40px_rgba(0,0,0,0.10)]"
                  >
                    {/* Image Container */}
                    <div className="relative h-72 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-charcoal/5 to-charcoal/10">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />

                      {/* Gradient Overlay - Same as Impact page cards */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Category Badge - Top */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-charcoal/80 backdrop-blur-sm text-white rounded-full text-xs font-mono tracking-wider border border-white/10">
                          <Sparkles className="h-3 w-3 text-gold" />
                          {image.category}
                        </span>
                      </div>

                      {/* Image Info - Bottom - Slides up on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="text-white">
                              <p className="font-serif text-xl font-bold">
                                {image.category}
                              </p>
                              <p className="text-sm text-white/60 mt-1 line-clamp-2">
                                {image.description}
                              </p>
                            </div>
                            <motion.div
                              className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shrink-0 ml-4"
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
                            >
                              <ZoomIn className="h-4 w-4 text-white" />
                            </motion.div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {image.date}
                            </span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {image.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Shimmer Effect - Same as Impact page */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-72 md:h-80 lg:h-96 rounded-[12px] bg-white/50 border border-charcoal/5 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-full h-full relative bg-gradient-to-br from-charcoal/5 to-charcoal/10 animate-pulse">
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <div className="h-6 w-32 bg-charcoal/10 rounded animate-pulse" />
                      <div className="h-4 w-48 bg-charcoal/5 rounded animate-pulse" />
                      <div className="flex gap-4">
                        <div className="h-3 w-20 bg-charcoal/5 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-charcoal/5 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3 — CTA - Same as Impact page */}
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
              Want to See <span className="text-gold">More?</span>
            </h2>
            <p className="font-sans text-base text-white/80">
              Explore our full portfolio of projects and impact stories.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex shrink-0 flex-col items-center space-y-4"
          >
            <a
              href="/impact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 font-sans text-xs font-bold uppercase tracking-widest text-charcoal shadow-lg transition-all duration-300 hover:bg-forest hover:text-white hover:shadow-2xl hover:-translate-y-1"
            >
              View Our Impact
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="font-mono text-xs tracking-wider text-white/60">
              Or explore our project portfolio
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Lightbox Modal - Same as before but with Impact page styling */}
      <AnimatePresence>
        {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 bg-charcoal/98 z-40 backdrop-blur-2xl"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
            >
              <div 
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute -top-16 right-0 text-white/50 hover:text-white transition-colors duration-200 z-50"
                  aria-label="Close gallery"
                >
                  <X className="h-8 w-8" />
                </motion.button>

                {/* Image */}
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="relative w-full aspect-[4/3] bg-black/50 rounded-2xl overflow-hidden shadow-2xl border border-white/5"
                >
                  <Image
                    src={galleryImages[selectedImageIndex].src}
                    alt={galleryImages[selectedImageIndex].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 90vw, 100vw"
                    priority
                  />

                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/95 via-charcoal/70 to-transparent p-8 pt-20">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl text-white">
                          {galleryImages[selectedImageIndex].category || "Gallery Image"}
                        </h3>
                        {galleryImages[selectedImageIndex].description && (
                          <p className="text-white/60 text-sm max-w-xl">
                            {galleryImages[selectedImageIndex].description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-white/40">
                          {galleryImages[selectedImageIndex].date && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {galleryImages[selectedImageIndex].date}
                            </span>
                          )}
                          {galleryImages[selectedImageIndex].location && (
                            <>
                              <span className="w-px h-3 bg-white/10" />
                              <span className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                {galleryImages[selectedImageIndex].location}
                              </span>
                            </>
                          )}
                          <span className="w-px h-3 bg-white/10" />
                          <span>{selectedImageIndex + 1} / {galleryImages.length}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsLiked(isLiked === selectedImageIndex ? null : selectedImageIndex)}
                          className={`h-10 w-10 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all ${
                            isLiked === selectedImageIndex 
                              ? 'bg-red-500/20 border-red-500/30 text-red-500'
                              : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isLiked === selectedImageIndex ? 'fill-red-500' : ''}`} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-10 w-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Share2 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="h-10 w-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Download className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.button
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevImage}
                  className={`
                    absolute left-4 top-1/2 -translate-y-1/2 
                    h-14 w-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10
                    flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10
                    transition-all duration-300
                    ${isHovering ? 'opacity-100' : 'opacity-0 md:opacity-0'}
                    hover:opacity-100
                  `}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextImage}
                  className={`
                    absolute right-4 top-1/2 -translate-y-1/2 
                    h-14 w-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10
                    flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10
                    transition-all duration-300
                    ${isHovering ? 'opacity-100' : 'opacity-0 md:opacity-0'}
                    hover:opacity-100
                  `}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>

                {/* Keyboard Instructions */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/20 font-mono text-xs">
                  <span className="flex items-center gap-2">
                    <kbd className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px]">←</kbd>
                    <kbd className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px]">→</kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="w-px h-3 bg-white/5" />
                  <span className="flex items-center gap-2">
                    <kbd className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px]">ESC</kbd>
                    <span>Close</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}