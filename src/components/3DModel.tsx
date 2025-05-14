
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
          <capsuleGeometry args={[0.5, 1, 16, 32]} />
          <meshStandardMaterial attach="material" color="#3b82f6" metalness={0.1} roughness={0.8} /> {/* Improved blue t-shirt */}
          
          {/* T-shirt neck */}
          <mesh position={[0, 0.6, 0.2]}>
            <ringGeometry args={[0.2, 0.25, 16]} />
            <meshStandardMaterial attach="material" color="#1d4ed8" />
          </mesh>
          
          {/* T-shirt sleeve left */}
          <mesh position={[-0.55, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 16]} />
            <meshStandardMaterial attach="material" color="#3b82f6" metalness={0.1} roughness={0.8} />
          </mesh>
          
          {/* T-shirt sleeve right */}
          <mesh position={[0.55, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.15, 0.18, 0.3, 16]} />
            <meshStandardMaterial attach="material" color="#3b82f6" metalness={0.1} roughness={0.8} />
          </mesh>
          
          {/* T-shirt logo - simple circle */}
          <mesh position={[0, 0.2, 0.5]} rotation={[0, 0, 0]}>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial attach="material" color="#ffffff" />
            
            {/* Logo inner detail */}
            <mesh position={[0, 0, 0.01]}>
              <circleGeometry args={[0.1, 32]} />
              <meshStandardMaterial attach="material" color="#ef4444" />
            </mesh>
          </mesh>
        </mesh>
        
        {/* Lower Body (Jeans) */}
        <mesh position={[0, -0.6, 0]}>
          <capsuleGeometry args={[0.45, 0.8, 16, 32]} />
          <meshStandardMaterial 
            attach="material" 
            color="#1e3a8a" 
            roughness={0.9} 
            metalness={0.1}
          /> {/* Improved denim texture */}
          
          {/* Belt */}
          <mesh position={[0, 0.5, 0]}>
            <torusGeometry args={[0.47, 0.05, 16, 32]} />
            <meshStandardMaterial attach="material" color="#713f12" metalness={0.3} roughness={0.7} />
            
            {/* Belt buckle */}
            <mesh position={[0, 0, 0.48]}>
              <boxGeometry args={[0.15, 0.1, 0.02]} />
              <meshStandardMaterial attach="material" color="#d4d4d8" metalness={0.7} roughness={0.3} />
            </mesh>
          </mesh>
          
          {/* Pocket left */}
          <mesh position={[-0.3, 0.2, 0.4]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.15, 0.2, 0.01]} />
            <meshStandardMaterial attach="material" color="#0f172a" />
          </mesh>
          
          {/* Pocket right */}
          <mesh position={[0.3, 0.2, 0.4]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.15, 0.2, 0.01]} />
            <meshStandardMaterial attach="material" color="#0f172a" />
          </mesh>
          
          {/* Jean stitching details */}
          <mesh position={[0, 0, 0.46]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.45, 0.005, 8, 32]} />
            <meshStandardMaterial attach="material" color="#cbd5e1" />
          </mesh>
        </mesh>
        
        {/* Left Arm */}
        <mesh position={[-0.7, 0.7, 0]} rotation={[0, 0, -Math.PI / 16]}>
          <capsuleGeometry args={[0.15, 0.7, 16, 16]} />
          <meshStandardMaterial 
            attach="material" 
            color="#e2b69d" 
            roughness={0.7} 
            metalness={0.1}
          />
          
          {/* Left Hand */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              attach="material" 
              color="#e2b69d" 
              roughness={0.7} 
              metalness={0.1}
            />
          </mesh>
        </mesh>
        
        {/* Right Arm */}
        <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, Math.PI / 16]}>
          <capsuleGeometry args={[0.15, 0.7, 16, 16]} />
          <meshStandardMaterial 
            attach="material" 
            color="#e2b69d" 
            roughness={0.7} 
            metalness={0.1}
          />
          
          {/* Right Hand */}
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              attach="material" 
              color="#e2b69d" 
              roughness={0.7} 
              metalness={0.1}
            />
          </mesh>
        </mesh>
        
        {/* Left Leg */}
        <mesh position={[-0.25, -1.5, 0]}>
          <capsuleGeometry args={[0.18, 0.9, 16, 16]} />
          <meshStandardMaterial 
            attach="material" 
            color="#1e3a8a" 
            roughness={0.9} 
            metalness={0.1}
          />
          
          {/* Left Shoe */}
          <mesh position={[0, -0.6, 0.1]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial attach="material" color="#0f172a" roughness={0.5} metalness={0.2} />
            
            {/* Shoe details */}
            <mesh position={[0, -0.05, 0.1]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.18, 0.02, 0.15]} />
              <meshStandardMaterial attach="material" color="#e2e8f0" />
            </mesh>
          </mesh>
        </mesh>
        
        {/* Right Leg */}
        <mesh position={[0.25, -1.5, 0]}>
          <capsuleGeometry args={[0.18, 0.9, 16, 16]} />
          <meshStandardMaterial 
            attach="material" 
            color="#1e3a8a" 
            roughness={0.9} 
            metalness={0.1}
          />
          
          {/* Right Shoe */}
          <mesh position={[0, -0.6, 0.1]}>
            <boxGeometry args={[0.2, 0.1, 0.3]} />
            <meshStandardMaterial attach="material" color="#0f172a" roughness={0.5} metalness={0.2} />
            
            {/* Shoe details */}
            <mesh position={[0, -0.05, 0.1]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.18, 0.02, 0.15]} />
              <meshStandardMaterial attach="material" color="#e2e8f0" />
            </mesh>
          </mesh>
        </mesh>
        
        {/* Neck */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial 
            attach="material" 
            color="#e2b69d" 
            roughness={0.7} 
            metalness={0.1}
          />
        </mesh>
        
        {/* Head */}
        <mesh ref={headRef} position={[0, 1.8, 0]}>
          {/* Head shape - slightly elongated */}
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            attach="material" 
            color="#e2b69d" 
            roughness={0.7} 
            metalness={0.1}
          />
          
          {/* Hair */}
          <mesh position={[0, 0.15, 0]} rotation={[0.2, 0, 0]}>
            <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial 
              attach="material" 
              color="#4a2513" 
              roughness={0.9}
              metalness={0.1}
            />
            
            {/* Hair details - lighter strands */}
            <mesh position={[0.1, 0.05, 0]} rotation={[0.1, 0.2, 0]}>
              <boxGeometry args={[0.02, 0.1, 0.15]} />
              <meshStandardMaterial attach="material" color="#6b4f35" />
            </mesh>
            
            <mesh position={[-0.15, 0.08, 0]} rotation={[0.1, -0.3, 0]}>
              <boxGeometry args={[0.02, 0.08, 0.15]} />
              <meshStandardMaterial attach="material" color="#6b4f35" />
            </mesh>
          </mesh>
          
          {/* Ears */}
          <mesh position={[-0.4, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 8]} />
            <meshStandardMaterial 
              attach="material" 
              color="#e2b69d" 
              roughness={0.7} 
              metalness={0.1}
            />
            
            {/* Inner ear detail */}
            <mesh position={[-0.02, 0, 0]} scale={0.7}>
              <sphereGeometry args={[0.05, 16, 8]} />
              <meshStandardMaterial attach="material" color="#d6a889" />
            </mesh>
          </mesh>
          
          <mesh position={[0.4, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 8]} />
            <meshStandardMaterial 
              attach="material" 
              color="#e2b69d" 
              roughness={0.7} 
              metalness={0.1}
            />
            
            {/* Inner ear detail */}
            <mesh position={[0.02, 0, 0]} scale={0.7}>
              <sphereGeometry args={[0.05, 16, 8]} />
              <meshStandardMaterial attach="material" color="#d6a889" />
            </mesh>
          </mesh>
          
          {/* Face */}
          <mesh position={[0, 0, 0.15]}>
            <sphereGeometry args={[0.35, 32, 32, 0, Math.PI, 0, Math.PI * 0.7]} />
            <meshStandardMaterial 
              attach="material" 
              color="#eac7b4" 
              roughness={0.6} 
              metalness={0.1}
            />
          </mesh>
          
          {/* Left eye socket */}
          <mesh position={[-0.12, 0.05, 0.32]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial 
              attach="material" 
              color="#ffffff" 
              roughness={0.1} 
              metalness={0.1}
            />
            
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
                color="#0f172a" 
                emissive="#000000"
                emissiveIntensity={0.5}
                roughness={0.1}
              />
              
              {/* Left iris */}
              <mesh position={[0, 0, 0.005]} scale={1.3}>
                <ringGeometry args={[0.01, 0.02, 16]} />
                <meshStandardMaterial 
                  attach="material" 
                  color="#334155"
                  emissive="#334155"
                  emissiveIntensity={0.3}
                  roughness={0.1}
                />
              </mesh>
              
              {/* Eye reflection highlight */}
              <mesh position={[0.01, 0.01, 0.03]} scale={0.3}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial 
                  attach="material" 
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.8}
                  roughness={0}
                  metalness={0.8}
                />
              </mesh>
            </mesh>
          </mesh>
          
          {/* Right eye socket */}
          <mesh position={[0.12, 0.05, 0.32]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial 
              attach="material" 
              color="#ffffff" 
              roughness={0.1} 
              metalness={0.1}
            />
            
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
                color="#0f172a" 
                emissive="#000000"
                emissiveIntensity={0.5}
                roughness={0.1}
              />
              
              {/* Right iris */}
              <mesh position={[0, 0, 0.005]} scale={1.3}>
                <ringGeometry args={[0.01, 0.02, 16]} />
                <meshStandardMaterial 
                  attach="material" 
                  color="#334155"
                  emissive="#334155"
                  emissiveIntensity={0.3}
                  roughness={0.1}
                />
              </mesh>
              
              {/* Eye reflection highlight */}
              <mesh position={[0.01, 0.01, 0.03]} scale={0.3}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial 
                  attach="material" 
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.8}
                  roughness={0}
                  metalness={0.8}
                />
              </mesh>
            </mesh>
          </mesh>
          
          {/* Nose - improved 3D nose with fixed rotation format */}
          <mesh position={[0, -0.05, 0.4]}>
            <coneGeometry args={[0.07, 0.15, 16]} />
            <meshStandardMaterial 
              attach="material" 
              color="#e8d0c0" 
              roughness={0.7} 
              metalness={0.1}
            />
            
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
            <meshStandardMaterial 
              attach="material" 
              color="#be185d" 
              roughness={0.5}
              metalness={0.1}
            />
            
            {/* Lower lip */}
            <mesh position={[0, -0.025, 0]}>
              <boxGeometry args={[0.15, 0.02, 0.05]} />
              <meshStandardMaterial 
                attach="material" 
                color="#be185d" 
                roughness={0.6} 
                metalness={0.1}
              />
            </mesh>
            
            {/* Lip highlight */}
            <mesh position={[0, 0.015, 0.03]} scale={[0.8, 0.5, 0.5]}>
              <boxGeometry args={[0.15, 0.01, 0.01]} />
              <meshStandardMaterial 
                attach="material" 
                color="#ec4899" 
                roughness={0.3} 
                metalness={0.2}
              />
            </mesh>
          </mesh>
          
          {/* Eyebrows */}
          <mesh position={[-0.12, 0.15, 0.35]} rotation={[0, 0, Math.PI / 8]}>
            <boxGeometry args={[0.08, 0.02, 0.01]} />
            <meshStandardMaterial 
              attach="material" 
              color="#4a2513" 
              roughness={0.9}
            />
          </mesh>
          
          <mesh position={[0.12, 0.15, 0.35]} rotation={[0, 0, -Math.PI / 8]}>
            <boxGeometry args={[0.08, 0.02, 0.01]} />
            <meshStandardMaterial 
              attach="material" 
              color="#4a2513" 
              roughness={0.9}
            />
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
          
          {/* Subtle facial lines for realism */}
          <mesh position={[0, -0.12, 0.4]} rotation={[Math.PI/2, 0, 0]} scale={[0.7, 0.1, 0.1]}>
            <torusGeometry args={[0.05, 0.002, 8, 16, Math.PI]} />
            <meshStandardMaterial attach="material" color="#d6a889" transparent opacity={0.5} />
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
