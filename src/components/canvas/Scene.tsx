import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { BackendPipeline } from './BackendPipeline';
import { RequestParticles } from './RequestParticles';
import { BackendArchitectureNodes } from './BackendArchitectureNodes';
import { CameraRig } from './CameraRig';
import { useApp } from '../../context/AppContext';

export const Scene: React.FC = () => {
  const { theme } = useApp();

  const bgColor = theme === 'cyber' ? '#04000C' : theme === 'java' ? '#080402' : '#030708';
  const lightColor1 = theme === 'cyber' ? '#9D4EDD' : theme === 'java' ? '#F89820' : '#6DB33F';
  const lightColor2 = theme === 'cyber' ? '#00F5D4' : theme === 'java' ? '#FF5400' : '#00F0FF';

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        <color attach="background" args={[bgColor]} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 8, 5]} color={lightColor1} intensity={2.5} />
        <pointLight position={[-10, -8, -3]} color={lightColor2} intensity={2} />

        <Suspense fallback={null}>
          <CameraRig />
          <RequestParticles />
          <BackendPipeline />
          <BackendArchitectureNodes />
        </Suspense>

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.001, 0.001)}
            radialModulation={true}
            modulationOffset={0.5}
          />
          <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
