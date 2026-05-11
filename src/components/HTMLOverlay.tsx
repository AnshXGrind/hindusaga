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
        <motion.div style={{ opacity: opacityIntro }} className="absolute flex flex-col items-center text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-white uppercase drop-shadow-2xl">
            Sacred <span className="text-glacier">Rivers</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light tracking-wide max-w-2xl text-gray-300">
            A cinematic journey through the divine Himalayan river system of India.
          </p>
          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
            <span className="text-xs uppercase tracking-widest text-white/50 block mt-2">Scroll to explore</span>
          </div>
        </motion.div>

        {/* Origins Section */}
        <motion.div style={{ opacity: opacityOrigins }} className="absolute flex flex-col items-start translate-x-[-10vw] md:translate-x-[-20vw] px-4">
          <h2 className="font-serif text-4xl md:text-6xl text-white drop-shadow-lg">
            Origins of the Divine
          </h2>
          <h3 className="text-sacred-gold text-2xl font-serif mt-2">Gangotri & Yamunotri</h3>
          <p className="mt-6 text-md md:text-lg font-light max-w-lg text-gray-300 leading-relaxed border-l border-glacier/30 pl-4">
            High above in the glacial peaks, the Bhagirathi and Yamuna begin their arduous descent. Legend says the Ganges was brought down from the heavens to absolve the sins of mankind.
          </p>
        </motion.div>

        {/* Path of Shiva */}
        <motion.div style={{ opacity: opacityKedarnath }} className="absolute flex flex-col items-end translate-x-[10vw] md:translate-x-[20vw] px-4 text-right">
          <h2 className="font-serif text-4xl md:text-6xl text-white drop-shadow-lg">
            Path of the Ascetics
          </h2>
          <h3 className="text-sacred-gold text-2xl font-serif mt-2">Kedarnath to Badrinath</h3>
          <p className="mt-6 text-md md:text-lg font-light max-w-lg text-gray-300 leading-relaxed border-r border-glacier/30 pr-4">
            The mythical underground Saraswati glows near Mana village, meeting the Alaknanda. Here, silent sages traverse the ancient mountains, a route steeped in primordial mystery.
          </p>
        </motion.div>

        {/* Ethereal Beauty */}
        <motion.div style={{ opacity: opacityValley }} className="absolute flex flex-col items-center text-center px-4">
          <h2 className="font-serif text-4xl md:text-6xl text-white drop-shadow-lg">
            Ethereal Blooms
          </h2>
          <h3 className="text-sacred-gold text-2xl font-serif mt-2">Valley of Flowers & Hemkund Sahib</h3>
          <p className="mt-6 text-md md:text-lg font-light max-w-lg text-gray-300 leading-relaxed">
            By the high glacial lakes, the austere landscape gives way to a vibrant burst of life, a serene pause in the violent geological theater of the Himalayas.
          </p>
        </motion.div>

        {/* The Confluences */}
        <motion.div style={{ opacity: opacityPrayags }} className="absolute flex flex-col items-start translate-x-[-10vw] px-4">
          <h2 className="font-serif text-4xl md:text-6xl text-white drop-shadow-lg">
            The Devine Mergers
          </h2>
          <h3 className="text-sacred-gold text-2xl font-serif mt-2">Panch Prayag</h3>
          <ul className="mt-6 text-md md:text-lg font-light text-gray-300 space-y-4 border-l border-glacier/30 pl-4">
            <li><span className="font-semibold text-white"> विष्णुप्रयाग </span> (Vishnuprayag) - Alaknanda meets Dhauliganga</li>
            <li><span className="font-semibold text-white"> नन्दप्रयाग </span> (Nandaprayag) - Alaknanda meets Nandakini</li>
            <li><span className="font-semibold text-white"> कर्णप्रयाग </span> (Karnaprayag) - Alaknanda meets Pindar</li>
            <li><span className="font-semibold text-white"> रुद्रप्रयाग </span> (Rudraprayag) - Alaknanda meets Mandakini</li>
            <li><span className="font-semibold text-glacier"> देवप्रयाग </span> (Devprayag) - Alaknanda meets Bhagirathi</li>
          </ul>
        </motion.div>

        {/* The Birth of Ganga */}
        <motion.div style={{ opacity: opacityOutro }} className="absolute flex flex-col items-center text-center px-4">
          <h2 className="font-serif text-5xl md:text-7xl text-white drop-shadow-lg">
            Maa Ganga
          </h2>
          <h3 className="text-sacred-gold text-2xl md:text-3xl font-serif mt-4 tracking-widest">
            THE ETERNAL FLOW
          </h3>
          <p className="mt-8 text-md md:text-lg font-light max-w-2xl text-gray-300 leading-relaxed">
            At Devprayag, the fierce Bhagirathi and the calm Alaknanda dissolve their identities. From this sacred union, the Ganga is truly born, descending into the plains to nourish a civilization.
          </p>
          <div className="mt-12 w-px h-24 bg-gradient-to-b from-glacier to-transparent"></div>
        </motion.div>

      </div>
    </div>
  );
}