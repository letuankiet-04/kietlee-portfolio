import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';

export const RequestParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { theme } = useApp();
  const { mouse, viewport } = useThree();

  const count = 1200;

  const [positions, initialPositions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color(theme === 'cyber' ? '#9D4EDD' : theme === 'java' ? '#F89820' : '#6DB33F');
    const c2 = new THREE.Color(theme === 'cyber' ? '#00F5D4' : theme === 'java' ? '#FF5400' : '#00F0FF');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 30 - 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Flow speed in X (streaming requests)
      vel[i * 3] = 0.03 + Math.random() * 0.05;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

      const mixed = c1.clone().lerp(c2, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return [pos, initPos, vel, col];
  }, [theme]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    // Mouse coordinates in 3D world space
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Move particle forward (stream from Left to Right like HTTP request dispatch)
      array[ix] += velocities[ix];
      if (array[ix] > 18) {
        array[ix] = -18;
      }

      // Repel from cursor
      const dx = array[ix] - mouseX;
      const dy = array[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3.5 && dist > 0.001) {
        const force = (3.5 - dist) * 0.04;
        array[ix] += (dx / dist) * force;
        array[iy] += (dy / dist) * force;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
