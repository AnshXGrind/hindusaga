'use client';

import { motion, MotionValue } from 'framer-motion';

interface Props {
  opacity: MotionValue<number>;
}

export function PilgrimageSection({ opacity }: Props) {
  return (
    <motion.div style={{ opacity }} className="absolute flex flex-col items-end translate-x-[5vw] md:translate-x-[15vw] px-6 text-right w-full max-w-2xl">
      <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-4">The Pilgrimage</h3>
      <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg leading-none mb-6">
        Path of <br/> the Ascetics
      </h2>
      <h4 className="text-sacred-gold text-xl md:text-2xl font-serif mb-6">Kedarnath to Badrinath</h4>
      <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed bg-black/40 p-6 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
        The mythical underground Saraswati glows near Mana village, meeting the Alaknanda. Here, silent sages traverse the ancient mountains, a route steeped in primordial mystery.
      </p>
    </motion.div>
  );
}
