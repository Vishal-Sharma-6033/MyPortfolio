import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const socials = [
  { label: 'GitHub', href: 'https://github.com/Vishal-Sharma-6033', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishal-sharma-a49603315/?skipRedirect=true', icon: 'LI' },
  { label: 'Email', href: 'mailto:vishalsharma952877@gmail.com', icon: '@' },
];

function MagneticButton({ children, href }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setPos({ x, y });
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 glow-accent hover:glow-accent transition-shadow cursor-none"
    >
      {children}
    </motion.a>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-violet-600/8 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-6 font-medium">
            Let's connect
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Let's build something{' '}
            <span className="text-gradient">amazing</span>
            <br />
            together.
          </h2>

          <p className="text-white/40 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Have a project in mind, an opportunity to discuss, or just want to
            say hello? My inbox is always open.
          </p>

          {/* CTA button */}
          <div className="flex justify-center mb-12">
            <MagneticButton href="mailto:vishalsharma952877@gmail.com">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Say Hello
            </MagneticButton>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white/40 hover:text-white hover:border-violet-500/30 transition-colors cursor-none"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
