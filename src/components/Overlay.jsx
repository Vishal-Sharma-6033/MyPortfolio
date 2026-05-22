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
        className="absolute left-4 right-4 top-[calc(18%-1cm)] max-w-none px-0 sm:left-[5%] sm:right-auto sm:top-[16%] sm:max-w-[42rem] md:left-[4.5%] md:top-[42%] md:-translate-y-1/2"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="flex flex-col text-left text-[clamp(2.8rem,15vw,8.5rem)] font-black leading-[0.82] tracking-[-0.05em] drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:text-[clamp(4rem,10vw,8.5rem)]"
        >
          <TypingName />
        </motion.h1>

        <div className="mt-5 space-y-5 sm:hidden">
          <div className="h-[2px] w-20 rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />

          <div className="flex items-start gap-4 text-left text-white/80">
            <div className="flex min-w-[4.5rem] flex-col gap-2">
              <span className="text-2xl leading-none text-gradient">&lt;/&gt;</span>
              <div className="space-y-1">
                <p className="text-[0.62rem] tracking-[0.34em] text-white/90">CREATIVE</p>
                <p className="text-[0.62rem] tracking-[0.3em] text-white/55">DEVELOPER</p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/18" />

            <p className="max-w-[12rem] text-[0.88rem] leading-[1.45] text-white/55">
              I build digital experiences that are fast, modern and impactful.
            </p>
          </div>

          <a
            href="#projects"
            className="pointer-events-auto inline-flex items-center justify-center rounded-xl border border-violet-400/50 px-5 py-3 text-sm font-semibold tracking-[0.2em] text-violet-200 shadow-[0_0_0_1px_rgba(167,139,250,0.08)]"
          >
            VIEW WORK <span className="ml-3 text-lg">→</span>
          </a>
        </div>

        <motion.div
          className="items-start hidden gap-4 mt-6 text-left text-white/80 sm:flex sm:mt-10 sm:gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="flex min-w-[6.5rem] flex-col gap-2 sm:min-w-[8rem] sm:gap-3">
            <span className="text-3xl leading-none text-gradient sm:text-4xl">&lt;/&gt;</span>
            <div className="space-y-1">
              <p className="text-[0.7rem] tracking-[0.3em] text-white/88 sm:text-[0.82rem] sm:tracking-[0.4em]">CREATIVE</p>
              <p className="text-[0.7rem] tracking-[0.28em] text-white/55 sm:text-[0.82rem] sm:tracking-[0.35em]">DEVELOPER</p>
            </div>
          </div>

          <div className="hidden h-[4.5rem] w-px bg-white/18 sm:block" />

          {/* <div className="flex min-w-[8rem] flex-col gap-3">
            <span className="text-4xl leading-none text-gradient">◌</span>
            <div className="space-y-1">
              <p className="text-[0.82rem] tracking-[0.4em] text-white/88">CREATIVE</p>
              <p className="text-[0.82rem] tracking-[0.35em] text-white/55">DEVELOPER</p>
            </div>
          </div> */}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-4 sm:left-auto sm:right-6 md:right-8 lg:right-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col items-center gap-3 text-white/30">
          <div className="w-px h-10 bg-gradient-to-b from-violet-400 to-transparent" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[0.65rem] tracking-[0.45em]">
            SCROLL DOWN
          </span>
          <span className="text-lg leading-none text-white/50">↓</span>
        </div>
      </motion.div>
    </div>
  );
}
