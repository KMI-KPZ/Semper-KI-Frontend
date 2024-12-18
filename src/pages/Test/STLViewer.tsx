// import { twMerge } from "tailwind-merge";
// import { StlViewer } from "react-stl-viewer";
// import { LoadingAnimation } from "@component-library/index";

// const ModelPreview = (props: {
//   file?: string;
//   className?: string;
//   interactive?: boolean;
// }) => {
//   const { file, className: _className, interactive = true } = props;

//   const className = twMerge(
//     "overflow-clip w-full h-full rounded-md border-2 max-h-[600px] max-w-[1000px] h-[300px] w-[500px] ",
//     _className
//   );

//   if (file === undefined) return <LoadingAnimation />;
//   return (
//     <StlViewer
//       className={className}
//       url={file}
//       orbitControls={interactive}
//       shadows
//       showAxes
//       modelProps={{ color: "red", scale: 1.5 }}
//     />
//   );
//   // return (
//   //   <div
//   //     className={twMerge(
//   //       "h-[600px] w-[1000px] overflow-clip rounded-md border-2",
//   //       className
//   //     )}
//   //   >
//   //     <Canvas>
//   //       <CameraControls />
//   //       <ambientLight intensity={0.7} />
//   //       <directionalLight position={[10, -40, 30]} intensity={2} />
//   //       {file !== undefined ? <Model fileURL={file} /> : <Loading />}
//   //     </Canvas>
//   //   </div>
//   // );
// };

// export default ModelPreview;

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { LoadingAnimation } from "@component-library/index";

const STLModel = (props: { file: string }) => {
  const geometry = useLoader(STLLoader, props.file);

  // Center and scale the geometry
  geometry.computeBoundingBox();
  const center = geometry.boundingBox?.getCenter(new THREE.Vector3());
  if (center) geometry.center();

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const ModelPreview = (props: {
  file?: string;
  className?: string;
  interactive?: boolean;
}) => {
  const { file, className, interactive = true } = props;

  if (!file) return <LoadingAnimation />;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <STLModel file={file} />
          {interactive && <OrbitControls enableDamping />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelPreview;

