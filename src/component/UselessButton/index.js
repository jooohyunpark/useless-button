import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Cylinder,
  OrbitControls,
  OrthographicCamera,
  Sphere,
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
      <OrthographicCamera makeDefault position={[10, 10, 10]} />
      <OrbitControls makeDefault maxPolarAngle={Math.PI * 0.5} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[-1, 1, 1]} />
      <axesHelper args={[100]} />

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
          <Sphere args={[1, 32, 32]} />
          <Cylinder args={[5, 5, 10, 128]}>
            <meshStandardMaterial color={"orange"} />
          </Cylinder>
        </motion.group>
      </MotionConfig>
    </Canvas>
  );
}
