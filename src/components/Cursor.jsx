import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      {/* Outer ring — follows with spring lag */}
      <motion.div
        style={{
          translateX: springX,
          translateY: springY,
          x: '-50%',
          y: '-50%',
        }}
        className="custom-cursor fixed top-0 left-0 h-8 w-8 rounded-full border border-white/20 pointer-events-none z-[9998] mix-blend-difference"
      />
      {/* Inner dot — instant */}
      <motion.div
        style={{
          translateX: dotX,
          translateY: dotY,
          x: '-50%',
          y: '-50%',
        }}
        className="custom-cursor fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
}
