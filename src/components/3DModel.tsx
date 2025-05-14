
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Full body human 3D model with features that follow cursor
const Human = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const headRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftEyelidRef = useRef<THREE.Mesh>(null);
  const rightEyelidRef = useRef<THREE.Mesh>(null);
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
        0.12 + mousePosition.y * 0.02,
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
        0.12 + mousePosition.y * 0.02,
        0.1
      );
    }

    // Handle eyelids for blinking
    if (leftEyelidRef.current && rightEyelidRef.current) {
      if (isBlinking) {
        leftEyelidRef.current.scale.y = THREE.MathUtils.lerp(leftEyelidRef.current.scale.y, 1, 0.4);
        rightEyelidRef.current.scale.y = THREE.MathUtils.lerp(rightEyelidRef.current.scale.y, 1, 0.4);
      } else {
        leftEyelidRef.current.scale.y = THREE.MathUtils.lerp(leftEyelidRef.current.scale.y, 0.1, 0.2);
        rightEyelidRef.current.scale.y = THREE.MathUtils.lerp(rightEyelidRef.current.scale.y, 0.1, 0.2);
      }
    }
    
    // Subtle torso movement in direction of cursor
    if (torsoRef.current) {
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(
        torsoRef.current.rotation.y,
        (mousePosition.x * Math.PI) / 16,
        0.02
      );
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(
        torsoRef.current.rotation.x,
        (mousePosition.y * Math.PI) / 20,
        0.02
      );
    }
  });
  
  return (
    <group position={[0, -1.5, 0]}>
      {/* Torso */}
      <mesh ref={torsoRef} position={[0, 0, 0]}>
        {/* Upper Body (Torso) - T-Shirt */}
        <mesh position={[0, 0.7, 0]}>
          <capsuleGeometry args={[0.5, 1, 16, 16]} />
          <meshStandardMaterial attach="material" color="#2563eb" /> {/* Blue t-shirt */}
          
          {/* T-shirt neck */}
          <mesh position={[0, 0.6, 0.2]}>
            <ringGeometry args={[0.2, 0.25, 16]} />
            <meshStandardMaterial attach="material" color="#1e40af" />
          </mesh>
          
          {/* T-shirt sleeve left */}
          <mesh position={[-0.55, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 16]} />
            <meshStandardMaterial attach="material" color="#2563eb" />
          </mesh>
          
          {/* T-shirt sleeve right */}
          <mesh position={[0.55, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 16]} />
            <meshStandardMaterial attach="material" color="#2563eb" />
          </mesh>
        </mesh>
        
        {/* Lower Body (Jeans) */}
        <mesh position={[0, -0.6, 0]}>
          <capsuleGeometry args={[0.45, 0.8, 16, 16]} />
          <meshStandardMaterial attach="material" color="#1e3a8a" /> {/* Dark blue jeans */}
          
          {/* Belt */}
          <mesh position={[0, 0.5, 0]}>
            <torusGeometry args={[0.47, 0.05, 16, 32]} />
            <meshStandardMaterial attach="material" color="#854d0e" />
          </mesh>
          
          {/* Pocket left */}
          <mesh position={[-0.3, 0.2, 0.4]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.15, 0.2, 0.01]} />
            <meshStandardMaterial attach="material" color="#172554" />
          </mesh>
          
          {/* Pocket right */}
          <mesh position={[0.3, 0.2, 0.4]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.15, 0.2, 0.01]} />
            <meshStandardMaterial attach="material" color="#172554" />
          </mesh>
        </mesh>
        
        {/* Left Arm */}
        <mesh position={[-0.7, 0.7, 0]} rotation={[0, 0, -Math.PI / 16]}>
          <capsuleGeometry args={[0.15, 0.7, 16, 16]} />
          <meshStandardMaterial attach="material" color="#e2b69d" />
          
          {/* Left Hand */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial attach="material" color="#e2b69d" />
          </mesh>
        </mesh>
        
        {/* Right Arm */}
        <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, Math.PI / 16]}>
          <capsuleGeometry args={[0.15, 0.7, 16, 16]} />
          <meshStandardMaterial attach="material" color="#e2b69d" />
          
          {/* Right Hand */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial attach="material" color="#e2b69d" />
          </mesh>
        </mesh>
        
        {/* Left Leg */}
        <mesh position={[-0.25, -1.5, 0]}>
          <capsuleGeometry args={[0.18, 0.9, 16, 16]} />
          <meshStandardMaterial attach="material" color="#1e3a8a" />
          
          {/* Left Shoe */}
          <mesh position={[0, -0.6, 0.1]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial attach="material" color="#1e293b" />
          </mesh>
        </mesh>
        
        {/* Right Leg */}
        <mesh position={[0.25, -1.5, 0]}>
          <capsuleGeometry args={[0.18, 0.9, 16, 16]} />
          <meshStandardMaterial attach="material" color="#1e3a8a" />
          
          {/* Right Shoe */}
          <mesh position={[0, -0.6, 0.1]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial attach="material" color="#1e293b" />
          </mesh>
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial attach="material" color="#e2b69d" />
        </mesh>
        
        {/* Head */}
        <mesh ref={headRef} position={[0, 1.8, 0]}>
          {/* Head shape - slightly elongated */}
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial attach="material" color="#e2b69d" />
          
          {/* Hair */}
          <mesh position={[0, 0.15, 0]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial attach="material" color="#4a2513" />
          </mesh>
          
          {/* Ears */}
          <mesh position={[-0.4, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 8]} />
            <meshStandardMaterial attach="material" color="#e2b69d" />
            
            {/* Inner ear detail */}
            <mesh position={[-0.02, 0, 0]} scale={0.7}>
              <sphereGeometry args={[0.05, 16, 8]} />
              <meshStandardMaterial attach="material" color="#d6a889" />
            </mesh>
          </mesh>
          
          <mesh position={[0.4, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 8]} />
            <meshStandardMaterial attach="material" color="#e2b69d" />
            
            {/* Inner ear detail */}
            <mesh position={[0.02, 0, 0]} scale={0.7}>
              <sphereGeometry args={[0.05, 16, 8]} />
              <meshStandardMaterial attach="material" color="#d6a889" />
            </mesh>
          </mesh>
          
          {/* Face */}
          <mesh position={[0, 0, 0.15]}>
            <sphereGeometry args={[0.35, 32, 32, 0, Math.PI, 0, Math.PI * 0.7]} />
            <meshStandardMaterial attach="material" color="#e8d0c0" />
          </mesh>
          
          {/* Left eye socket */}
          <mesh position={[-0.12, 0.05, 0.32]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial attach="material" color="#ffffff" />
            
            {/* Left eyelid */}
            <mesh 
              ref={leftEyelidRef} 
              position={[0, 0.03, 0.07]} 
              scale={[1, 0.1, 1]}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial attach="material" color="#e2b69d" />
            </mesh>
            
            {/* Left eye pupil - follows cursor */}
            <mesh ref={leftEyeRef} position={[0, 0, 0.05]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial 
                attach="material"
                color="black" 
                emissive="#000000"
                emissiveIntensity={0.5}
              />
              
              {/* Left iris */}
              <mesh position={[0, 0, 0.005]} scale={1.3}>
                <ringGeometry args={[0.01, 0.02, 16]} />
                <meshStandardMaterial 
                  attach="material" 
                  color="#4b5563"
                  emissive="#4b5563"
                  emissiveIntensity={0.3} 
                />
              </mesh>
            </mesh>
          </mesh>
          
          {/* Right eye socket */}
          <mesh position={[0.12, 0.05, 0.32]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial attach="material" color="#ffffff" />
            
            {/* Right eyelid */}
            <mesh 
              ref={rightEyelidRef} 
              position={[0, 0.03, 0.07]} 
              scale={[1, 0.1, 1]}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial attach="material" color="#e2b69d" />
            </mesh>
            
            {/* Right eye pupil - follows cursor */}
            <mesh ref={rightEyeRef} position={[0, 0, 0.05]}>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial 
                attach="material"
                color="black" 
                emissive="#000000"
                emissiveIntensity={0.5}
              />
              
              {/* Right iris */}
              <mesh position={[0, 0, 0.005]} scale={1.3}>
                <ringGeometry args={[0.01, 0.02, 16]} />
                <meshStandardMaterial 
                  attach="material" 
                  color="#4b5563"
                  emissive="#4b5563"
                  emissiveIntensity={0.3} 
                />
              </mesh>
            </mesh>
          </mesh>
          
          {/* Nose - improved 3D nose with fixed rotation format */}
          <mesh position={[0, -0.05, 0.4]}>
            {/* Fixed cone geometry by removing the rotation from args and using separate rotation */}
            <coneGeometry args={[0.07, 0.15, 16]} />
            <meshStandardMaterial attach="material" color="#e8d0c0" />
            
            {/* Nostrils */}
            <mesh position={[-0.03, -0.05, 0]} rotation={[0, 0, Math.PI/4]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial attach="material" color="#7f1d1d" />
            </mesh>
            
            <mesh position={[0.03, -0.05, 0]} rotation={[0, 0, -Math.PI/4]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial attach="material" color="#7f1d1d" />
            </mesh>
          </mesh>
          
          {/* Mouth - improved with lips */}
          <mesh position={[0, -0.15, 0.35]}>
            <boxGeometry args={[0.15, 0.03, 0.06]} />
            <meshStandardMaterial attach="material" color="#be185d" />
            
            {/* Lower lip */}
            <mesh position={[0, -0.025, 0]}>
              <boxGeometry args={[0.15, 0.02, 0.05]} />
              <meshStandardMaterial attach="material" color="#be185d" />
            </mesh>
          </mesh>
          
          {/* Eyebrows */}
          <mesh position={[-0.12, 0.15, 0.35]} rotation={[0, 0, Math.PI / 8]}>
            <boxGeometry args={[0.08, 0.02, 0.01]} />
            <meshStandardMaterial attach="material" color="#4a2513" />
          </mesh>
          
          <mesh position={[0.12, 0.15, 0.35]} rotation={[0, 0, -Math.PI / 8]}>
            <boxGeometry args={[0.08, 0.02, 0.01]} />
            <meshStandardMaterial attach="material" color="#4a2513" />
          </mesh>
          
          {/* Cheeks with slight blush */}
          <mesh position={[-0.2, -0.1, 0.28]} rotation={[0, Math.PI/4, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial attach="material" color="#f8c4c4" transparent opacity={0.3} />
          </mesh>
          
          <mesh position={[0.2, -0.1, 0.28]} rotation={[0, -Math.PI/4, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial attach="material" color="#f8c4c4" transparent opacity={0.3} />
          </mesh>
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
      <Human mousePosition={mousePosition} />
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
