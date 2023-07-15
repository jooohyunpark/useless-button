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
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    let timeoutID = null;
    let time = 250 + Math.random() * 750;

    if (checked) {
      timeoutID = setTimeout(() => {
        setChecked(false);
      }, time);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [checked]);

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
      <directionalLight
        position={[-1, 1, 1]}
        shadow-mapSize={1024}
        castShadow
      />
      <axesHelper args={[100]} />
      <BakeShadows />
      <SoftShadows />

      <Bounds fit clip observe margin={10}>
        <MotionConfig
          transition={{
            type: "spring",
            duration: 0.7,
            bounce: 0.2,
          }}
        >
          <motion.group
            initial={false}
            // animate={isHover ? "hover" : "rest"}
            dispose={null}
            // variants={{
            //   hover: { z: isPress ? -0.9 : 0 },
            // }}
          >
            <Cylinder args={[5, 5, 10, 128]} castShadow>
              <meshStandardMaterial color={"orange"} />
            </Cylinder>
          </motion.group>
        </MotionConfig>
      </Bounds>

      <mesh
        scale={200}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
        receiveShadow
      >
        <planeGeometry />
        <shadowMaterial transparent opacity={0.3} />
      </mesh>
    </Canvas>
  );
}
