const TOTAL_FRAMES = 120;
const FRAME_PATH = (n) =>
  `/sequence/ezgif-frame-${String(n).padStart(3, '0')}.png`;

export default function ScrollyCanvas() {
  // Use a single static hero image from the Vite `public/` folder
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
      <img
        src="/phone.jpg"
        alt="Mobile hero background"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        draggable="false"
      />
      <img
        src="/Hero.png"
        alt="Hero background"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        draggable="false"
      />
    </div>
  );
}
