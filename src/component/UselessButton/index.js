import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Cylinder,
  OrbitControls,
  OrthographicCamera,
  Bounds,
  SoftShadows,
  Stage,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionConfig, easeOut } from "framer-motion";

export default function UselessButton() {
  const [clicked, setClicked] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let timeoutID = null;

    const durationLocal = 0.25 + Math.random() * 0.5;
    const timeout = durationLocal * 1000 + Math.random() * 1750;

    setDuration(durationLocal);

    if (clicked) {
      timeoutID = setTimeout(() => {
        setClicked(false);
      }, timeout);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [clicked]);

  return (
    <Canvas shadows linear flat resize={{ scroll: false, offsetSize: true }}>
      <OrthographicCamera
        makeDefault
        position={[10, 10, 10]}
        near={1}
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
      {/* <axesHelper args={[100]} /> */}

      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[-1, 0.75, 0]}
        intensity={1.5}
        // shadow-mapSize={1024}
      />

      {/* <SoftShadows size={25} focus={0} samples={10} /> */}

      <MotionConfig
        transition={{
          duration,
          ease: easeOut,
        }}
      >
        <motion.group
          animate={clicked ? "clicked" : "initial"}
          variants={{
            initial: { y: 0 },
            clicked: { y: -5 },
          }}
          onClick={() => {
            setClicked(true);
          }}
        >
          <Cylinder args={[5, 5, 5, 128]} castShadow>
            <meshStandardMaterial color={"orange"} />
          </Cylinder>
        </motion.group>
      </MotionConfig>

      {/* blocker ground */}
      <mesh
        scale={(100, 100)}
        position={[0, -2.51, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry />
        <meshBasicMaterial color={"white"} />
      </mesh>

      {/* shadow */}
      <mesh
        scale={100}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.5, 0]}
        receiveShadow
      >
        <planeGeometry />
        <shadowMaterial />
      </mesh>
    </Canvas>
  );
}
