'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Effects() {
  const particlesRef = useRef<THREE.Points>(null);

  // Snowfall particles
  const particleCount = 2000;
  const particles = useMemo(() => {
    /* eslint-disable react-hooks/purity */
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
    /* eslint-enable react-hooks/purity */
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Fall down
        positions[i * 3 + 1] -= delta * 5;
        // Small wind drift
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * delta;
        
        // Reset if below mountain base
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 50;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={particles} 
          itemSize={3} 
          args={[particles, 3]}
        />
      </bufferGeometry>
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