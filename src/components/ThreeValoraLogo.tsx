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
    
    // Diamond with concave curves matching the 2D logo
    shape.moveTo(0, 2.5);
    shape.quadraticCurveTo(0.5, 1.2, 2.3, 0);
    shape.quadraticCurveTo(0.5, -1.2, 0, -2.5);
    shape.quadraticCurveTo(-0.5, -1.2, -2.3, 0);
    shape.quadraticCurveTo(-0.5, 1.2, 0, 2.5);
    
    return shape;
  };

  const shape = createDiamondShape();

  return (
    <group ref={groupRef}>
      {/* Single wireframe outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.8} transparent linewidth={2} />
      </lineSegments>
    </group>
  );
}

export const ThreeValoraLogo = () => {
  return (
    <div className="w-full flex items-center justify-center gap-8 md:gap-12">
      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <RotatingLogo />
        </Canvas>
      </div>
      <span className="text-5xl md:text-7xl font-extralight tracking-[0.2em] text-foreground">
        VALORA
      </span>
    </div>
  );
};
