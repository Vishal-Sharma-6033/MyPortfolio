import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 flex items-center justify-between transition-all duration-500 rounded-2xl ${
          scrolled ? 'glass py-3 px-6' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-white font-bold text-sm tracking-wide cursor-none"
        >
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-[10px] font-black">
            VS
          </span>
          Vishal Sharma
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors cursor-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="mailto:vishalsharma952877@gmail.com"
          className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-violet-500/50 transition-all duration-300 cursor-none"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 cursor-none"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-full h-[1px] bg-white/60 block"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-full h-[1px] bg-white/60 block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-full h-[1px] bg-white/60 block"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mx-6 mt-2 glass rounded-xl overflow-hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block px-6 py-3 text-sm text-white/60 hover:text-white border-b border-white/[0.06] last:border-0 cursor-none"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
