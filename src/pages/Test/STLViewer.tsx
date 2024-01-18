import React, { useRef, Suspense, PropsWithChildren } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Loader,
  PerspectiveCamera,
  OrbitControlsProps,
} from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { twMerge } from "tailwind-merge";
import { StlViewer } from "react-stl-viewer";
import { LoadingAnimation } from "@component-library/index";

const Model: React.FC<{ fileURL: string }> = (props) => {
  const { fileURL } = props;
  const modelRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (modelRef.current !== null) {
      modelRef.current.rotation.z += 0.01;
      // modelRef.current.rotation.y = -1;
    }
  });
  const loader = new STLLoader();
  loader.load(fileURL, (geometry) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x9686d9 });
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
        // position={[-0.5, 50, 38]}
        position={[-0.5, -90, 38]}
        ref={cameraRef}
      />
      <OrbitControls
        ref={orbitRef}
        // rotation={[0, 0, 0]} // Set the initial rotation
        // position={[1, 5, 1]} // Set the initial position of the camera
        // target={[0, 0, 0]} // Set the initial target or look-at point
      />
    </>
  );
};

const ModelPreview = (props: { file?: string; className?: string }) => {
  const { file, className: _className } = props;

  const className = twMerge(
    "overflow-clip w-full h-full rounded-xl border-2 ",
    _className
  );

  if (file === undefined) return <LoadingAnimation />;
  return (
    <StlViewer
      className={className}
      url={file}
      orbitControls
      shadows
      showAxes
      modelProps={{ color: "red", scale: 1.5 }}
    />
  );
  // return (
  //   <div
  //     className={twMerge(
  //       "h-[600px] w-[1000px] overflow-clip rounded-xl border-2",
  //       className
  //     )}
  //   >
  //     <Canvas>
  //       <CameraControls />
  //       <ambientLight intensity={0.7} />
  //       <directionalLight position={[10, -40, 30]} intensity={2} />
  //       {file !== undefined ? <Model fileURL={file} /> : <Loading />}
  //     </Canvas>
  //   </div>
  // );
};

export default ModelPreview;
