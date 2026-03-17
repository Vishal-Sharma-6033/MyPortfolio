import { useEffect, useRef, useCallback } from 'react';
import { useScroll } from 'framer-motion';

const TOTAL_FRAMES = 120;
const FRAME_PATH = (n) =>
  `/sequence/ezgif-frame-${String(n).padStart(3, '0')}.png`;

export default function ScrollyCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);
  const loadedRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Draw a single frame with object-fit: cover behaviour ──────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover crop
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  // ── Resize canvas to fill viewport ────────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Preload all frames ─────────────────────────────────────────────────────
  useEffect(() => {
    imagesRef.current = [];
    loadedRef.current = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i + 1);
      img.onload = () => {
        loadedRef.current += 1;
        // Render first frame as soon as it loads
        if (i === 0) drawFrame(0);
      };
      imagesRef.current.push(img);
    }
  }, [drawFrame]);

  // ── Respond to scroll progress ─────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const raw = Math.round(v * (TOTAL_FRAMES - 1));
      const index = Math.max(0, Math.min(raw, TOTAL_FRAMES - 1));
      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(index));
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, drawFrame]);

  // ── Handle resize ──────────────────────────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  return (
    /* 500vh parent creates the scroll distance for the sticky canvas */
    <div ref={containerRef} style={{ height: '500vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}
