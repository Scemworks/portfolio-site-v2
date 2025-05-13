
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Human 3D model with eyes that follow cursor
const Head = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Blink animation effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 2000); // Random blink between 2-5 seconds
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Head and eye tracking for mouse movement
  useFrame(() => {
    if (headRef.current) {
      // Smoother, more subtle head rotation
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        (mousePosition.x * Math.PI) / 8,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        (mousePosition.y * Math.PI) / 10,
        0.05
      );
    }
    
    // Independent eye movement - more range than head
    if (leftEyeRef.current && rightEyeRef.current) {
      // Left eye follows cursor
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(
        leftEyeRef.current.position.x,
        -0.08 + mousePosition.x * 0.02,
        0.1
      );
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(
        leftEyeRef.current.position.y,
        mousePosition.y * 0.02,
        0.1
      );
      
      // Right eye follows cursor
      rightEyeRef.current.position.x = THREE.MathUtils.lerp(
        rightEyeRef.current.position.x,
        0.08 + mousePosition.x * 0.02,
        0.1
      );
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(
        rightEyeRef.current.position.y,
        mousePosition.y * 0.02,
        0.1
      );
    }
  });
  
  return (
    <group>
      {/* Main head */}
      <mesh ref={headRef}>
        {/* Head shape - slightly elongated */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial attach="material" color="#e1c4b3" />
        
        {/* Hair */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial attach="material" color="#3a3a3a" />
        </mesh>
        
        {/* Ears */}
        <mesh position={[-0.9, 0, 0]}>
          <sphereGeometry args={[0.2, 32, 16]} />
          <meshStandardMaterial attach="material" color="#e1c4b3" />
        </mesh>
        <mesh position={[0.9, 0, 0]}>
          <sphereGeometry args={[0.2, 32, 16]} />
          <meshStandardMaterial attach="material" color="#e1c4b3" />
        </mesh>
        
        {/* Face */}
        <mesh position={[0, 0, 0.5]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial attach="material" color="#e8d0c0" />
        </mesh>
        
        {/* Eye sockets */}
        <mesh position={[-0.3, 0.2, 0.85]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial attach="material" color="#ffffff" />
          
          {/* Left eye pupil - follows cursor */}
          <mesh ref={leftEyeRef} position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.09, 32, 32]} />
            <meshStandardMaterial 
              attach="material"
              color="black" 
              emissive="#000000"
              emissiveIntensity={isBlinking ? 0 : 0.5}
            />
          </mesh>
        </mesh>
        
        <mesh position={[0.3, 0.2, 0.85]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial attach="material" color="#ffffff" />
          
          {/* Right eye pupil - follows cursor */}
          <mesh ref={rightEyeRef} position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.09, 32, 32]} />
            <meshStandardMaterial 
              attach="material"
              color="black" 
              emissive="#000000"
              emissiveIntensity={isBlinking ? 0 : 0.5}
            />
          </mesh>
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, -0.05, 1]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial attach="material" color="#e8d0c0" />
        </mesh>
        
        {/* Mouth */}
        <mesh position={[0, -0.3, 0.85]}>
          <boxGeometry args={[0.4, 0.08, 0.08]} />
          <meshStandardMaterial attach="material" color="#c05f5f" />
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.7, 32]} />
          <meshStandardMaterial attach="material" color="#e1c4b3" />
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
