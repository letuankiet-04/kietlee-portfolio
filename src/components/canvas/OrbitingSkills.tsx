import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_CATEGORIES } from '../../data/portfolio';

export const OrbitingSkills: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  // Flatten skills with high levels for the 3D orbit
  const orbitSkills = SKILL_CATEGORIES.flatMap((cat) => cat.skills).filter((s) => s.highlight || s.level >= 88);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group position={[0, -10, 0]}>
      <group ref={groupRef}>
        {orbitSkills.map((skill, index) => {
          const angle = (index / orbitSkills.length) * Math.PI * 2;
          const radius = 6.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(index * 1.6) * 1.2;

          const color = skill.highlight ? '#6DB33F' : '#00F0FF';

          return (
            <Float key={skill.name} speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
              <group position={[x, y, z]}>
                <mesh>
                  <octahedronGeometry args={[0.35, 0]} />
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.4}
                    wireframe
                  />
                </mesh>
                <Text
                  position={[0, 0.6, 0]}
                  fontSize={0.24}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                >
                  {skill.name}
                </Text>
              </group>
            </Float>
          );
        })}
      </group>
    </group>
  );
};
