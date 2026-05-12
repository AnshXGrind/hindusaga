'use client';

import { motion, MotionValue } from 'framer-motion';

interface Props {
  opacity: MotionValue<number>;
}

export function OriginsSection({ opacity }: Props) {
  return (
    <motion.div style={{ opacity }} className="absolute flex flex-col items-start translate-x-[-5vw] md:translate-x-[-15vw] px-6 w-full max-w-2xl">
      <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-4">The Source</h3>
      <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg leading-none mb-6">
        Origins of <br/> the Divine
      </h2>
      <h4 className="text-sacred-gold text-xl md:text-2xl font-serif mb-6">Gangotri & Yamunotri</h4>
      <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed bg-black/40 p-6 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
        High above in the glacial peaks, the Bhagirathi and Yamuna begin their arduous descent. Legend says the Ganges was brought down from the heavens to absolve the sins of mankind.
      </p>
    </motion.div>
  );
}
