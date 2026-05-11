'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function CameraController() {
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

  useFrame((state, delta) => {
    const offset = scrollProgress;

    // Define camera path waypoints (Drone-style aerial movement)
    const targetPos = new THREE.Vector3(0, 50, 100);
    const targetTarget = new THREE.Vector3(0, 0, 0);

    if (offset < 0.15) {
      targetPos.set(0, 80, 150);
      targetTarget.set(0, 0, 0);
    } else if (offset < 0.3) {
      const t = (offset - 0.15) / 0.15;
      targetPos.lerpVectors(new THREE.Vector3(0, 80, 150), new THREE.Vector3(-40, 30, 20), t);
      targetTarget.lerpVectors(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-30, 0, -20), t);
    } else if (offset < 0.45) {
      const t = (offset - 0.3) / 0.15;
      targetPos.lerpVectors(new THREE.Vector3(-40, 30, 20), new THREE.Vector3(40, 40, -10), t);
      targetTarget.lerpVectors(new THREE.Vector3(-30, 0, -20), new THREE.Vector3(30, 10, -30), t);
    } else if (offset < 0.6) {
      const t = (offset - 0.45) / 0.15;
      targetPos.lerpVectors(new THREE.Vector3(40, 40, -10), new THREE.Vector3(60, 20, -50), t);
      targetTarget.lerpVectors(new THREE.Vector3(30, 10, -30), new THREE.Vector3(50, 5, -80), t);
    } else if (offset < 0.8) {
      const t = (offset - 0.6) / 0.2;
      targetPos.lerpVectors(new THREE.Vector3(60, 20, -50), new THREE.Vector3(10, 15, -40), t);
      targetTarget.lerpVectors(new THREE.Vector3(50, 5, -80), new THREE.Vector3(0, 0, -20), t);
    } else {
      const t = (offset - 0.8) / 0.2;
      targetPos.lerpVectors(new THREE.Vector3(10, 15, -40), new THREE.Vector3(0, 5, 80), t);
      targetTarget.lerpVectors(new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, -100), t);
    }

    state.camera.position.lerp(targetPos, delta * 3);
    
    // Look at target smoothly
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
    currentLookAt.lerp(targetTarget, delta * 3);
    state.camera.lookAt(currentLookAt);
  });

  return null;
}