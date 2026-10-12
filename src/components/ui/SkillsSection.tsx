import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import {
  Cpu,
  Server,
  Terminal,
  Database,
  Layers,
  Cloud,
  Orbit,
  Sun,
  Sparkles,
  Info,
} from 'lucide-react';
import { SKILL_CATEGORIES, ORBIT_SKILLS, OrbitSkillNode } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';

// 3D Orbit Canvas Sub-components
interface OrbitMeshProps {
  node: OrbitSkillNode;
  isHovered: boolean;
  onHover: (node: OrbitSkillNode | null) => void;
  lang: 'vi' | 'en';
}

const SunNode: React.FC<OrbitMeshProps> = ({ node, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (node.name === 'Java' ? 0.4 : -0.35);
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5 + (node.name === 'Java' ? 0 : 1.5)) * 0.05;
      const targetScale = isHovered ? 1.4 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(pulse * targetScale, pulse * targetScale, pulse * targetScale), 0.1);
    }
  });

  const posX = node.name === 'Java' ? -0.85 : 0.85;

  return (
    <group
      position={[posX, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
      }}
    >
      {/* Outer Halo */}
      <mesh>
        <sphereGeometry args={[node.size * 1.35, 24, 24]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.18} />
      </mesh>

      {/* Sun Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 3.0 : 2.2}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, node.size + 0.35, 0]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {node.name}
      </Text>
    </group>
  );
};

const OrbitingBodyNode: React.FC<
  OrbitMeshProps & { angleOffset: number; isPaused: boolean }
> = ({ node, isHovered, onHover, angleOffset, isPaused }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef<number>(angleOffset);

  useFrame((_, delta) => {
    if (!isPaused) {
      angleRef.current += delta * node.speed;
    }
    if (groupRef.current) {
      const x = Math.cos(angleRef.current) * node.orbitRadius;
      const z = Math.sin(angleRef.current) * node.orbitRadius;
      const y = Math.sin(angleRef.current * 2) * 0.35;
      groupRef.current.position.set(x, y, z);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 1.2;
      meshRef.current.rotation.x += delta * 0.6;
      const targetScale = isHovered ? 1.45 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
      }}
    >
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Glow Aura */}
        <mesh>
          <sphereGeometry args={[node.size * 1.3, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={isHovered ? 0.35 : 0.12} />
        </mesh>

        {/* Planet / Satellite Body */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[node.size, 1]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 2.5 : 1.6}
            wireframe={node.category === 'satellite'}
            roughness={0.1}
          />
        </mesh>

        <Text
          position={[0, node.size + 0.32, 0]}
          fontSize={node.category === 'planet' ? 0.24 : 0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {node.name}
        </Text>
      </Float>
    </group>
  );
};

const OrbitGuideRings: React.FC = () => {
  return (
    <group rotation={[Math.PI / 2.3, 0, 0]}>
      {/* Middle Orbit Track (Database Planets: MySQL, MongoDB) */}
      <mesh>
        <ringGeometry args={[2.78, 2.82, 64]} />
        <meshBasicMaterial color="#00758F" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[3.38, 3.42, 64]} />
        <meshBasicMaterial color="#47A248" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Orbit Track (Frontend Satellites: ReactJS, TypeScript) */}
      <mesh>
        <ringGeometry args={[4.58, 4.62, 64]} />
        <meshBasicMaterial color="#61DAFB" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[5.18, 5.22, 64]} />
        <meshBasicMaterial color="#3178C6" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const OrbitSceneContent: React.FC<{
  hoveredNode: OrbitSkillNode | null;
  setHoveredNode: (node: OrbitSkillNode | null) => void;
  lang: 'vi' | 'en';
}> = ({ hoveredNode, setHoveredNode, lang }) => {
  const rootGroupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (rootGroupRef.current) {
      // Gentle parallax with mouse
      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        state.mouse.x * 0.4,
        0.05
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        -state.mouse.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={rootGroupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} color="#F89820" intensity={4.5} distance={15} />
      <pointLight position={[0, 2, 4]} color="#00F0FF" intensity={1.5} distance={10} />

      {/* Orbit Guide Tracks */}
      <OrbitGuideRings />

      {/* 1. Center Suns: Java & Spring Boot */}
      {ORBIT_SKILLS.filter((n) => n.category === 'sun').map((sunNode) => (
        <SunNode
          key={sunNode.name}
          node={sunNode}
          isHovered={hoveredNode?.name === sunNode.name}
          onHover={setHoveredNode}
          lang={lang}
        />
      ))}

      {/* 2. Middle Orbit Planets: MySQL & MongoDB */}
      {ORBIT_SKILLS.filter((n) => n.category === 'planet').map((planetNode, idx) => (
        <OrbitingBodyNode
          key={planetNode.name}
          node={planetNode}
          angleOffset={idx * Math.PI + 0.5}
          isPaused={!!hoveredNode}
          isHovered={hoveredNode?.name === planetNode.name}
          onHover={setHoveredNode}
          lang={lang}
        />
      ))}

      {/* 3. Outer Orbit Satellites: ReactJS & TypeScript */}
      {ORBIT_SKILLS.filter((n) => n.category === 'satellite').map((satNode, idx) => (
        <OrbitingBodyNode
          key={satNode.name}
          node={satNode}
          angleOffset={idx * Math.PI + 1.2}
          isPaused={!!hoveredNode}
          isHovered={hoveredNode?.name === satNode.name}
          onHover={setHoveredNode}
          lang={lang}
        />
      ))}
    </group>
  );
};

export const SkillsSection: React.FC = () => {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<OrbitSkillNode | null>(null);

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'languages':
        return <Terminal size={16} className="text-cyan-400" />;
      case 'backend':
        return <Server size={16} className="text-[#6DB33F]" />;
      case 'database':
        return <Database size={16} className="text-[#00758F]" />;
      case 'frontend':
        return <Layers size={16} className="text-[#61DAFB]" />;
      case 'tools':
        return <Cpu size={16} className="text-[#F89820]" />;
      case 'deployment':
        return <Cloud size={16} className="text-[#00F0FF]" />;
      default:
        return <Orbit size={16} className="text-emerald-400" />;
    }
  };

  const filteredCategories =
    activeTab === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.key === activeTab);

  return (
    <section id="skills" className="min-h-screen py-24 px-4 sm:px-6 relative z-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="font-mono text-xs text-emerald-400 mb-2">// 02. KỸ NĂNG & TECH STACK // 3D ORBITAL ECOSYSTEM</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Vũ Trụ <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#F89820]">Kỹ Năng & Quỹ Đạo 3D</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3 max-w-2xl mx-auto">
            {lang === 'vi'
              ? 'Hệ thống quỹ đạo 3D: Java & Spring Boot là mặt trời trung tâm, MySQL & MongoDB là hành tinh quỹ đạo giữa, ReactJS & TypeScript là vệ tinh quỹ đạo ngoài.'
              : 'Interactive 3D Solar Orbit: Java & Spring Boot as glowing core suns, MySQL & MongoDB as middle orbit planets, ReactJS & TypeScript as outer satellites.'}
          </p>
        </div>

        {/* 3D Orbit Interactive Stage */}
        <div className="relative mb-12 glass-panel rounded-3xl border border-emerald-500/30 overflow-hidden shadow-[0_0_40px_rgba(109,179,63,0.15)]">
          {/* Orbit Controls / Legend Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-800/80 bg-slate-950/60 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sun size={15} className="animate-spin text-[#F89820]" style={{ animationDuration: '10s' }} />
              <span className="font-semibold text-slate-200">
                {lang === 'vi' ? 'HỆ THỐNG QUỸ ĐẠO KỸ NĂNG 3D' : '3D SKILLS SOLAR SYSTEM'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-[#F89820] animate-pulse" />
                {lang === 'vi' ? 'Mặt Trời: Java / Spring Boot' : 'Sun: Java / Spring Boot'}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-[#47A248]" />
                {lang === 'vi' ? 'Hành Tinh: MySQL / MongoDB' : 'Planets: MySQL / MongoDB'}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-[#61DAFB]" />
                {lang === 'vi' ? 'Vệ Tinh: ReactJS / TypeScript' : 'Satellites: ReactJS / TypeScript'}
              </span>
            </div>
          </div>

          {/* Interactive 3D Canvas */}
          <div className="h-[380px] sm:h-[430px] w-full relative">
            <Canvas
              camera={{ position: [0, 2.2, 9.2], fov: 50 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <OrbitSceneContent
                hoveredNode={hoveredNode}
                setHoveredNode={setHoveredNode}
                lang={lang}
              />
            </Canvas>

            {/* Quick Clickable Node Pills Overlay for Touch/Desktop Accessibility */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-auto">
              {ORBIT_SKILLS.map((item) => (
                <button
                  key={item.name}
                  onMouseEnter={() => setHoveredNode(item)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setHoveredNode(item)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                    hoveredNode?.name === item.name
                      ? 'bg-slate-800 text-white border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)] scale-105'
                      : 'bg-slate-950/70 text-slate-300 border-slate-800/80 hover:border-slate-700'
                  }`}
                  style={{
                    borderLeftColor: item.color,
                    borderLeftWidth: '3px',
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Floating HUD Tooltip when Hovering a Node */}
            <AnimatePresence>
              {hoveredNode && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 glass-panel p-4 rounded-2xl border shadow-2xl backdrop-blur-xl pointer-events-auto"
                  style={{ borderColor: hoveredNode.color, boxShadow: `0 0 25px ${hoveredNode.color}33` }}
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: hoveredNode.color, boxShadow: `0 0 8px ${hoveredNode.color}` }}
                      />
                      <span className="font-display text-base font-bold text-white">
                        {hoveredNode.name}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: `${hoveredNode.color}22`,
                        color: hoveredNode.color,
                        border: `1px solid ${hoveredNode.color}44`,
                      }}
                    >
                      {hoveredNode.category === 'sun'
                        ? lang === 'vi'
                          ? 'Mặt trời trung tâm'
                          : 'Core Sun'
                        : hoveredNode.category === 'planet'
                        ? lang === 'vi'
                          ? 'Hành tinh CSDL'
                          : 'Database Planet'
                        : lang === 'vi'
                        ? 'Vệ tinh Frontend'
                        : 'Frontend Satellite'}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-200 leading-relaxed flex items-start gap-1.5">
                    <Info size={14} className="shrink-0 mt-0.5 text-cyan-400" />
                    <span>{hoveredNode.description[lang]}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter Pills: 6 Groups */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(109,179,63,0.4)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {lang === 'vi' ? 'Tất cả 6 nhóm' : 'All 6 Groups'}
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                activeTab === cat.key
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {getCategoryIcon(cat.key)}
              <span>{cat.label[lang]}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category.key)}
                    <span className="font-mono text-xs font-bold text-slate-200">
                      {category.label[lang]}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {category.skills.length} items
                  </span>
                </div>

                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span
                          className={`font-semibold flex items-center gap-1.5 ${
                            skill.highlight ? 'text-emerald-300' : 'text-slate-300'
                          }`}
                        >
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                          {skill.name}
                          {skill.name === 'MongoDB' && (
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.2 rounded ml-1">
                              NoSQL Database
                            </span>
                          )}
                        </span>
                        <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800/80">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_8px_#6DB33F]'
                              : 'bg-slate-700 group-hover:bg-cyan-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
