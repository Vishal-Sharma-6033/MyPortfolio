import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] py-10 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-blue-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-white/60">
            Vishal Sharma
          </span>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs text-white/20 text-center"
        >
          © {year} Vishal Sharma — Designed & Built with passion
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-6"
        >
          {[
            { label: 'GitHub', href: 'https://github.com/Vishal-Sharma-6033' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishal-sharma-a49603315/?skipRedirect=true' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-violet-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
