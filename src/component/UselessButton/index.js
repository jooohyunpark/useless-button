import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Cylinder,
  OrbitControls,
  OrthographicCamera,
  Bounds,
  BakeShadows,
  SoftShadows,
} from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";

export default function UselessButton() {
  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setClicked(event.target.checked);
  };

  useEffect(() => {
    let timeoutID = null;
    let time = 250 + Math.random() * 750;

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
    <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <OrthographicCamera
        makeDefault
        position={[10, 10, 10]}
        near={1}
        far={100}
      />
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI * 0.5}
        enablePan={false}
        target={[0, 0, 0]}
        // enableZoom={false}
      />
      <ambientLight intensity={0.3} />
      {/* <directionalLight position={[-1, 1, 1]} castShadow /> */}
      <directionalLight
        castShadow
        position={[-5, 5, 5]}
        intensity={1.5}
        shadow-mapSize={1024}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <axesHelper args={[100]} />
      <BakeShadows size={25} focus={0} samples={10} />
      <SoftShadows />

      <Bounds fit clip observe margin={10}>
        <MotionConfig
          transition={{
            duration: 0.7,
          }}
        >
          <motion.group
            animate={clicked ? "clicked" : "initial"}
            variants={{
              initial: { y: 0 },
              clicked: { y: -2.5 },
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
      </Bounds>

      <mesh
        scale={100}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.5, 0]}
        receiveShadow
      >
        <planeGeometry />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>
    </Canvas>
  );
}
