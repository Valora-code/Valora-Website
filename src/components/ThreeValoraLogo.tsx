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
  const createDiamondShape = (scale = 1, depth = 0) => {
    const shape = new THREE.Shape();
    const s = scale;
    
    // Diamond with concave curves matching the 2D logo
    shape.moveTo(0, 2.5 * s);
    shape.quadraticCurveTo(0.5 * s, 1.2 * s, 2.3 * s, 0);
    shape.quadraticCurveTo(0.5 * s, -1.2 * s, 0, -2.5 * s);
    shape.quadraticCurveTo(-0.5 * s, -1.2 * s, -2.3 * s, 0);
    shape.quadraticCurveTo(-0.5 * s, 1.2 * s, 0, 2.5 * s);
    
    return shape;
  };

  const shape = createDiamondShape(1);

  return (
    <group ref={groupRef}>
      {/* Front wireframe - brightest */}
      <mesh position={[0, 0, 0.3]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.6} transparent />
      </mesh>
      
      {/* Center layer */}
      <mesh position={[0, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.4} transparent />
      </mesh>
      
      {/* Back layer - subtlest */}
      <mesh position={[0, 0, -0.3]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.2} transparent />
      </mesh>

      {/* Edge glow lines - front */}
      <lineSegments position={[0, 0, 0.3]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.8} transparent linewidth={2} />
      </lineSegments>
      
      {/* Edge glow lines - center */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.5} transparent linewidth={2} />
      </lineSegments>

      {/* Inner accent diamond */}
      <mesh position={[0, 0, 0]}>
        <shapeGeometry args={[createDiamondShape(0.7)]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.15} transparent />
      </mesh>

      {/* Connecting lines between layers for depth */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 2.3;
        const x = Math.cos(angle + Math.PI / 4) * radius;
        const y = Math.sin(angle + Math.PI / 4) * radius;
        
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([x, y, -0.3, x, y, 0.3])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" opacity={0.2} transparent />
          </line>
        );
      })}
    </group>
  );
}

export const ThreeValoraLogo = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <RotatingLogo />
      </Canvas>
    </div>
  );
};
