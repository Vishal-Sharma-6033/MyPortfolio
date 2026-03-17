import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="relative py-32 px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background blur blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl w-full"
      >
        {/* Label */}
        <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-6 font-medium">
          About me
        </p>

        {/* Card */}
        <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-600/20 to-transparent rounded-bl-full" />

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
            Crafting digital experiences{' '}
            <span className="text-gradient">that matter</span>
          </h2>

          <p className="text-white/60 text-lg leading-relaxed mb-6">
            I'm <span className="text-white font-semibold">Vishal Sharma</span>, a{' '}
            <span className="text-violet-400 font-medium">MERN Stack Developer</span>{' '}
            passionate about building real-world web applications with a razor-sharp
            focus on UI/UX and performance.
          </p>
          <p className="text-white/50 leading-relaxed mb-8">
            From clean, accessible interfaces to scalable backend systems — I enjoy
            turning complex problems into elegant solutions. Every project is an
            opportunity to learn, experiment, and ship something genuinely useful.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Stack', value: 'MERN' },
              { label: 'Focus', value: 'UI & Perf' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-white/30 mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
