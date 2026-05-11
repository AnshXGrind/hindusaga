'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export default function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const size = 200;
  const segments = 200;

  // Generate a realistic mountainous terrain using noise
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const noise2D = createNoise2D();
    const pos = geo.attributes.position;
    const colorsArray = new Float32Array(pos.count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Multi-layered noise for rugged mountains
      let y = noise2D(x * 0.02, z * 0.02) * 15;
      y += noise2D(x * 0.05, z * 0.05) * 5;
      y += noise2D(x * 0.1, z * 0.1) * 2;
      
      // Make center more mountainous (Himalayas)
      const distToCenter = Math.sqrt(x * x + z * z);
      const mntMask = Math.max(0, 1 - distToCenter / (size * 0.6));
      y *= (1 + mntMask * 2.5);

      if (y < -2) y = -2; // River beds

      pos.setY(i, y);

      // Cinematic dark terrain base
      if (y > 20) {
        // Snow caps
        color.set('#ffffff');
      } else if (y > 8) {
        // Rocky high mountains
        color.set('#1a202c');
      } else if (y > 0) {
        // Lower slopes dark moss/rocks
        color.set('#0f172a');
      } else {
        // River beds
        color.set('#020617');
      }
      
      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    return { geometry: geo, colors: colorsArray };
  }, [size, segments]);

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial 
        vertexColors 
        roughness={0.9} 
        metalness={0.1}
        wireframe={false}
      />
    </mesh>
  );
}