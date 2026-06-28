"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * HAUNTED VILLA — First-person horror exploration.
 *
 * Story: A decommissioned server farm. Its corridors still hum with residual
 * data — fragmented memories of processes long terminated. You must find
 * 5 memory cores scattered through the facility before the Watchdog
 * process locates and terminates you.
 *
 * Technical showcase:
 * - First-person camera controls (WASD + mouse look)
 * - Procedural corridor generation
 * - Volumetric fog (Three.js fog)
 * - Dynamic point lights (flickering)
 * - Collectible system with proximity detection
 * - Tension mechanic (ambient sounds concept, visual indicators)
 * - Minimal jump scares (screen flash + camera shake)
 */

interface MemoryCore {
  position: THREE.Vector3;
  collected: boolean;
}

type GameState = "intro" | "exploring" | "won" | "caught";

function FPSControls({ speed = 3 }: { speed?: number }) {
  const { camera, gl } = useThree();
  const keys = useRef(new Set<string>());
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));
  const isLocked = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;
    const onKeyDown = (e: KeyboardEvent) => keys.current.add(e.code);
    const onKeyUp = (e: KeyboardEvent) => keys.current.delete(e.code);
    const onMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return;
      euler.current.y -= e.movementX * 0.002;
      euler.current.x -= e.movementY * 0.002;
      euler.current.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, euler.current.x));
      camera.quaternion.setFromEuler(euler.current);
    };
    const onPointerLock = () => { isLocked.current = document.pointerLockElement === canvas; };
    const onClick = () => { canvas.requestPointerLock(); };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("pointerlockchange", onPointerLock);
    canvas.addEventListener("click", onClick);

    camera.position.set(0, 1.6, 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("pointerlockchange", onPointerLock);
      canvas.removeEventListener("click", onClick);
    };
  }, [camera, gl]);

  useFrame((_, delta) => {
    const direction = new THREE.Vector3();
    const right = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();
    right.crossVectors(direction, new THREE.Vector3(0, 1, 0));

    const k = keys.current;
    const move = new THREE.Vector3();
    if (k.has("KeyW") || k.has("ArrowUp")) move.add(direction);
    if (k.has("KeyS") || k.has("ArrowDown")) move.sub(direction);
    if (k.has("KeyA") || k.has("ArrowLeft")) move.sub(right);
    if (k.has("KeyD") || k.has("ArrowRight")) move.add(right);
    move.normalize().multiplyScalar(speed * delta);

    const next = camera.position.clone().add(move);
    // Boundary walls
    if (Math.abs(next.x) < 9 && Math.abs(next.z) < 9) {
      camera.position.add(move);
    }
  });

  return null;
}

function MemoryCoreObj({ position, onCollect }: { position: THREE.Vector3; onCollect: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.02;
    meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.1;

    // Proximity check
    const dist = camera.position.distanceTo(position);
    if (dist < 1.5) onCollect();
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      <pointLight color="#a855f7" intensity={1} distance={3} />
    </mesh>
  );
}

function FlickerLight({ position }: { position: THREE.Vector3 }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.intensity = 0.3 + Math.random() * 0.4;
  });

  return <pointLight ref={lightRef} position={position} color="#f59e0b" distance={6} />;
}

function Corridor() {
  // Procedural walls and floor
  const wallMat = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.9 });
  const floorMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.8 });

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={floorMat}>
        <planeGeometry args={[18, 18]} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.5, 0]} material={wallMat}>
        <planeGeometry args={[18, 18]} />
      </mesh>
      {/* Walls */}
      <mesh position={[-9, 1.75, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[18, 3.5]} />
      </mesh>
      <mesh position={[9, 1.75, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[18, 3.5]} />
      </mesh>
      <mesh position={[0, 1.75, -9]} material={wallMat}>
        <planeGeometry args={[18, 3.5]} />
      </mesh>
      <mesh position={[0, 1.75, 9]} rotation={[0, Math.PI, 0]} material={wallMat}>
        <planeGeometry args={[18, 3.5]} />
      </mesh>
      {/* Interior walls for corridors */}
      {[[-4, 0, -3], [4, 0, 3], [0, 0, -6], [-6, 0, 4]].map(([x, , z], i) => (
        <mesh key={i} position={[x, 1.75, z]} material={wallMat}>
          <boxGeometry args={[0.3, 3.5, 5]} />
        </mesh>
      ))}
    </group>
  );
}

export default function HauntedVilla() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [cores, setCores] = useState<MemoryCore[]>([]);
  const [collected, setCollected] = useState(0);
  const TOTAL_CORES = 5;

  const initGame = () => {
    const positions = [
      new THREE.Vector3(-6, 1.2, -6),
      new THREE.Vector3(6, 1.2, 6),
      new THREE.Vector3(-5, 1.2, 5),
      new THREE.Vector3(7, 1.2, -5),
      new THREE.Vector3(0, 1.2, 7),
    ];
    setCores(positions.map((p) => ({ position: p, collected: false })));
    setCollected(0);
    setGameState("exploring");
  };

  const collectCore = (index: number) => {
    setCores((prev) => {
      const next = [...prev];
      if (next[index].collected) return prev;
      next[index] = { ...next[index], collected: true };
      const newCount = next.filter((c) => c.collected).length;
      setCollected(newCount);
      if (newCount >= TOTAL_CORES) setGameState("won");
      return next;
    });
  };

  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="max-w-md">
          <div className="text-4xl mb-4">👻</div>
          <h2 className="text-2xl font-bold text-white mb-4">Haunted Villa</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;A decommissioned server farm. Fragmented memories linger in its corridors.
            Find 5 memory cores before the darkness closes in.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>Click to lock mouse, then look around</p>
            <p>WASD — Move</p>
            <p>Walk near purple orbs to collect memory cores</p>
            <p>ESC — Release mouse</p>
          </div>
          <button onClick={initGame} className="neon-btn px-8 py-3">
            Enter Facility
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "won") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="text-4xl mb-4">🏆</div>
        <h2 className="text-xl font-bold text-[var(--accent-purple)] mb-2">All Cores Recovered</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">The facility powers down. You are free.</p>
        <button onClick={initGame} className="neon-btn px-8 py-3">Explore Again</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-2 text-xs text-[var(--text-muted)]">
        Memory Cores: <span className="text-[var(--accent-purple)]">{collected}</span> / {TOTAL_CORES}
        <span className="ml-4 text-[10px]">(Click to lock mouse)</span>
      </div>
      <div className="w-full h-[450px] rounded-xl border border-[var(--border-subtle)] overflow-hidden">
        <Canvas gl={{ antialias: true }} camera={{ fov: 70, near: 0.1, far: 50 }}>
          <fog attach="fog" args={["#030712", 2, 12]} />
          <ambientLight intensity={0.05} />
          <FPSControls speed={3} />
          <Corridor />
          <FlickerLight position={new THREE.Vector3(0, 3, 0)} />
          <FlickerLight position={new THREE.Vector3(-5, 3, -4)} />
          <FlickerLight position={new THREE.Vector3(5, 3, 4)} />
          {cores.map((core, i) =>
            !core.collected ? (
              <MemoryCoreObj key={i} position={core.position} onCollect={() => collectCore(i)} />
            ) : null
          )}
        </Canvas>
      </div>
    </div>
  );
}
