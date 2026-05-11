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

      // Advanced Ridged multifractal style noise for sharper peaks
      let n = 0;
      let amplitude = 1;
      let frequency = 0.02;
      for (let o = 0; o < 5; o++) {
        let v = noise2D(x * frequency, z * frequency);
        v = 1.0 - Math.abs(v); // Ridge formation
        v = v * v; // Sharpen ridges
        n += v * amplitude;
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      
      let y = n * 18 - 8;

      // Make center more mountainous (Himalayas)
      const distToCenter = Math.sqrt(x * x + z * z);
      const mntMask = Math.max(0, 1 - distToCenter / (size * 0.8));
      y *= (1 + mntMask * 3.0);

      // Deepen valleys for rivers
      if (y < -4) y = -4 - Math.abs(y + 4) * 0.2;

      pos.setY(i, y);

      // Cinematic terrain base colors based on height and slope
      // A quick pseudo-slope check using surrounding noise wasn't done for performance, relying on height
      if (y > 25) {
        // Deep snow
        color.set('#f8f9fa');
      } else if (y > 15) {
        // Icy rock
        color.set('#94a3b8');
      } else if (y > 5) {
        // Dark highland rock
        color.set('#1e293b');
      } else if (y > -2) {
        // Mossy/dirt slopes
        color.set('#0f172a');
      } else {
        // River beds and deep glacial valleys
        color.set('#020617');
      }
      
      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    return { geometry: geo };
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