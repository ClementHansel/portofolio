"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * BUILD OUT — A voxel sandbox builder.
 *
 * Story: You are a System Architect — literally. The void awaits your design.
 * Place blocks to construct structures from nothing. Your imagination is
 * the only constraint. Build monuments in the digital void.
 *
 * Technical showcase:
 * - Three.js voxel placement system
 * - Raycasting for precise block placement
 * - Multiple block colors/materials
 * - Orbit camera controls
 * - Grid-snapped placement
 * - Undo system
 * - Block count tracking
 */

interface Block {
  x: number;
  y: number;
  z: number;
  color: string;
}

type GameState = "intro" | "building";

const COLORS = ["#06b6d4", "#3b82f6", "#a855f7", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#f1f5f9"];

function VoxelWorld({
  blocks,
  onPlace,
  onRemove,
  currentColor,
}: {
  blocks: Block[];
  onPlace: (pos: THREE.Vector3) => void;
  onRemove: (index: number) => void;
  currentColor: string;
}) {
  const { camera, raycaster, pointer, scene } = useThree();
  const ghostRef = useRef<THREE.Mesh>(null);
  const [ghostPos, setGhostPos] = useState<THREE.Vector3 | null>(null);

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    const objects = scene.children.filter(
      (c) => c.userData.clickable || c.userData.ground
    );
    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      const normal = hit.face?.normal || new THREE.Vector3(0, 1, 0);
      const pos = new THREE.Vector3()
        .copy(hit.point)
        .add(normal.multiplyScalar(0.5));
      pos.x = Math.round(pos.x);
      pos.y = Math.round(pos.y);
      pos.z = Math.round(pos.z);
      if (pos.y < 0) pos.y = 0;
      setGhostPos(pos);
    } else {
      setGhostPos(null);
    }
  });

  const handleClick = () => {
    if (ghostPos) onPlace(ghostPos.clone());
  };

  const handleRightClick = () => {
    raycaster.setFromCamera(pointer, camera);
    const blockMeshes = scene.children.filter((c) => c.userData.clickable);
    const intersects = raycaster.intersectObjects(blockMeshes, false);
    if (intersects.length > 0) {
      const idx = intersects[0].object.userData.index;
      if (typeof idx === "number") onRemove(idx);
    }
  };

  return (
    <>
      {/* Ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        userData={{ ground: true }}
        onClick={handleClick}
        onContextMenu={handleRightClick}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.8} />
      </mesh>

      {/* Grid helper */}
      <gridHelper args={[20, 20, "#334155", "#1e293b"]} position={[0, -0.49, 0]} />

      {/* Blocks */}
      {blocks.map((block, i) => (
        <mesh
          key={`${block.x}-${block.y}-${block.z}-${i}`}
          position={[block.x, block.y, block.z]}
          userData={{ clickable: true, index: i }}
          onClick={handleClick}
          onContextMenu={handleRightClick}
        >
          <boxGeometry args={[0.96, 0.96, 0.96]} />
          <meshStandardMaterial color={block.color} />
        </mesh>
      ))}

      {/* Ghost preview */}
      {ghostPos && (
        <mesh ref={ghostRef} position={[ghostPos.x, ghostPos.y, ghostPos.z]}>
          <boxGeometry args={[0.98, 0.98, 0.98]} />
          <meshStandardMaterial
            color={currentColor}
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      )}
    </>
  );
}

export default function BuildOut() {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [colorIdx, setColorIdx] = useState(0);
  const [history, setHistory] = useState<Block[][]>([]);

  const currentColor = COLORS[colorIdx];

  const placeBlock = useCallback(
    (pos: THREE.Vector3) => {
      const newBlock: Block = { x: pos.x, y: pos.y, z: pos.z, color: currentColor };
      // Prevent duplicate placement
      const exists = blocks.some(
        (b) => b.x === newBlock.x && b.y === newBlock.y && b.z === newBlock.z
      );
      if (exists) return;
      setHistory((h) => [...h, blocks]);
      setBlocks((b) => [...b, newBlock]);
    },
    [blocks, currentColor]
  );

  const removeBlock = useCallback(
    (index: number) => {
      setHistory((h) => [...h, blocks]);
      setBlocks((b) => b.filter((_, i) => i !== index));
    },
    [blocks]
  );

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setBlocks(prev);
    setHistory((h) => h.slice(0, -1));
  };

  const clear = () => {
    setHistory((h) => [...h, blocks]);
    setBlocks([]);
  };

  if (gameState === "intro") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[560px] text-center px-6">
        <div className="max-w-md">
          <div className="text-4xl mb-4">🧱</div>
          <h2 className="text-2xl font-bold text-white mb-4">Build Out</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
            &quot;You are a System Architect — literally. The void awaits your design.
            Place blocks to construct monuments in the digital void. Your imagination
            is the only constraint.&quot;
          </p>
          <div className="text-xs text-[var(--text-muted)] mb-6 space-y-1">
            <p>Left Click — Place block</p>
            <p>Right Click — Remove block</p>
            <p>Scroll/Drag — Orbit camera</p>
            <p>Number keys 1-8 — Change color</p>
          </div>
          <button onClick={() => setGameState("building")} className="neon-btn px-8 py-3">
            Enter Void
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-3 flex-wrap justify-center">
        {/* Color palette */}
        {COLORS.map((c, i) => (
          <button
            key={c}
            onClick={() => setColorIdx(i)}
            className={`w-7 h-7 rounded-md border-2 transition-all ${
              i === colorIdx ? "border-white scale-110" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
            title={`Color ${i + 1}`}
          />
        ))}
        <div className="w-px h-6 bg-[var(--border-subtle)] mx-2" />
        <button
          onClick={undo}
          className="text-xs px-3 py-1 border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] hover:text-white"
        >
          Undo
        </button>
        <button
          onClick={clear}
          className="text-xs px-3 py-1 border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] hover:text-white"
        >
          Clear
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          Blocks: {blocks.length}
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-[450px] rounded-xl border border-[var(--border-subtle)] overflow-hidden bg-[#0a0f1a]">
        <Canvas
          camera={{ position: [8, 6, 8], fov: 50 }}
          onContextMenu={(e) => e.preventDefault()}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, -5]} intensity={0.3} color="#06b6d4" />
          <VoxelWorld
            blocks={blocks}
            onPlace={placeBlock}
            onRemove={removeBlock}
            currentColor={currentColor}
          />
          <OrbitControls
            minDistance={3}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
          <fog attach="fog" args={["#0a0f1a", 15, 30]} />
        </Canvas>
      </div>
    </div>
  );
}
