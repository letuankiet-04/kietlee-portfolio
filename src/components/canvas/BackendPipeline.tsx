import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';

// Shader code for pulse flow along pipelines
const pipelineVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pipelineFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Flow speed & wave pulse
    float pulse = sin((vUv.x * 24.0) - (uTime * 4.0)) * 0.5 + 0.5;
    pulse = pow(pulse, 3.0); // Make spikes sharp (data packet effect)

    float edgeGlow = sin(vUv.y * 3.14159);
    vec3 baseColor = mix(uColorPrimary * 0.4, uColorSecondary, pulse);
    float alpha = (0.25 + pulse * 0.75) * edgeGlow;

    gl_FragColor = vec4(baseColor, alpha);
  }
`;

export const BackendPipeline: React.FC = () => {
  const { theme } = useApp();
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { colorPrimary, colorSecondary } = useMemo(() => {
    if (theme === 'cyber') {
      return {
        colorPrimary: new THREE.Color('#9D4EDD'),
        colorSecondary: new THREE.Color('#00F5D4'),
      };
    }
    if (theme === 'java') {
      return {
        colorPrimary: new THREE.Color('#F89820'),
        colorSecondary: new THREE.Color('#FF5400'),
      };
    }
    // Spring default
    return {
      colorPrimary: new THREE.Color('#6DB33F'),
      colorSecondary: new THREE.Color('#00F0FF'),
    };
  }, [theme]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorPrimary: { value: colorPrimary },
      uColorSecondary: { value: colorSecondary },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uColorPrimary.value = colorPrimary;
      materialRef.current.uniforms.uColorSecondary.value = colorSecondary;
    }
  });

  // Create curved pipeline paths: Client -> Controller -> Service -> Repo -> DB
  const curves = useMemo(() => {
    return [
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-14, 4, -4),
        new THREE.Vector3(-7, 2, -2),
        new THREE.Vector3(0, 3, -1),
        new THREE.Vector3(7, -1, -3),
        new THREE.Vector3(14, -3, -5),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-12, -4, -3),
        new THREE.Vector3(-5, -2, -1),
        new THREE.Vector3(2, -4, -2),
        new THREE.Vector3(8, 2, -4),
        new THREE.Vector3(15, 3, -6),
      ]),
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, 0, -6),
        new THREE.Vector3(-3, 4, -4),
        new THREE.Vector3(4, 1, -3),
        new THREE.Vector3(11, -3, -5),
      ]),
    ];
  }, []);

  return (
    <group>
      {curves.map((curve, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[curve, 80, 0.08, 12, false]} />
          <shaderMaterial
            ref={idx === 0 ? materialRef : undefined}
            vertexShader={pipelineVertexShader}
            fragmentShader={pipelineFragmentShader}
            uniforms={uniforms}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};
