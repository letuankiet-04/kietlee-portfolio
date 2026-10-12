import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vNormal = normal;
    vPosition = position;
    
    float wave = sin(position.x * 3.0 + uTime * 1.5) * 
                 cos(position.y * 3.0 + uTime * 1.5) * 
                 sin(position.z * 3.0 + uTime * 1.5);
                 
    vDisplacement = wave;
    vec3 newPosition = position + normal * (wave * 0.28);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - dot(viewDirection, vNormal);
    fresnel = pow(fresnel, 2.5);

    vec3 colorCore = vec3(0.66, 0.33, 0.97); // Neon Purple
    vec3 colorCyan = vec3(0.02, 0.71, 0.83); // Electric Cyan
    vec3 colorPink = vec3(0.92, 0.28, 0.60); // Cyber Pink

    vec3 mixedColor = mix(colorCore, colorCyan, vDisplacement + 0.5);
    mixedColor += colorPink * fresnel * 1.8;

    gl_FragColor = vec4(mixedColor, 0.85);
  }
`;

export const QuantumSphere: React.FC<{ position?: [number, number, number] }> = ({ position = [0, 0, -2] }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useRef({
    uTime: { value: 0 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1.8, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        wireframe={false}
      />
    </mesh>
  );
};
