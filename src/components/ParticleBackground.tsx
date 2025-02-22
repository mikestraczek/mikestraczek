"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

function Scene() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(3000 * 3);

    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    return pos;
  });

  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.x -= delta / (hovered ? 20 : 30);
    ref.current.rotation.y -= delta / (hovered ? 25 : 35);
  });

  return (
    <group
      rotation={[0, 0, Math.PI / 4]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={hovered ? "#ffd1dc" : "#ffb6c1"}
          size={hovered ? 0.04 : 0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={hovered ? 0.9 : 0.8}
          alphaTest={0.01}
          vertexColors={true}
        />
      </Points>
    </group>
  );
}

export const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
