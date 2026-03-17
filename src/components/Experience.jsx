import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const events = [
  {
    year: '2024',
    title: 'Started Web Development',
    desc: 'Began my coding journey with HTML, CSS, and JavaScript. Built foundational projects and developed a strong understanding of how the web works.',
    accent: '#7c3aed',
  },
  {
    year: '2024',
    title: 'Building Real Projects',
    desc: 'Created projects like MiniTube and a Retail Price Comparison Bot, gaining hands-on experience with APIs, backend logic, and real-world problem solving.',
    accent: '#3b82f6',
  },
  {
    year: '2025',
    title: 'Backend & Automation',
    desc: 'Developed Telegram Cloud Vault using Telegram Bot API for cloud storage, improving backend development and automation skills.',
    accent: '#10b981',
  },
  {
    year: '2025',
    title: 'Full-Stack Development',
    desc: 'Built SmartCampus ERP using MERN stack with features like role-based access, student management, and scalable backend architecture.',
    accent: '#f97316',
  },
  {
    year: '2026',
    title: 'Current Focus',
    desc: 'Exploring Next.js, Redis, AI integrations, and cloud platforms to build scalable, high-performance full-stack applications.',
    accent: '#ec4899',
  },
];

function TimelineItem({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex ${isLeft ? 'justify-end md:pr-12' : 'md:pl-12 justify-start'} mb-12`}
      style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}
    >
      {/* Dot */}
      <div
        className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
        style={{
          background: event.accent,
          boxShadow: `0 0 12px ${event.accent}80`,
        }}
      />

      <div
        className={`glass rounded-xl p-6 max-w-sm w-full ${isLeft ? 'md:mr-6' : 'md:ml-6'}`}
        style={{ borderColor: `${event.accent}25` }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase mb-2 block"
          style={{ color: event.accent }}
        >
          {event.year}
        </span>
        <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{event.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.9', 'end 0.1'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-4 font-medium">
            Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div ref={lineRef} className="relative">
          {/* Center vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-violet-500 to-blue-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {events.map((event, i) => (
            <TimelineItem key={i} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
