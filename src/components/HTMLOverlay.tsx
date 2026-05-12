'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function HTMLOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Map scroll progress to section opacities
  const opacityIntro = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const opacityOrigins = useTransform(scrollYProgress, [0.15, 0.2, 0.25, 0.3], [0, 1, 1, 0]);
  const opacityKedarnath = useTransform(scrollYProgress, [0.3, 0.35, 0.4, 0.45], [0, 1, 1, 0]);
  const opacityValley = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]);
  const opacityPrayags = useTransform(scrollYProgress, [0.6, 0.65, 0.7, 0.75], [0, 1, 1, 0]);
  const opacityOutro = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative z-10 w-full h-[800vh] pointer-events-none">
      
      {/* Fixed UI container */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none flex flex-col justify-center items-center">
        
        {/* Intro Section */}
        <motion.div style={{ opacity: opacityIntro }} className="absolute flex flex-col items-center text-center px-4 w-full max-w-5xl">
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

        {/* Origins Section */}
        <motion.div style={{ opacity: opacityOrigins }} className="absolute flex flex-col items-start translate-x-[-5vw] md:translate-x-[-15vw] px-6 w-full max-w-2xl">
          <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-4">The Source</h3>
          <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg leading-none mb-6">
            Origins of <br/> the Divine
          </h2>
          <h4 className="text-sacred-gold text-xl md:text-2xl font-serif mb-6">Gangotri & Yamunotri</h4>
          <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed bg-black/40 p-6 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
            High above in the glacial peaks, the Bhagirathi and Yamuna begin their arduous descent. Legend says the Ganges was brought down from the heavens to absolve the sins of mankind.
          </p>
        </motion.div>

        {/* Path of Shiva */}
        <motion.div style={{ opacity: opacityKedarnath }} className="absolute flex flex-col items-end translate-x-[5vw] md:translate-x-[15vw] px-6 text-right w-full max-w-2xl">
          <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-4">The Pilgrimage</h3>
          <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg leading-none mb-6">
            Path of <br/> the Ascetics
          </h2>
          <h4 className="text-sacred-gold text-xl md:text-2xl font-serif mb-6">Kedarnath to Badrinath</h4>
          <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed bg-black/40 p-6 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
            The mythical underground Saraswati glows near Mana village, meeting the Alaknanda. Here, silent sages traverse the ancient mountains, a route steeped in primordial mystery.
          </p>
        </motion.div>

        {/* Ethereal Beauty */}
        <motion.div style={{ opacity: opacityValley }} className="absolute flex flex-col items-center text-center px-6 w-full max-w-2xl">
          <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-4">The Pause</h3>
          <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg leading-none mb-6">
            Ethereal Blooms
          </h2>
          <h4 className="text-sacred-gold text-xl md:text-2xl font-serif mb-6">Valley of Flowers & Hemkund Sahib</h4>
          <p className="text-base md:text-lg font-light text-gray-300 leading-relaxed bg-black/40 p-6 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
            By the high glacial lakes, the austere landscape gives way to a vibrant burst of life, a serene pause in the violent geological theater of the Himalayas.
          </p>
        </motion.div>

        {/* The Confluences */}
        <motion.div style={{ opacity: opacityPrayags }} className="absolute flex flex-col items-start translate-x-[-5vw] md:translate-x-[-15vw] px-6 w-full max-w-2xl">
          <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-4">The Mergers</h3>
          <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg leading-none mb-6">
            Panch Prayag
          </h2>
          <div className="bg-black/40 p-8 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl w-full">
            <ul className="text-sm md:text-base font-light text-gray-300 space-y-5">
              <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-white"></span> <span className="font-serif text-white text-lg">Vishnuprayag</span> <span className="opacity-50 hidden md:inline">- Alaknanda + Dhauliganga</span></li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-white"></span> <span className="font-serif text-white text-lg">Nandaprayag</span> <span className="opacity-50 hidden md:inline">- Alaknanda + Nandakini</span></li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-white"></span> <span className="font-serif text-white text-lg">Karnaprayag</span> <span className="opacity-50 hidden md:inline">- Alaknanda + Pindar</span></li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-white"></span> <span className="font-serif text-white text-lg">Rudraprayag</span> <span className="opacity-50 hidden md:inline">- Alaknanda + Mandakini</span></li>
              <li className="flex items-center gap-4"><span className="w-2 h-2 rounded-full bg-glacier"></span> <span className="font-serif text-glacier text-xl">Devprayag</span> <span className="opacity-50 hidden md:inline">- Alaknanda + Bhagirathi</span></li>
            </ul>
          </div>
        </motion.div>

        {/* The Birth of Ganga */}
        <motion.div style={{ opacity: opacityOutro }} className="absolute flex flex-col items-center text-center px-6 w-full max-w-3xl">
          <h3 className="text-glacier text-sm md:text-base font-sans tracking-[0.4em] uppercase mb-4">The Eternal Flow</h3>
          <h2 className="font-serif text-7xl md:text-9xl text-white drop-shadow-2xl leading-none mb-8">
            Ganga
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent mb-8"></div>
          <p className="text-base md:text-xl font-light text-gray-300 leading-relaxed bg-black/40 p-8 rounded-lg backdrop-blur-md border border-white/10 shadow-2xl">
            At Devprayag, the fierce Bhagirathi and the calm Alaknanda dissolve their identities. From this sacred union, the Ganga is truly born, descending into the plains to nourish a civilization.
          </p>
        </motion.div>

      </div>
    </div>
  );
}