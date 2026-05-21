import { motion } from 'framer-motion';

export default function Overlay() {
  return (
    <div className="absolute top-0 left-0 z-10 w-full h-screen pointer-events-none">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/45" />

      <motion.div
        className="absolute left-[5%] top-[22%] max-w-[42rem] px-4 sm:px-0 md:left-[4.5%] md:top-1/2 md:-translate-y-1/2"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="flex flex-col text-left text-[clamp(4rem,10vw,8.5rem)] font-black leading-[0.82] tracking-[-0.05em] drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
        >
          <span className="text-white">VISHAL</span>
          <span className="text-gradient">SHARMA</span>
        </motion.h1>

        <motion.div
          className="flex items-start gap-8 mt-10 text-left text-white/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="flex min-w-[8rem] flex-col gap-3">
            <span className="text-4xl leading-none text-gradient">&lt;/&gt;</span>
            <div className="space-y-1">
              <p className="text-[0.82rem] tracking-[0.4em] text-white/88">CREATIVE</p>
              <p className="text-[0.82rem] tracking-[0.35em] text-white/55">DEVELOPER</p>
            </div>
          </div>

          <div className="h-[4.5rem] w-px bg-white/18" />

          <div className="flex min-w-[8rem] flex-col gap-3">
            <span className="text-4xl leading-none text-gradient">◌</span>
            <div className="space-y-1">
              <p className="text-[0.82rem] tracking-[0.4em] text-white/88">CREATIVE</p>
              <p className="text-[0.82rem] tracking-[0.35em] text-white/55">DEVELOPER</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
