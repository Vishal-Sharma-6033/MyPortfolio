import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const lines = [
  {
    text: null,
    sub: null,
    hero: true,
    start: 0,
    end: 0.18,
    align: 'center',
  },
  {
    text: 'I craft immersive\nweb experiences',
    sub: 'Scroll to explore',
    hero: false,
    start: 0.2,
    end: 0.42,
    align: 'center',
  },
  {
    text: 'Building with React,\nNode & modern tools',
    sub: 'Full-stack developer',
    hero: false,
    start: 0.45,
    end: 0.65,
    align: 'left',
  },
  {
    text: 'Bridging design,\nperformance & engineering',
    sub: 'Pixel-perfect • Blazing fast',
    hero: false,
    start: 0.68,
    end: 0.88,
    align: 'right',
  },
];

function useOpacity(scrollYProgress, start, end) {
  const fadeIn = start + 0.04;
  const fadeOut = end - 0.04;
  return useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );
}

function useY(scrollYProgress, start, end) {
  return useTransform(
    scrollYProgress,
    [start, end],
    ['24px', '-24px']
  );
}

function StoryLine({ line, scrollYProgress }) {
  // Always call all hooks unconditionally (Rules of Hooks)
  const normalOpacity = useOpacity(scrollYProgress, line.start, line.end);
  const heroOpacity   = useTransform(
    scrollYProgress,
    [0, line.end - 0.04, line.end],
    [1, 1, 0]
  );
  const normalY = useY(scrollYProgress, line.start, line.end);
  const heroY   = useTransform(scrollYProgress, [0, line.end], ['0px', '-24px']);

  const opacity = line.hero ? heroOpacity : normalOpacity;
  const y       = line.hero ? heroY       : normalY;

  const alignClass =
    line.align === 'left'
      ? 'items-start text-left pl-8 md:pl-24'
      : line.align === 'right'
      ? 'items-end text-right pr-8 md:pr-24'
      : 'items-center text-center';

  if (line.hero) {
    return (
      <motion.div
        style={{ opacity, y }}
        className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none`}
      >
        <motion.p
          className="text-xs tracking-[0.35em] uppercase text-white/40 mb-4 font-light"
        >
          Creative Developer
        </motion.p>
        <h1 className="text-6xl md:text-8xl xl:text-[9rem] font-black leading-none tracking-tight">
          <span className="text-gradient">Vishal</span>
          <br />
          <span className="text-white">Sharma</span>
        </h1>
        <motion.div className="mt-6 flex gap-2 justify-center">
          <span className="w-8 h-[2px] bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
          <span className="w-3 h-[2px] bg-white/20 rounded-full" />
          <span className="w-3 h-[2px] bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none px-6 md:px-0`}
    >
      <h2 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight text-white max-w-xl">
        {line.text?.split('\n').map((t, i) => (
          <span key={i} className="block">
            {i === 0 ? t : <span className="text-gradient">{t}</span>}
          </span>
        ))}
      </h2>
      {line.sub && (
        <p className="mt-4 text-sm tracking-widest uppercase text-white/30 font-light">
          {line.sub}
        </p>
      )}
    </motion.div>
  );
}

export default function Overlay() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        {/* Gradient vignette for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none z-0" />

        {lines.map((line, i) => (
          <StoryLine key={i} line={line} scrollYProgress={scrollYProgress} />
        ))}

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
