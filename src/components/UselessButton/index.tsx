"use client";

import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Cylinder, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

function Scene() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [duration, setDuration] = useState(250);

  useEffect(() => {
    if (!clicked) return;

    const durationLocal = 250 + Math.random() * 500;
    const timeout = durationLocal + Math.random() * 2750;

    setDuration(durationLocal);

    const timeoutID = setTimeout(() => {
      setClicked(false);
    }, timeout);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [clicked]);

  const springs = useSpring({
    y: clicked ? -5 : 0,
    config: { duration },
  });

  const { emmisiveIntensity } = useSpring({
    emmisiveIntensity: hovered ? 1 : 0,
    config: { duration: 150 },
  });

  const handleClick = useCallback(() => {
    setClicked(true);
  }, []);

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[10, 10, 10]}
        near={0}
        far={100}
        zoom={10}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        target={[0, 0, 0]}
      />

      <ambientLight intensity={2} color="white" />
      <directionalLight
        castShadow
        position={[-1, 0.75, 0]}
        intensity={5}
        color="white"
        shadow-mapSize={512}
      />

      <animated.group position-y={springs.y} onClick={handleClick}>
        <Cylinder
          args={[5, 5, 5, 128]}
          castShadow
          onPointerEnter={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <animated.meshStandardMaterial
            color="#ff4500"
            roughness={0.8}
            metalness={0.2}
            emissive="#ff4500"
            emissiveIntensity={emmisiveIntensity}
          />
        </Cylinder>
      </animated.group>

      {/* blocker ground */}
      <mesh
        scale={[100, 100, 1]}
        position={[0, -2.51, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* shadow */}
      <mesh
        scale={100}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.5, 0]}
        receiveShadow
      >
        <planeGeometry />
        <animated.shadowMaterial color="black" />
      </mesh>
    </>
  );
}

export default function UselessButton() {
  return (
    <Canvas shadows flat resize={{ scroll: false, offsetSize: true }}>
      <Scene />
    </Canvas>
  );
}
