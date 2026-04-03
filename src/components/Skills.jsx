import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Redis' ] },
  { category: 'Database', items: ['MongoDB'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Vite', 'Postman'] },
];

const featured = [
  { name: 'React', level: 92 },
  { name: 'Next.js', level: 88 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'Redis', level: 75 },
  { name: 'JavaScript', level: 90 },
  { name: 'CSS / Tailwind', level: 92 },
];

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-white/70">{name}</span>
        <span className="font-mono text-xs text-violet-400">{level}%</span>
      </div>
      <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="skills" className="relative px-6 py-32 overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-4 font-medium">
            Skills
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Skill Bars */}
          <div>
            <p className="mb-8 text-xs tracking-widest uppercase text-white/30">Proficiency</p>
            {featured.map((sk, i) => (
              <SkillBar key={sk.name} name={sk.name} level={sk.level} delay={i * 0.08} />
            ))}
          </div>

          {/* Category grid */}
          <div className="grid content-start grid-cols-2 gap-4">
            {skills.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 transition-colors duration-300 glass rounded-xl group hover:border-violet-500/30"
              >
                <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-violet-400">
                  {cat.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs py-1 px-2 rounded-lg bg-white/[0.05] text-white/60 border border-white/[0.06] group-hover:border-violet-500/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
