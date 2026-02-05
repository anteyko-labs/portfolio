"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion, useNormalizedMousePosition } from "@/lib/hooks";

// Particle field component — кружочки на фоне (цвет задаётся в colors)
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const mousePosition = useNormalizedMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const [positions, colors] = useMemo(() => {
    // Reduce particle count on mobile for performance
    const count = isMobile ? 800 : 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Холодный голубой — насыщеннее, чтобы было заметно на фоне
      const t = Math.random();
      colors[i3] = 0.4 + t * 0.35;
      colors[i3 + 1] = 0.7 + t * 0.3;
      colors[i3 + 2] = 1;
    }

    return [positions, colors];
  }, [isMobile]);

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.012) * 0.12;

    const targetX = (mousePosition.x - 0.5) * 0.5;
    const targetY = (mousePosition.y - 0.5) * -0.4;

    ref.current.rotation.y += (targetX - ref.current.rotation.y * 0.1) * 0.03;
    ref.current.rotation.x += (targetY - ref.current.rotation.x * 0.1) * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.082}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={1}
      />
    </Points>
  );
}

// Second layer: ближние частицы
function ParticleFieldNear() {
  const ref = useRef<THREE.Points>(null);
  const mousePosition = useNormalizedMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const [positions, colors] = useMemo(() => {
    // Reduce particle count on mobile for performance
    const count = isMobile ? 300 : 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 1.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      // Холодный голубой — насыщеннее
      colors[i3] = 0.5;
      colors[i3 + 1] = 0.8;
      colors[i3 + 2] = 1;
    }
    return [positions, colors];
  }, [isMobile]);

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    const targetX = (mousePosition.x - 0.5) * 0.4;
    const targetY = (mousePosition.y - 0.5) * -0.4;
    ref.current.rotation.y += (targetX - ref.current.rotation.y * 0.1) * 0.03;
    ref.current.rotation.x += (targetY - ref.current.rotation.x * 0.1) * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.062}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={1}
      />
    </Points>
  );
}

