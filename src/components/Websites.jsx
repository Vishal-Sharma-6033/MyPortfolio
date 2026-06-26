import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const websiteData = [
  {
    title: 'Olivetta – Premium Restaurant',
    description: 'A modern fine-dining restaurant website featuring a cinematic hero section, elegant typography, warm earthy colors, and clear call-to-action buttons for reservations and menu browsing.',
    tech: ['React', 'Framer Motion', 'TailwindCSS', 'Earthy Accents'],
    url: 'olivetta-restaurant.com',
    accent: '#f59e0b', // Amber/gold
    gradient: 'from-amber-600/20 to-amber-950/20',
    images: ['/Websites/A.png', '/Websites/B.png', '/Websites/C.png'],
    captions: ['Cinematic Hero', 'Signature Menu', 'Reservation Portal']
  },
  {
    title: 'Nova AI – AI SaaS Landing Page',
    description: 'A modern AI SaaS landing page featuring a dark futuristic design, bold typography, gradient accents, and a clean waitlist signup interface for showcasing AI-powered products.',
    tech: ['React', 'Vite', 'Framer Motion', 'TailwindCSS'],
    url: 'nova-ai.io',
    accent: '#8b5cf6', // Violet
    gradient: 'from-purple-600/20 to-violet-900/20',
    images: ['/Websites/D.png', '/Websites/E.png', '/Websites/F.png'],
    captions: ['Hero Section', 'Feature Overview', 'Waitlist Signup']
  },
  {
    title: 'Maison – Minimal Fashion Store',
    description: 'A clean and elegant fashion e-commerce landing page featuring minimalist typography, neutral tones, curated product imagery, and a timeless shopping experience.',
    tech: ['React', 'TailwindCSS', 'Framer Motion', 'Minimal UI'],
    url: 'maison-store.com',
    accent: '#e2e8f0', // Slate/stone white
    gradient: 'from-slate-600/20 to-zinc-900/20',
    images: ['/Websites/G.png', '/Websites/H.png', '/Websites/I.png'],
    captions: ['Clean Storefront', 'Seasonal Collections', 'Product View']
  }
];

function WebsiteCard({ site, index }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % site.images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, site.images.length]);

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % site.images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + site.images.length) % site.images.length);
  };

  const goToSlide = (slideIndex, e) => {
    e.stopPropagation();
    setDirection(slideIndex > currentIndex ? 1 : -1);
    setCurrentIndex(slideIndex);
  };

  // Framer Motion variants for slide transition
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col overflow-hidden cursor-default glass rounded-2xl p-5 group"
      style={{ '--accent': site.accent }}
    >
      {/* Background Gradient Blob */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${site.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-2xl group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${site.accent}30, 0 0 30px ${site.accent}15`,
        }}
      />

      {/* Browser Mockup Wrapper */}
      <div className="relative z-10 w-full rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl mb-5 aspect-[16/10] flex flex-col">
        {/* Browser Top Bar */}
        <div className="flex items-center px-4 py-2 bg-black/60 border-b border-white/5 select-none shrink-0 gap-3">
          {/* Controls */}
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          {/* Address Bar */}
          <div className="flex-1 max-w-[280px] mx-auto bg-white/5 rounded-md px-3 py-0.5 text-[10px] text-white/40 text-center font-mono border border-white/5 truncate">
            {site.url}
          </div>
        </div>

        {/* Screen Content Container with Slider */}
        <div className="relative flex-1 w-full bg-[#181818] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={site.images[currentIndex]}
                alt={site.captions[currentIndex]}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption Overlay */}
          <div className="absolute bottom-3 left-3 z-20 bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide text-white/80">
            {site.captions[currentIndex]}
          </div>

          {/* Navigation Arrows (Visible on Hover) */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/90 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/90 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators / Progress Bar Dot Panel */}
          <div className="absolute bottom-3 right-3 z-20 flex gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/5">
            {site.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToSlide(i, e)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex ? 'scale-110' : 'opacity-40 hover:opacity-75'
                }`}
                style={{ backgroundColor: i === currentIndex ? site.accent : '#ffffff' }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Description & Details */}
      <div className="relative z-10 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
          {site.title}
        </h3>
        <p className="text-xs leading-relaxed text-white/50 mb-5 flex-1">
          {site.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {site.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-[10px] font-medium border rounded-full"
              style={{
                background: `${site.accent}12`,
                borderColor: `${site.accent}25`,
                color: site.accent,
              }}
            >
              {t}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

export default function Websites() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="websites" className="relative px-6 py-28 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[300px] bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-blue-400 mb-4 font-semibold">
            Live Projects
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">
            Web <span className="text-gradient">Designs</span>
          </h2>
          <p className="mt-4 text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
            Beautifully crafted, highly interactive website designs featuring clean layouts, pixel-perfect responsiveness, and smooth transitions.
          </p>
        </motion.div>

        {/* Website cards grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {websiteData.map((site, i) => (
            <WebsiteCard key={site.title} site={site} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
