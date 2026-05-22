import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const nameLines = ['VISHAL', 'SHARMA'];
const typingSpeed = 110;
const linePause = 1100;

function TypingName() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = nameLines[lineIndex];
    let timeoutId;

    if (charIndex < currentLine.length) {
      timeoutId = window.setTimeout(() => {
        setCharIndex((value) => value + 1);
      }, typingSpeed);
    } else {
      timeoutId = window.setTimeout(() => {
        if (lineIndex === nameLines.length - 1) {
          setLineIndex(0);
          setCharIndex(0);
        } else {
          setLineIndex((value) => value + 1);
          setCharIndex(0);
        }
      }, linePause);
    }

    return () => window.clearTimeout(timeoutId);
  }, [charIndex, lineIndex]);

  return (
    <div className="flex flex-col text-left leading-[0.82] tracking-[-0.05em]">
      {nameLines.map((line, index) => {
        const typedText =
          index < lineIndex
            ? line
            : index > lineIndex
            ? ''
            : line.slice(0, charIndex);

        return (
          <div key={line} className="flex items-center gap-1">
            <span className={index === 0 ? 'text-white' : 'text-gradient'}>{typedText}</span>
            {index === lineIndex && (
              <motion.span
                aria-hidden="true"
                className="inline-block h-[0.9em] w-[2px] bg-white/80 align-middle"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Overlay() {
  return (
    <div className="absolute top-0 left-0 z-10 w-full h-screen pointer-events-none">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/45" />

      <motion.div
        className="absolute left-[5%] top-[16%] max-w-[42rem] px-4 sm:px-0 md:left-[4.5%] md:top-[42%] md:-translate-y-1/2"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="flex flex-col text-left text-[clamp(4rem,10vw,8.5rem)] font-black leading-[0.82] tracking-[-0.05em] drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
        >
          <TypingName />
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

          {/* <div className="flex min-w-[8rem] flex-col gap-3">
            <span className="text-4xl leading-none text-gradient">◌</span>
            <div className="space-y-1">
              <p className="text-[0.82rem] tracking-[0.4em] text-white/88">CREATIVE</p>
              <p className="text-[0.82rem] tracking-[0.35em] text-white/55">DEVELOPER</p>
            </div>
          </div> */}
        </motion.div>
      </motion.div>
    </div>
  );
}
