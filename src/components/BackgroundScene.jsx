
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Individual crystal component
const Crystal = ({ position, rotation, scale, color, emissive, darkMode }) => {
  const crystalRef = useRef();
  const initialPosition = useMemo(() => [...position], [position]);
  const initialRotation = useMemo(() => [...rotation], [rotation]);
  
  // Custom seed for this crystal's animation
  const seed = useMemo(() => Math.random() * 100, []);
  
  // Animate crystal with gentle floating movement
  useFrame(({ clock }) => {
    if (crystalRef.current) {
      const time = clock.getElapsedTime();
      
      // Subtle position changes
      crystalRef.current.position.y = initialPosition[1] + Math.sin(time * 0.4 + seed) * 0.1;
      
      // Gentle rotation
      crystalRef.current.rotation.x = initialRotation[0] + Math.sin(time * 0.2 + seed) * 0.03;
      crystalRef.current.rotation.y = initialRotation[1] + time * 0.05 + Math.sin(time * 0.1) * 0.02;
      crystalRef.current.rotation.z = initialRotation[2] + Math.cos(time * 0.3 + seed) * 0.03;
    }
  });
  
  return (
    <group 
      ref={crystalRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {/* Use octahedron for crystalline look */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={darkMode ? 0.3 : 0.1}
          roughness={0.2}
          metalness={0.3}
          opacity={darkMode ? 0.9 : 0.7}
          transparent
          envMapIntensity={0.8}
          transmission={0.2}
        />
      </mesh>
    </group>
  );
};

// Cluster of crystals forming a structure
const CrystalCluster = ({ position, count = 7, size = 1, colorVariation = 0.2, darkMode }) => {
  const clusterRef = useRef();
  
  // Generate crystal configurations
  const crystals = useMemo(() => {
    const baseColor = darkMode 
      ? new THREE.Color("#4f83c0") 
      : new THREE.Color("#6495ED");
    
    const baseEmissive = darkMode 
      ? new THREE.Color("#2a4a7a") 
      : new THREE.Color("#4682B4");
    
    return Array.from({ length: count }, (_, i) => {
      // Create variation in crystal placements
      const localPosition = [
        (Math.random() - 0.5) * size * 1.2,
        (Math.random() - 0.5) * size * 1.2,
        (Math.random() - 0.5) * size * 1.2
      ];
      
      // Random rotation
      const rotation = [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ];
      
      // Random scale (some bigger, some smaller)
      const baseScale = (Math.random() * 0.5 + 0.5) * size;
      const scaleVector = [
        baseScale * (0.8 + Math.random() * 0.4),
        baseScale * (0.8 + Math.random() * 0.4),
        baseScale * (0.8 + Math.random() * 0.4)
      ];
      
      // Slight color variations
      const hue = Math.random() * colorVariation * 2 - colorVariation;
      const colorVariant = baseColor.clone().offsetHSL(hue, 0.1, 0.1);
      const emissiveVariant = baseEmissive.clone().offsetHSL(hue, 0.1, 0.1);
      
      return {
        id: i,
        position: localPosition,
        rotation,
        scale: scaleVector,
        color: colorVariant,
        emissive: emissiveVariant
      };
    });
  }, [count, size, colorVariation, darkMode]);
  
  // Animate the entire cluster with slow rotation
  useFrame(({ clock }) => {
    if (clusterRef.current) {
      const time = clock.getElapsedTime();
      clusterRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <group ref={clusterRef} position={position}>
      {crystals.map(crystal => (
        <Crystal
          key={crystal.id}
          position={crystal.position}
          rotation={crystal.rotation}
          scale={crystal.scale}
          color={crystal.color}
          emissive={crystal.emissive}
          darkMode={darkMode}
        />
      ))}
    </group>
  );
};

// Multiple crystal clusters for visual interest
const CrystalStructures = ({ darkMode }) => {
  const structuresRef = useRef();
  
  // Generate multiple crystal clusters at different positions
  const clusters = useMemo(() => {
    return [
      { id: 1, position: [-5, -1, -2], count: 5, size: 0.6 },
      { id: 2, position: [4, 2, -3], count: 7, size: 0.8 },
      { id: 3, position: [0, -2, 1], count: 6, size: 0.7 },
      { id: 4, position: [-3, 3, 0], count: 4, size: 0.5 },
      { id: 5, position: [5, -2, 2], count: 8, size: 0.9 },
    ];
  }, []);

  // Very subtle movement of the entire structure
  useFrame(({ clock }) => {
    if (structuresRef.current) {
      const time = clock.getElapsedTime();
      structuresRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
      structuresRef.current.position.y = Math.sin(time * 0.2) * 0.3;
    }
  });
  
  return (
    <group ref={structuresRef}>
      {clusters.map(cluster => (
        <CrystalCluster
          key={cluster.id}
          position={cluster.position}
          count={cluster.count}
          size={cluster.size}
          darkMode={darkMode}
        />
      ))}
    </group>
  );
};

// Background ambient particles
const AmbientParticles = ({ count = 100, darkMode }) => {
  const particlesRef = useRef();
  
  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15
      ],
      size: Math.random() * 0.08 + 0.02
    }));
  }, [count]);
  
  // Subtle sparkle effect
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      particlesRef.current.children.forEach((particle, i) => {
        // Make particles twinkle by changing opacity
        const opacity = 0.3 + Math.sin(time * 0.5 + i) * 0.2;
        particle.material.opacity = opacity;
      });
    }
  });
  
  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial 
            color={darkMode ? "#6ca0dd" : "#87CEEB"} 
            transparent 
            opacity={0.5} 
          />
        </mesh>
      ))}
    </group>
  );
};

// Scene content wrapper
const SceneContent = ({ darkMode }) => {
  return (
    <>
      {/* Lighting - important for crystal reflections */}
      <ambientLight intensity={darkMode ? 0.2 : 0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={darkMode ? 0.7 : 0.9} 
        color="#ffffff"
      />
      <pointLight
        position={[-5, 3, 0]}
        intensity={darkMode ? 0.5 : 0.3}
        color={darkMode ? "#3a6ea5" : "#87CEEB"}
        distance={15}
      />
      
      {/* Main crystal formations */}
      <CrystalStructures darkMode={darkMode} />
      
      {/* Ambient background elements */}
      <AmbientParticles darkMode={darkMode} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
};

// Main exported component
const CrystalStructuresScene = ({ darkMode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'default',
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{
          background: darkMode 
            ? 'radial-gradient(circle at 50% 50%, #101729 0%, #06080f 100%)' 
            : 'radial-gradient(circle at 50% 50%, #f0f8ff 0%, #e6f0fa 100%)',
        }}
      >
        {mounted && <SceneContent darkMode={darkMode} />}
      </Canvas>
    </div>
  );
};

export default CrystalStructuresScene;