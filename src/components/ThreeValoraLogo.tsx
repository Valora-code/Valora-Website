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
        <lineBasicMaterial color="#ffffff" opacity={0.9} transparent linewidth={4} />
      </lineSegments>
    </group>
  );
}

export const ThreeValoraLogo = () => {
  return (
    <div className="w-full flex items-center justify-center gap-0">
      <div className="w-[212px] h-[212px] md:w-[297px] md:h-[297px]">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <RotatingLogo />
        </Canvas>
      </div>
      <span className="text-5xl md:text-7xl font-extralight tracking-[0.2em] text-foreground -ml-4 md:-ml-6">
        VALORA
      </span>
    </div>
  );
};
