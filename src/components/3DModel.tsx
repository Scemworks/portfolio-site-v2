
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simple 3D head model that follows the cursor
const Head = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const headRef = useRef<THREE.Mesh>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Blink animation effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 2000); // Random blink between 2-5 seconds
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Follow mouse movement
  useFrame(() => {
    if (headRef.current) {
      // Smooth rotation towards mouse position
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        (mousePosition.x * Math.PI) / 5,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        (mousePosition.y * Math.PI) / 5,
        0.1
      );
    }
  });
  
  return (
    <group>
      {/* Main head */}
      <mesh ref={headRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial attach="material" color="#ffb6c1" />
        
        {/* Cap */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.5, 32]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.4, 0.2, 0.9]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial attach="material" color="white" />
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial 
              attach="material"
              color="black" 
              emissive="#000000"
              emissiveIntensity={isBlinking ? 0 : 0.5}
            />
          </mesh>
        </mesh>
        
        <mesh position={[0.4, 0.2, 0.9]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial attach="material" color="white" />
          <mesh position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial 
              attach="material"
              color="black" 
              emissive="#000000"
              emissiveIntensity={isBlinking ? 0 : 0.5}
            />
          </mesh>
        </mesh>
        
        {/* Mouth */}
        <mesh position={[0, -0.3, 0.9]}>
          <boxGeometry args={[0.8, 0.2, 0.1]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
      </mesh>
    </group>
  );
};

const Scene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { viewport } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1)
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [viewport]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Head mousePosition={mousePosition} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
};

const ThreeDModel: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
