import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';

export const BackendArchitectureNodes: React.FC = () => {
  const { theme } = useApp();
  const redisRef = useRef<THREE.Mesh>(null!);
  const dockerRef = useRef<THREE.Group>(null!);
  const dbClusterRef = useRef<THREE.Group>(null!);
  const fptServerRef = useRef<THREE.Group>(null!);

  const primaryColor = theme === 'cyber' ? '#9D4EDD' : theme === 'java' ? '#F89820' : '#6DB33F';
  const secondaryColor = theme === 'cyber' ? '#00F5D4' : theme === 'java' ? '#FF5400' : '#00F0FF';

  useFrame((state, delta) => {
    if (dockerRef.current) {
      dockerRef.current.rotation.y += delta * 0.4;
      dockerRef.current.rotation.x += delta * 0.2;
    }
    if (redisRef.current) {
      redisRef.current.rotation.y += delta * 0.8;
      // Pulse emission
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08;
      redisRef.current.scale.set(scale, scale, scale);
    }
    if (dbClusterRef.current) {
      dbClusterRef.current.rotation.y -= delta * 0.3;
    }
    if (fptServerRef.current) {
      fptServerRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group>
      {/* 1. Docker Container Node (Top Left) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={dockerRef} position={[-6.5, 3.2, -4]}>
          <mesh>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color="#0284c7"
              wireframe
              emissive="#0369a1"
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
            <meshStandardMaterial
              color="#38bdf8"
              transparent
              opacity={0.3}
              roughness={0.1}
            />
          </mesh>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.25}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            Docker [Container]
          </Text>
        </group>
      </Float>

      {/* 2. Redis Cache Node - Fast Lane Glowing Crimson (Top Right) */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <group position={[6.8, 2.8, -3]}>
          <mesh ref={redisRef}>
            <octahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial
              color="#dc2626"
              emissive="#ef4444"
              emissiveIntensity={1.8}
              wireframe
            />
          </mesh>
          <pointLight color="#ef4444" intensity={2} distance={5} />
          <Text
            position={[0, -1.3, 0]}
            fontSize={0.25}
            color="#f87171"
            anchorX="center"
            anchorY="middle"
          >
            Redis [Cache Fast-Lane]
          </Text>
        </group>
      </Float>

      {/* 3. Special Station: FPT Software Production Server Beacon (Center Depth) */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <group ref={fptServerRef} position={[0, -1.2, -5.5]}>
          {/* Outer Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.8, 0.05, 16, 64]} />
            <meshStandardMaterial color="#6DB33F" emissive="#6DB33F" emissiveIntensity={1.2} />
          </mesh>
          {/* Server Rack Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 1.8, 0.9]} />
            <meshStandardMaterial
              color="#0d2416"
              emissive="#10b981"
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.15, 1.75, 0.85]} />
            <meshStandardMaterial
              color="#05140b"
              transparent
              opacity={0.8}
            />
          </mesh>
          <pointLight color="#10b981" intensity={3} distance={8} />
          <Text
            position={[0, 1.3, 0]}
            fontSize={0.28}
            color="#34d399"
            anchorX="center"
            anchorY="middle"
          >
            FPT Software [Production Server]
          </Text>
          <Text
            position={[0, -1.3, 0]}
            fontSize={0.18}
            color="#6ee7b7"
            anchorX="center"
            anchorY="middle"
          >
            Internship (04/2026 - 09/2026)
          </Text>
        </group>
      </Float>

      {/* 4. MySQL Database Crystal Cluster (Bottom Right) */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
        <group ref={dbClusterRef} position={[6.2, -3.2, -4]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.85, 0.85, 1.1, 8]} />
            <meshStandardMaterial
              color="#00758F"
              emissive={secondaryColor}
              emissiveIntensity={0.7}
              wireframe
            />
          </mesh>
          <mesh position={[0, 0.85, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.35, 8]} />
            <meshStandardMaterial
              color="#F29111"
              transparent
              opacity={0.8}
              emissive="#F29111"
              emissiveIntensity={0.6}
            />
          </mesh>
          <Text
            position={[0, -1.1, 0]}
            fontSize={0.25}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            MySQL [Relational Schema]
          </Text>
        </group>
      </Float>

      {/* 5. JWT Auth Glowing Security Key (Bottom Left) */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1}>
        <group position={[-6.2, -3, -3]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.65, 0.12, 16, 32]} />
            <meshStandardMaterial
              color={primaryColor}
              emissive={primaryColor}
              emissiveIntensity={1.3}
            />
          </mesh>
          <mesh position={[0.65, -0.65, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[1.0, 0.18, 0.18]} />
            <meshStandardMaterial
              color={primaryColor}
              emissive={primaryColor}
              emissiveIntensity={1.1}
            />
          </mesh>
          <Text
            position={[0, -1.2, 0]}
            fontSize={0.25}
            color={primaryColor}
            anchorX="center"
            anchorY="middle"
          >
            JWT [Auth & Security Key]
          </Text>
        </group>
      </Float>
    </group>
  );
};
