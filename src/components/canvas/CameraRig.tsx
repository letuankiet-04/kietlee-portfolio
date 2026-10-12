import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';

export const CameraRig: React.FC = () => {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = totalScroll > 0 ? window.scrollY / totalScroll : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const mouseX = state.mouse.x * 0.8;
    const mouseY = state.mouse.y * 0.5;

    const targetZ = 6 - scrollProgress.current * 18;
    const targetY = -scrollProgress.current * 10 + mouseY;
    const targetX = Math.sin(scrollProgress.current * Math.PI * 2) * 2 + mouseX;

    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    state.camera.lookAt(0, targetY * 0.5, targetZ - 5);
  });

  return null;
};
