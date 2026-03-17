import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: 'MiniTube',
    description:
      'A lightweight video streaming platform inspired by YouTube, featuring video playback, search functionality, and a responsive UI for seamless content browsing.',
    tech: ['Node.js', 'MongoDB', 'Express'],
    gradient: 'from-red-600/20 to-pink-900/20',
    accent: '#ef4444',
  },
  {
    title: 'Retail Price Comparison Bot',
    description:
      'An intelligent bot that compares product prices across multiple platforms in real-time, helping users find the best deals efficiently.',
    tech: ['Node.js', 'API Integration', 'Web Scraping', 'JavaScript'],
    gradient: 'from-green-600/20 to-emerald-900/20',
    accent: '#22c55e',
  },
  {
    title: 'SmartCampus ERP',
    description:
      'A comprehensive ERP system for educational institutions to manage students, attendance, exams, fees, and administrative operations in one platform.',
    tech: ['MERN Stack', 'Role-Based Access', 'REST APIs', 'JWT Authentication'],
    gradient: 'from-orange-600/20 to-amber-900/20',
    accent: '#f97316',
  },
  {
    title: 'Telegram Cloud Vault',
    description:
      'A cloud storage solution using Telegram APIs to securely store and retrieve files using file_id, enabling unlimited and cost-effective storage.',
    tech: ['Node.js', 'Telegram Bot API', 'Cloud Storage'],
    gradient: 'from-blue-600/20 to-indigo-900/20',
    accent: '#3b82f6',
  }
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass rounded-2xl p-7 flex flex-col group cursor-pointer relative overflow-hidden"
      style={{ '--accent': project.accent }}
    >
      {/* Top gradient blob */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px ${project.accent}30, 0 0 30px ${project.accent}15`,
        }}
      />

      {/* Index number */}
      <span
        className="text-5xl font-black opacity-10 mb-4 select-none relative z-10"
        style={{ color: project.accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-white transition-colors">
        {project.title}
      </h3>

      <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1 relative z-10">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50"
            style={{
              background: `${project.accent}15`,
              borderColor: `${project.accent}30`,
              color: project.accent,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-4 font-medium">
            Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
