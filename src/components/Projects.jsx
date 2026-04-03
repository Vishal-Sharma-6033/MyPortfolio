import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: 'Retail Price Comparison Bot',
    description:
      'A full-stack MERN application that helps users find the best prices for products across local shops.',
    tech: ['Node.js', 'API Integration', 'Web Scraping', 'JavaScript'],
    gradient: 'from-green-600/20 to-emerald-900/20',
    accent: '#22c55e',
    github: 'https://github.com/Vishal-Sharma-6033/Retail_price_comparison_bot.git',
  },
  {
    title: 'MiniTube',
    description:
      'MiniTube is a modern backend system designed for a content-sharing and community interaction platform where users can create, publish, and engage with multimedia content in multiple ways.',
    tech: ['Node.js', 'MongoDB', 'Express'],
    gradient: 'from-red-600/20 to-pink-900/20',
    accent: '#ef4444',
    github: 'https://github.com/Vishal-Sharma-6033/MiniTube.git',
  },
  {
    title: 'SmartCampus ERP',
    description:
      'A comprehensive ERP system for educational institutions to manage students, attendance, exams, fees, and administrative operations in one platform.',
    tech: ['MERN Stack', 'Role-Based Access', 'REST APIs', 'JWT Authentication'],
    gradient: 'from-orange-600/20 to-amber-900/20',
    accent: '#f97316',
    github: 'https://github.com/Vishal-Sharma-6033/SmartCampusERP.git',
  },
  {
    title: 'DPI Engine - Deep Packet Inspection System',
    description:
      'Deep Packet Inspection (DPI) is a technology used to examine the contents of network packets as they pass through a checkpoint. Unlike simple firewalls that only look at packet headers (source/destination IP), DPI looks inside the packet payload',
    tech: ['C++', 'PCAP Processing', 'Multi-threading', 'Network Protocol Parsing', 'TLS/SNI Inspection', 'Flow Tracking (Five-Tuple)'],
    gradient: 'from-blue-600/20 to-indigo-900/20',
    accent: '#3b82f6',
    github: 'https://github.com/Vishal-Sharma-6033/DPI-Engine---Deep-Packet-Inspection-System.git',
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
      className="relative flex flex-col overflow-hidden cursor-pointer glass rounded-2xl p-7 group"
      style={{ '--accent': project.accent }}
    >
      {/* Top gradient blob */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-2xl group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${project.accent}30, 0 0 30px ${project.accent}15`,
        }}
      />

      {/* Index number */}
      <span
        className="relative z-10 mb-4 text-5xl font-black select-none opacity-10"
        style={{ color: project.accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <h3 className="relative z-10 mb-3 text-xl font-bold text-white transition-colors group-hover:text-white">
        {project.title}
      </h3>

      <p className="relative z-10 flex-1 mb-6 text-sm leading-relaxed text-white/50">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-xs border rounded-full border-white/10 text-white/50"
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

      {/* GitHub Button */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-flex items-center gap-2 px-4 py-2 transition-all duration-300 border rounded-lg hover:gap-3 w-fit"
        style={{
          borderColor: `${project.accent}50`,
          color: project.accent,
          background: `${project.accent}10`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${project.accent}20`;
          e.currentTarget.style.borderColor = `${project.accent}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `${project.accent}10`;
          e.currentTarget.style.borderColor = `${project.accent}50`;
        }}
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className="text-sm font-medium">View on GitHub</span>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="projects" className="relative px-6 py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-4 font-medium">
            Work
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
