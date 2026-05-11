import CinematicScene from '@/components/CinematicScene';
import HTMLOverlay from '@/components/HTMLOverlay';

export default function Home() {
  return (
    <main className="relative w-full bg-black font-sans">
      <CinematicScene />
      <HTMLOverlay />
    </main>
  );
}
