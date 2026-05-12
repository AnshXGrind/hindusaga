'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

const riverVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const riverFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uFlowSpeed;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Fluid noise function for realistic water
  float noise(vec2 p) {
    float f = 0.0;
    f += 0.5000 * sin(p.x * 10.0 + uTime * uFlowSpeed) * sin(p.y * 10.0 + uTime * uFlowSpeed);
    f += 0.2500 * sin(p.x * 20.0 - uTime * uFlowSpeed * 1.5) * sin(p.y * 20.0 + uTime * uFlowSpeed * 1.2);
    f += 0.1250 * sin(p.x * 40.0 + uTime * uFlowSpeed * 2.0) * sin(p.y * 40.0 - uTime * uFlowSpeed * 1.8);
    return f * 0.5 + 0.5; // Normalize to 0-1 range
  }

  void main() {
    // Flowing effect with slight lateral sway
    vec2 flowUv = vUv;
    flowUv.x -= uTime * uFlowSpeed;
    flowUv.y += sin(uTime * 0.2) * 0.1;
    
    float n = noise(flowUv * 3.0);
    float edgeMist = smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
    
    // Create a dynamic, shimmering water effect
    vec3 finalColor = mix(uColor * 0.6, uColor * 1.8, n);
    float alpha = uOpacity * edgeMist * (0.4 + n * 0.6);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

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

  const bhagirathiMat = useRef<THREE.ShaderMaterial>(null);
  const alaknandaMat = useRef<THREE.ShaderMaterial>(null);
  const gangaMat = useRef<THREE.ShaderMaterial>(null);

  // River paths representing Alaknanda, Bhagirathi, Mandakini, etc.
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

    return { bhagirathi: curve1, alaknanda: curve2, ganga: curve3, saraswati: curve4 };
  }, []);

  const uniformsBhagi = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#4ac9ff") },
    uOpacity: { value: 0.8 },
    uFlowSpeed: { value: 0.5 }
  }), []);

  const uniformsAlak = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#6ad5ff") },
    uOpacity: { value: 0.8 },
    uFlowSpeed: { value: 0.4 }
  }), []);

  const uniformsGanga = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#89cff0") },
    uOpacity: { value: 1.0 },
    uFlowSpeed: { value: 0.6 }
  }), []);

  useFrame((state) => {
    if (bhagirathiMat.current) bhagirathiMat.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (alaknandaMat.current) alaknandaMat.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (gangaMat.current) gangaMat.current.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Rivers should always be visible, but glow brighter slightly as you scroll
    const intensity = 0.5 + Math.min(0.5, scrollProgress * 1.5);
    if (bhagirathiMat.current) bhagirathiMat.current.uniforms.uOpacity.value = intensity * 0.9;
    if (alaknandaMat.current) alaknandaMat.current.uniforms.uOpacity.value = intensity * 0.9;
    if (gangaMat.current) gangaMat.current.uniforms.uOpacity.value = intensity * 1.0;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curves.bhagirathi, 300, 0.5, 32, false]} />
        <shaderMaterial ref={bhagirathiMat} vertexShader={riverVertexShader} fragmentShader={riverFragmentShader} uniforms={uniformsBhagi} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curves.alaknanda, 300, 0.6, 32, false]} />
        <shaderMaterial ref={alaknandaMat} vertexShader={riverVertexShader} fragmentShader={riverFragmentShader} uniforms={uniformsAlak} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curves.ganga, 450, 1.2, 48, false]} />
        <shaderMaterial ref={gangaMat} vertexShader={riverVertexShader} fragmentShader={riverFragmentShader} uniforms={uniformsGanga} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Saraswati - magical golden underground path */}
      <mesh>
        <tubeGeometry args={[curves.saraswati, 150, 0.3, 16, false]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.4} wireframe />
      </mesh>

      {/* Point lights at confluences (Prayags) */}
      <pointLight position={[0, -1, -20]} distance={15} intensity={3} color="#89cff0" /> {/* Devprayag */}
      <pointLight position={[30, 10, -30]} distance={12} intensity={2} color="#FFD700" /> {/* Mana / Saraswati confluence */}
    </group>
  );
}
