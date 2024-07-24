import React, { useRef, Suspense, PropsWithChildren } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   OrbitControls,
//   Loader,
//   PerspectiveCamera,
//   OrbitControlsProps,
// } from "@react-three/drei";
import * as THREE from "three";
import { twMerge } from "tailwind-merge";
import { LoadingAnimation } from "@component-library/index";

import * as OV from 'online-3d-viewer';
import ModelViewer from "@/components/ModelViewer";
import ViewerWithUrls from "@/pages/Test/Basic3DViewer";

const Model: React.FC<{ fileURL: string }> = (props) => {
  const { fileURL } = props;
  const modelRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (modelRef.current !== null) {
      modelRef.current.rotation.z += 0.01;
      // modelRef.current.rotation.y = -1;
    }
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

// const CameraControls = () => {
//   const cameraRef = useRef<THREE.PerspectiveCamera>(null);
//   const orbitRef = useRef(null);
//
//   return (
//     <>
//       <PerspectiveCamera
//         makeDefault
//         fov={75}
//         // position={[-0.5, 50, 38]}
//         position={[-0.5, -90, 38]}
//         ref={cameraRef}
//       />
//       <OrbitControls
//         ref={orbitRef}
//         // rotation={[0, 0, 0]} // Set the initial rotation
//         // position={[1, 5, 1]} // Set the initial position of the camera
//         // target={[0, 0, 0]} // Set the initial target or look-at point
//       />
//     </>
//   );
// };

const ModelPreview = (props: {
  file?: string;
  className?: string;
  interactive?: boolean;
}) => {
  const { file, className: _className, interactive = true } = props;

  const className = twMerge(
    "overflow-clip w-full h-full rounded-xl border-2 max-h-[600px] max-w-[1000px] h-[300px] w-[500px] ",
    _className
  );

  if (file === undefined) return <LoadingAnimation />;

  console.log("FileURL für STLPreview: ", file);

  return (
      <ViewerWithUrls  url={file} loadModel={true}/>
    // <ModelViewer
    //   // className={className}
    //   url={file}
    //   // orbitControls={interactive}
    //   // shadows
    //   //
    //   //
    //   // showAxes
    //   // crossOrigin={""}
    //   modelProps={{ color: "red", scale: 1.5 }}
    //  props={{}}/>
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
