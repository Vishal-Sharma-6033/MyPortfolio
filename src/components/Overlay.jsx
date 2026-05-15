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
    <div className="flex flex-col items-center gap-1">
      {nameLines.map((line, index) => {
        const typedText =
          index < lineIndex
            ? line
            : index > lineIndex
            ? ''
            : line.slice(0, charIndex);
        const activeLine = index === lineIndex;

        return (
          <div key={line} className="flex items-center justify-center">
            <span className={index === 0 ? 'text-gradient' : 'text-white'}>{typedText}</span>
            {activeLine && (
              <motion.span
                aria-hidden="true"
                className="ml-1 inline-block h-[0.9em] w-[2px] bg-white/80 align-middle"
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
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="text-xs tracking-[0.35em] uppercase text-white/40 mb-4 font-light"
          animate={{ opacity: [0.45, 0.8, 0.45], y: [0, -2, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Creative Developer
        </motion.p>

        <motion.h1
          className="flex flex-col items-center gap-1 text-5xl md:text-7xl xl:text-[8rem] font-black leading-[0.9] tracking-tight"
          animate={{ y: [0, -6, 0], scale: [1, 1.01, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <TypingName />
        </motion.h1>

        <motion.div
          className="flex justify-center gap-2 mt-6"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-8 h-[2px] bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
          <span className="w-3 h-[2px] bg-white/20 rounded-full" />
          <span className="w-3 h-[2px] bg-white/20 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
