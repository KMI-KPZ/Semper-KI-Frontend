import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Loader,
  PerspectiveCamera,
  OrbitControlsProps,
} from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import logger from "@/hooks/useLogger";

const Model: React.FC<{ fileURL: string }> = (props) => {
  const { fileURL } = props;
  const modelRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (modelRef.current !== null) {
      modelRef.current.rotation.z += 0.01;
    }
  });
  const loader = new STLLoader();
  loader.load(fileURL, (geometry) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x6e57ca });
    const mesh = new THREE.Mesh(geometry, material);
    modelRef.current?.add(mesh);
  });

  return <group ref={modelRef} />;
};

const Loading = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="lightgray" />
    </mesh>
  );
};

const CameraControls = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const orbitRef = useRef(null);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={75}
        position={[-0.5, -90, 38]}
        ref={cameraRef}
      />
      <OrbitControls
        ref={orbitRef}
        // rotation={[0, 0, 0]} // Set the initial rotation
        // position={[0, 0, 0]} // Set the initial position of the camera
        // target={[0, 0, 0]} // Set the initial target or look-at point
      />
    </>
  );
};

const ModelPreview = (props: { file?: string }) => {
  const { file } = props;

  return (
    <div className="h-[800px] w-[1000px]">
      <Canvas>
        <CameraControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {file !== undefined ? <Model fileURL={file} /> : <Loading />}
      </Canvas>
    </div>
  );
};

export default ModelPreview;
