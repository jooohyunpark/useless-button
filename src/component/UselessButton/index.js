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
  const [hovered, setHovered] = useState(false);

  // const handleChange = (event) => {
  //   setClicked(event.target.checked);
  // };

  useEffect(() => {
    let timeoutID = null;
    let time = 250 + Math.random() * 1750;

    if (clicked) {
      timeoutID = setTimeout(() => {
        setClicked(false);
      }, time);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [clicked]);

  return (
    <Canvas
      shadows
      linear
      flat
      dpr={[1, 2]}
      resize={{ scroll: false, offsetSize: true }}
    >
      <OrthographicCamera
        makeDefault
        position={[10, 10, 10]}
        near={1}
        far={100}
        zoom={10}
      />
      <OrbitControls
        makeDefault
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
        enablePan={false}
        enableRotate={false}
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
          duration: 0.25,
          ease: easeOut,
        }}
      >
        <motion.group
          animate={clicked ? "clicked" : "initial"}
          variants={{
            initial: { y: 0 },
            clicked: { y: -5.2 },
          }}
          onClick={() => {
            setClicked(true);
          }}
          // onPointerOver={() => {
          //   setHovered(true);
          // }}
          // onPointerOut={() => {
          //   setHovered(false);
          // }}
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
