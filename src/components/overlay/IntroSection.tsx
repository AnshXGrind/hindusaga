'use client';

import { motion, MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Props {
  opacity: MotionValue<number>;
}

export function IntroSection({ opacity }: Props) {
  return (
    <motion.div style={{ opacity }} className="absolute flex flex-col items-center text-center px-4 w-full max-w-5xl">
      <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-[0.15em] text-white uppercase drop-shadow-2xl leading-none">
        Sacred <br className="md:hidden" /><span className="text-glacier">Rivers</span>
      </h1>
      <div className="h-px w-24 bg-glacier/50 mt-8 mb-6"></div>
      <p className="text-lg md:text-2xl font-light tracking-[0.2em] max-w-2xl text-gray-300 uppercase">
        A Cinematic Journey
      </p>
      <div className="mt-20 animate-bounce flex flex-col items-center">
        <ChevronDown className="w-8 h-8 text-white/50 mb-4" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 block">Scroll</span>
      </div>
    </motion.div>
  );
}
