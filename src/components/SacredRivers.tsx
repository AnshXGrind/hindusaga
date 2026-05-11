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
  
  // Sine noise function
  float noise(vec2 p) {
    return sin(p.x * 10.0 + uTime * uFlowSpeed) * sin(p.y * 10.0 + uTime * uFlowSpeed);
  }

  void main() {
    // Flowing effect
    vec2 flowUv = vUv;
    flowUv.x -= uTime * uFlowSpeed;
    
    float n = noise(flowUv * 5.0) * 0.5 + 0.5;
    float edgeMist = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    
    vec3 finalColor = mix(uColor * 0.5, uColor * 1.5, n);
    float alpha = uOpacity * edgeMist * (0.5 + n * 0.5);
    
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
    
    // Fade in rivers based on scroll
    const introFade = Math.min(1, scrollProgress * 2);
    if (bhagirathiMat.current) bhagirathiMat.current.uniforms.uOpacity.value = introFade * 0.8;
    if (alaknandaMat.current) alaknandaMat.current.uniforms.uOpacity.value = introFade * 0.8;
    if (gangaMat.current) gangaMat.current.uniforms.uOpacity.value = introFade * 1.0;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curves.bhagirathi, 100, 0.5, 12, false]} />
        <shaderMaterial ref={bhagirathiMat} vertexShader={riverVertexShader} fragmentShader={riverFragmentShader} uniforms={uniformsBhagi} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curves.alaknanda, 100, 0.6, 12, false]} />
        <shaderMaterial ref={alaknandaMat} vertexShader={riverVertexShader} fragmentShader={riverFragmentShader} uniforms={uniformsAlak} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curves.ganga, 150, 1.2, 16, false]} />
        <shaderMaterial ref={gangaMat} vertexShader={riverVertexShader} fragmentShader={riverFragmentShader} uniforms={uniformsGanga} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      
      {/* Saraswati - magical golden underground path */}
      <mesh>
        <tubeGeometry args={[curves.saraswati, 64, 0.3, 8, false]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.4} wireframe />
      </mesh>

      {/* Point lights at confluences (Prayags) */}
      <pointLight position={[0, -1, -20]} distance={15} intensity={3} color="#89cff0" /> {/* Devprayag */}
      <pointLight position={[30, 10, -30]} distance={12} intensity={2} color="#FFD700" /> {/* Mana / Saraswati confluence */}
    </group>
  );
}
