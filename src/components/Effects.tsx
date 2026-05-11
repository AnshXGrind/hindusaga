'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Effects() {
  const particlesRef = useRef<THREE.Points>(null);

  // Snowfall particles
  const particleCount = 2000;
  
  // Create positions array once outside
  const { geometry } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        // pseudo random based on index wrapper to satisfy strict purity
      const pseudoRandom = () => {
         const x = Math.sin(i * 12.9898) * 43758.5453;
         return x - Math.floor(x);
      };
      const pseudoRandom2 = () => {
         const x = Math.sin(i * 78.233) * 43758.5453;
         return x - Math.floor(x);
      };
      const pseudoRandom3 = () => {
         const x = Math.cos(i * 4.898) * 43758.5453;
         return x - Math.floor(x);
      };
      
      pos[i * 3] = (pseudoRandom() - 0.5) * 100;
      pos[i * 3 + 1] = pseudoRandom2() * 50;
      pos[i * 3 + 2] = (pseudoRandom3() - 0.5) * 100;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return { geometry: geo };
  }, [particleCount]);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Fall down
        posArray[i * 3 + 1] -= delta * 5;
        // Small wind drift
        posArray[i * 3] += Math.sin(state.clock.elapsedTime + i) * delta;
        
        // Reset if below mountain base
        if (posArray[i * 3 + 1] < 0) {
          posArray[i * 3 + 1] = 50;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial 
        size={0.15} 
        color="#ffffff" 
        transparent 
        opacity={0.4}
        sizeAttenuation 
      />
    </points>
  );
}