// Flowing lines component
function FlowingLines() {
  const ref = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  const curves = useMemo(() => {
    const lines: THREE.CatmullRomCurve3[] = [];

    for (let i = 0; i < 7; i++) {
      const points: THREE.Vector3[] = [];
      const offset = (i - 2) * 0.8;

      for (let j = 0; j < 6; j++) {
        points.push(
          new THREE.Vector3(
            -4 + j * 1.6,
            Math.sin(j * 0.5 + i * 0.3) * 0.5 + offset,
            Math.cos(j * 0.3 + i * 0.2) * 0.5
          )
        );
      }

      lines.push(new THREE.CatmullRomCurve3(points));
    }

    return lines;
  }, []);

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;

    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  const accentColor = new THREE.Color("#6366f1");

  return (
    <group ref={ref}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, i < 2 ? 0.018 : 0.012, 8, false]} />
          <meshBasicMaterial
            color={i >= 3 ? accentColor : new THREE.Color().setHSL(0.65 + i * 0.02, 0.8, 0.6)}
            transparent
            opacity={i < 2 ? 0.72 - i * 0.04 : 0.65 - i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// Текстура «наша вселенная» — яркий космос, туманности, много звёзд (вау-эффект)
function useUniverseTexture() {
  return useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Космос: читаемый сине-фиолетовый, не чёрный
    const gradient = ctx.createRadialGradient(
      size * 0.5, size * 0.5, 0,
      size * 0.5, size * 0.5, size * 0.7
    );
    gradient.addColorStop(0, "#2a2540");
    gradient.addColorStop(0.35, "#1a1630");
    gradient.addColorStop(0.65, "#0f0d1a");
    gradient.addColorStop(1, "#08060e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Туманность 1 — яркое ядро
    const nebula1 = ctx.createRadialGradient(
      size * 0.3, size * 0.35, 0,
      size * 0.3, size * 0.35, size * 0.45
    );
    nebula1.addColorStop(0, "rgba(129, 140, 248, 0.45)");
    nebula1.addColorStop(0.4, "rgba(99, 102, 241, 0.25)");
    nebula1.addColorStop(0.7, "rgba(79, 70, 229, 0.1)");
    nebula1.addColorStop(1, "transparent");
    ctx.fillStyle = nebula1;
    ctx.fillRect(0, 0, size, size);

    // Туманность 2 — второе пятно для глубины
    const nebula2 = ctx.createRadialGradient(
      size * 0.65, size * 0.6, 0,
      size * 0.65, size * 0.6, size * 0.35
    );
    nebula2.addColorStop(0, "rgba(99, 102, 241, 0.2)");
    nebula2.addColorStop(0.6, "rgba(79, 70, 229, 0.06)");
    nebula2.addColorStop(1, "transparent");
    ctx.fillStyle = nebula2;
    ctx.fillRect(0, 0, size, size);

    // Звёзды — больше и ярче
    const starCount = 2200;
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random();
      const radius = r < 0.85 ? 1 : r < 0.96 ? 1.5 : 2.2;
      const alpha = r < 0.7 ? 0.6 + Math.random() * 0.4 : 0.85 + Math.random() * 0.15;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);
}

// Иллюминатор: из «дольки» видна наша вселенная — вау-эффект, видимое стекло
function UniversePorthole() {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();
  const universeTexture = useUniverseTexture();

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Мягкое свечение за иллюминатором — чтобы не терялся на фоне */}
      <mesh>
        <ringGeometry args={[0.38, 0.58, 64]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Рамка иллюминатора — металл, читаемый обод */}
      <mesh>
        <ringGeometry args={[0.4, 0.52, 64]} />
        <meshBasicMaterial
          color="#1e1e28"
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Блик «стекла» — тонкое светлое кольцо по внутреннему краю */}
      <mesh>
        <ringGeometry args={[0.38, 0.42, 64]} />
        <meshBasicMaterial
          color="#4a4a5a"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Внутри — полусфера с видом вселенной */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.38, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial
          map={universeTexture}
          side={THREE.BackSide}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
}

// Camera controller: stronger parallax + slight zoom toward center
function CameraController() {
  const { camera } = useThree();
  const mousePosition = useNormalizedMousePosition();
  const prefersReducedMotion = useReducedMotion();

  useFrame(() => {
    if (prefersReducedMotion) return;

    const targetX = (mousePosition.x - 0.5) * 0.8;
    const targetY = (mousePosition.y - 0.5) * -0.5;

    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;

    const distFromCenter = Math.hypot(mousePosition.x - 0.5, mousePosition.y - 0.5);
    const zoom = 1 - distFromCenter * 0.08;
    const targetZ = 5.5 + zoom * 0.5;
    camera.position.z += (targetZ - camera.position.z) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-accent-primary/20 border-t-accent-primary animate-spin" />
    </div>
  );
}

// Hook to detect mobile viewport
function useIsMobile() {
  const { viewport } = useThree();
  // viewport.width is in Three.js units, roughly corresponds to screen width
  // On mobile (< 640px), viewport.width is typically < 6
  return viewport.width < 6;
}

// Main scene component
function Scene() {
  const isMobile = useIsMobile();
  
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.5} />
      <ParticleField />
      <ParticleFieldNear />
      {/* Hide decorative elements on mobile for cleaner UX */}
      {!isMobile && <FlowingLines />}
      {!isMobile && <UniversePorthole />}
    </>
  );
}

// Exported component
interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className }: HeroSceneProps) {
  const prefersReducedMotion = useReducedMotion();

  // Show static gradient for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-radial from-accent-primary/10 via-transparent to-transparent ${className}`}
      />
    );
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 58 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      {/* Лёгкий градиент сверху/снизу, центр оставляем читаемым для точек */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-transparent to-bg-primary/90 pointer-events-none" />
    </div>
  );
}
