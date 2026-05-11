'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import Terrain from './Terrain';
import CameraController from './CameraController';
import { SacredRivers } from './SacredRivers';
import { Effects } from './Effects';

export default function CinematicScene() {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-0">
      <Canvas
        camera={{ position: [0, 50, 100], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#02040a']} />
        <fog attach="fog" args={['#02040a', 20, 250]} />
        <ambientLight intensity={0.1} />
        <directionalLight 
          position={[100, 50, -50]} 
          intensity={0.8} 
          color="#FFD700"
          castShadow 
        />
        <pointLight position={[0, 20, 0]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Terrain />
          <SacredRivers />
          
          <Effects />
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
}
