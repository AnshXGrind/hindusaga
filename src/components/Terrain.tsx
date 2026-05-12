'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export default function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const size = 300;
  const segments = 300; // Increased resolution for realistic terrain

  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const noise2D = createNoise2D();
    const pos = geo.attributes.position;
    
    // First pass: Generate heights with improved ridged multifractal noise
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      let n = 0;
      let amplitude = 1.2;
      let frequency = 0.015;
      
      // 6 octaves of noise for intricate detail
      for (let o = 0; o < 6; o++) {
        let v = noise2D(x * frequency, z * frequency);
        v = 1.0 - Math.abs(v); // Ridge formation
        v = v * v; // Sharpen ridges
        n += v * amplitude;
        amplitude *= 0.45;
        frequency *= 2.2;
      }
      
      let y = n * 20 - 10;

      // Create a massive central mountain range (Himalayas)
      // We use a combination of radial and linear gradients to shape the range
      const distToCenter = Math.sqrt(x * x + z * z);
      const mntMask = Math.max(0, 1 - distToCenter / (size * 0.7));
      
      // Linear mask to create a valley for the rivers in the center
      const valleyMask = smoothstep(0, 30, Math.abs(x));
      
      y *= (1 + mntMask * 4.0) * (0.2 + valleyMask * 0.8);

      // Deepen river beds
      if (y < -2) {
        y = -2 - Math.abs(y + 2) * 0.3;
      }

      pos.setY(i, y);
    }

    // Compute normals so we can calculate slopes
    geo.computeVertexNormals();
    const normals = geo.attributes.normal;
    const colorsArray = new Float32Array(pos.count * 3);
    const color = new THREE.Color();

    // Helper to add micro-noise to colors
    const colorNoise = createNoise2D();

    // Second pass: Assign realistic colors based on height and slope
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      
      // Calculate slope (normal.y is 1.0 when perfectly flat)
      const ny = normals.getY(i);
      const slope = 1.0 - ny; // 0 is flat, 1 is vertical cliff

      // Add high frequency noise to color mapping to avoid banding
      const cNoise = colorNoise(x * 0.5, z * 0.5) * 2.0;
      const heightVal = y + cNoise;

      if (heightVal > 28) {
        // High altitude
        if (slope > 0.4) {
          // Steep cliff at high altitude - exposed dark rock
          color.set('#2d3748');
        } else {
          // Flat areas at high altitude - deep snow
          color.set('#ffffff');
        }
      } else if (heightVal > 15) {
        // Mid-high altitude
        if (slope > 0.35) {
          // Steep rock
          color.set('#3f3f46');
        } else {
          // Mix of snow and light rock
          color.set('#cbd5e1');
        }
      } else if (heightVal > 5) {
        // Mid altitude
        if (slope > 0.25) {
          // Darker rock cliffs
          color.set('#1e293b');
        } else {
          // Highland moss/sparse grass
          color.set('#3f4e4f');
        }
      } else if (heightVal > -1) {
        // Lowland valleys
        if (slope > 0.2) {
          color.set('#27272a');
        } else {
          // Lush green/brown valleys
          color.set('#1a2e1e');
        }
      } else {
        // River beds
        color.set('#0f172a');
      }
      
      // Randomize slightly for texture
      const tint = 1.0 + (colorNoise(x * 2.0, z * 2.0) * 0.05);
      
      colorsArray[i * 3] = Math.min(1.0, color.r * tint);
      colorsArray[i * 3 + 1] = Math.min(1.0, color.g * tint);
      colorsArray[i * 3 + 2] = Math.min(1.0, color.b * tint);
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    return { geometry: geo };
  }, [size, segments]);

  // Smoothstep function for masking
  function smoothstep(edge0: number, edge1: number, x: number) {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial 
        vertexColors 
        roughness={0.95} 
        metalness={0.05}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}