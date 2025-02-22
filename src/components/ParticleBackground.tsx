"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Scene() {
  const ref = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();

  const positions = useMemo(() => {
    const particleCount = isMobile ? 100 : 3000;
    const pos = new Float32Array(particleCount * 3);
    const spread = isMobile ? 4 : 15;

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * spread;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * spread;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * (isMobile ? 0.5 : 5);
    }

    return pos;
  }, [isMobile]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const rotationSpeed = isMobile ? 8 : 1;
    ref.current.rotation.x -= delta / (50 * rotationSpeed);
    ref.current.rotation.y -= delta / (55 * rotationSpeed);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={"#000"}
          size={isMobile ? 0.15 : 0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={isMobile ? 0.4 : 0.8}
          alphaTest={0.01}
        />
      </Points>
    </group>
  );
}

export const ParticleBackground = () => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
      <Canvas
        className="h-full w-full"
        camera={{
          position: [0, 0, isMobile ? 8 : 5],
          fov: isMobile ? 50 : 75,
        }}
        gl={{
          alpha: true,
          antialias: !isMobile, // Antialiasing nur für Desktop
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobile ? [0.5, 0.8] : [1, 2]} // Höhere DPR für Desktop
      >
        <Scene />
      </Canvas>
    </div>
  );
};
