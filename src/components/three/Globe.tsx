"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Project locations (lat, lng)
const locations = [
  { name: "Jakarta, Indonesia", lat: -6.2, lng: 106.8, color: "#06b6d4" },
  { name: "Bali, Indonesia", lat: -8.4, lng: 115.2, color: "#10b981" },
  { name: "Auckland, NZ", lat: -36.8, lng: 174.7, color: "#f59e0b" },
  { name: "Kuala Lumpur, MY", lat: 3.1, lng: 101.7, color: "#a855f7" },
  { name: "Singapore", lat: 1.3, lng: 103.8, color: "#3b82f6" },
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeWireframe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  // Generate wireframe lines for the globe
  const wireframePositions = useMemo(() => {
    const points: number[] = [];
    const radius = 2;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      for (let lng = 0; lng < 360; lng += 5) {
        const p1 = latLngToVector3(lat, lng, radius);
        const p2 = latLngToVector3(lat, lng + 5, radius);
        points.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    }

    // Longitude lines
    for (let lng = 0; lng < 360; lng += 20) {
      for (let lat = -80; lat < 80; lat += 5) {
        const p1 = latLngToVector3(lat, lng, radius);
        const p2 = latLngToVector3(lat + 5, lng, radius);
        points.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    }

    return new Float32Array(points);
  }, []);

  return (
    <group ref={globeRef}>
      {/* Wireframe globe */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[wireframePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.15}
        />
      </lineSegments>

      {/* Location markers */}
      {locations.map((loc) => {
        const pos = latLngToVector3(loc.lat, loc.lng, 2.05);
        return (
          <group key={loc.name} position={[pos.x, pos.y, pos.z]}>
            <mesh>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={loc.color} />
            </mesh>
            {/* Pulse ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.05, 0.08, 16]} />
              <meshBasicMaterial
                color={loc.color}
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial
          color="#0a1628"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <GlobeWireframe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
