const TOTAL_FRAMES = 120;
const FRAME_PATH = (n) =>
  `/sequence/ezgif-frame-${String(n).padStart(3, '0')}.png`;

export default function ScrollyCanvas() {
  // Use a single static hero image from the Vite `public/` folder
  const lastFrameSrc = '/Hero.png';

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
      <img
        src={lastFrameSrc}
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover"
        draggable="false"
      />
    </div>
  );
}
