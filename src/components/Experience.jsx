import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const events = [
  {
    year: '2024',
    title: 'Started Web Development',
    desc: 'Began learning HTML, CSS, and JavaScript. Built small projects to understand core web development concepts, DOM manipulation, and responsive design.',
    accent: '#7c3aed',
  },
  {
    year: '2024',
    title: 'JavaScript Projects',
    desc: 'Developed projects like Tic-Tac-Toe, Music Player, and Weather App, strengthening JavaScript logic, UI design, and frontend development fundamentals.',
    accent: '#3b82f6',
  },
  {
    year: '2025',
    title: 'MERN Stack Development',
    desc: 'Learned MongoDB, Express.js, React.js, and Node.js. Built full-stack applications with authentication, REST APIs, and structured backend architecture.',
    accent: '#10b981',
  },
  {
    year: '2025',
    title: 'Backend & API Development',
    desc: 'Focused on backend systems including JWT authentication, database schema design, API security, and scalable server-side architecture.',
    accent: '#f97316',
  },
  {
    year: '2025',
    title: 'Full Stack Projects',
    desc: 'Built real-world applications like MiniTube and SmartCampus ERP with role-based authentication, attendance systems, result management, and cloud storage integration.',
    accent: '#6366f1',
  },
  {
    year: '2026',
    title: 'Advanced Backend & Real-Time Systems',
    desc: 'Exploring Socket.IO, real-time communication, scalable backend systems, payment integration, and building production-ready MERN applications.',
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
        className="absolute z-10 hidden w-3 h-3 -translate-x-1/2 rounded-full md:block top-6 left-1/2"
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
          className="block mb-2 text-xs font-bold tracking-widest uppercase"
          style={{ color: event.accent }}
        >
          {event.year}
        </span>
        <h3 className="mb-2 text-lg font-semibold text-white">{event.title}</h3>
        <p className="text-sm leading-relaxed text-white/50">{event.desc}</p>
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
    <section id="experience" className="relative px-6 py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-4 font-medium">
            Journey
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            My <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div ref={lineRef} className="relative">
          {/* Center vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-violet-500 to-blue-500"
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
