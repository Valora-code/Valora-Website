import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

function DataPoint({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
    </mesh>
  );
}

function ValoraLogoShape() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  // Create Valora diamond shape path
  const shape = useMemo(() => {
    const path = new THREE.Shape();
    // Diamond with concave curves matching the logo
    path.moveTo(0, 2.5);
    path.quadraticCurveTo(0.3, 1.5, 2, 0);
    path.quadraticCurveTo(0.3, -1.5, 0, -2.5);
    path.quadraticCurveTo(-0.3, -1.5, -2, 0);
    path.quadraticCurveTo(-0.3, 1.5, 0, 2.5);
    return path;
  }, []);

  return (
    <group ref={meshRef}>
      {/* Front wireframe */}
      <mesh position={[0, 0, 0]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.2} transparent />
      </mesh>
      {/* Back wireframe for depth */}
      <mesh position={[0, 0, -0.3]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.1} transparent />
      </mesh>
      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#ffffff" opacity={0.4} transparent />
      </lineSegments>
    </group>
  );
}

function ConnectionLines() {
  // Create diamond-shaped connection points
  const points = useMemo(() => {
    const pts = [];
    const numPoints = 24;
    for (let i = 0; i < numPoints; i++) {
      const t = i / numPoints;
      const angle = t * Math.PI * 2;
      
      // Diamond shape with concave curves
      let radius;
      const segmentAngle = angle % (Math.PI / 2);
      if (segmentAngle < Math.PI / 4) {
        radius = 2.5 - Math.sin(segmentAngle * 2) * 0.3;
      } else {
        radius = 2.5 - Math.sin((Math.PI / 2 - segmentAngle) * 2) * 0.3;
      }
      
      pts.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      ]);
    }
    return pts;
  }, []);

  return (
    <>
      {points.map((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        return (
          <Line
            key={i}
            points={[point, nextPoint] as [number, number, number][]}
            color="#ffffff"
            opacity={0.08}
            transparent
            lineWidth={1}
          />
        );
      })}
    </>
  );
}

function Scene() {
  const dataPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 25; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radiusVariation = 2.8 + Math.random() * 0.6;
      
      points.push([
        Math.cos(theta) * radiusVariation,
        (Math.random() - 0.5) * 5,
        Math.sin(theta) * radiusVariation * 0.3
      ]);
    }
    return points;
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <ValoraLogoShape />
      <ConnectionLines />
      {dataPoints.map((pos, i) => (
        <DataPoint key={i} position={pos} />
      ))}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export const ThreeScene = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};
