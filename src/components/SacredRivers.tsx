'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

export function SacredRivers() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const riversMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  // River paths representing Alaknanda, Bhagirathi, Mandakini, etc.
  // Using simple tube geometries along curves
  const curves = useMemo(() => {
    // Bhagirathi (from Gangotri)
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-40, 15, 20),
      new THREE.Vector3(-20, 5, 0),
      new THREE.Vector3(0, -1, -20) // Devprayag
    ]);
    
    // Alaknanda (from Badrinath)
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(30, 20, -30),
      new THREE.Vector3(15, 5, -25),
      new THREE.Vector3(0, -1, -20) // Devprayag
    ]);

    // Ganga (from Devprayag onwards)
    const curve3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1, -20),
      new THREE.Vector3(-10, -1.5, -50),
      new THREE.Vector3(0, -2, -100)
    ]);

    // Saraswati (hidden/underground at Mana)
    const curve4 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(35, 18, -35),
      new THREE.Vector3(30, 10, -30), // meet Alaknanda
    ]);

    return { 
      bhagirathi: curve1, 
      alaknanda: curve2, 
      ganga: curve3,
      saraswati: curve4
    };
  }, []);

  useFrame(() => {
    if (riversMaterialRef.current) {
      // Flow effect or glowing effect driven by scroll
      riversMaterialRef.current.opacity = Math.min(1, scrollProgress * 2);
    }
  });

  return (
    <group>
      {/* Rivers have a glacier blue glowing aesthetic */}
      <mesh>
        <tubeGeometry args={[curves.bhagirathi, 64, 0.4, 8, false]} />
        <meshBasicMaterial ref={riversMaterialRef} color="#89cff0" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curves.alaknanda, 64, 0.4, 8, false]} />
        <meshBasicMaterial color="#89cff0" transparent opacity={0.6} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curves.ganga, 64, 0.8, 8, false]} />
        <meshBasicMaterial color="#a0e6ff" transparent opacity={0.8} />
      </mesh>
      
      {/* Saraswati - magical golden underground path */}
      <mesh>
        <tubeGeometry args={[curves.saraswati, 32, 0.2, 8, false]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Point lights at confluences (Prayags) */}
      <pointLight position={[0, 0, -20]} distance={10} intensity={2} color="#89cff0" /> {/* Devprayag */}
      <pointLight position={[30, 10, -30]} distance={10} intensity={1} color="#FFD700" /> {/* Mana / Saraswati confluence */}
    </group>
  );
}
