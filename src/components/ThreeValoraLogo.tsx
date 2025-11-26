import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingLogo() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  // Create Valora diamond shape with concave curves
  const createDiamondShape = () => {
    const shape = new THREE.Shape();
    const scale = 0.85; // 15% smaller
    
    // Diamond with more pronounced vertical stretch and concave curves
    shape.moveTo(0, 3.2 * scale);
    shape.quadraticCurveTo(0.4 * scale, 1.5 * scale, 1.8 * scale, 0);
    shape.quadraticCurveTo(0.4 * scale, -1.5 * scale, 0, -3.2 * scale);
    shape.quadraticCurveTo(-0.4 * scale, -1.5 * scale, -1.8 * scale, 0);
    shape.quadraticCurveTo(-0.4 * scale, 1.5 * scale, 0, 3.2 * scale);
    
    return shape;
  };

  const shape = createDiamondShape();

  return (
    <group ref={groupRef}>
      {/* Single wireframe outline with thicker lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.9} transparent linewidth={12} />
      </lineSegments>
    </group>
  );
}

export const ThreeValoraLogo = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0">
      <div className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[297px] md:h-[297px]">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ 
            alpha: true, 
            antialias: true,
            premultipliedAlpha: false
          }}
          onCreated={({ gl, scene }) => {
            gl.setClearColor(0x000000, 0);
            scene.background = null;
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <RotatingLogo />
        </Canvas>
      </div>
      <span className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-[0.2em] text-foreground mt-4 md:mt-0 md:-ml-6">
        VALORA
      </span>
    </div>
  );
};
