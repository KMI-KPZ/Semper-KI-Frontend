import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useLayoutEffect } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { LoadingAnimation } from "@component-library/index";
import { AxesHelper } from "three";

const STLModel = (props: { file: string }) => {
  const geometry = useLoader(STLLoader, props.file);

  // Center and scale the geometry
  geometry.computeBoundingBox();
  const center = geometry.boundingBox?.getCenter(new THREE.Vector3());
  const size = geometry.boundingBox?.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size?.x || 1, size?.y || 1, size?.z || 1);
  const scaleFactor = 1 / maxDimension; // Scale to fit within a unit cube

  if (center) geometry.center();
  console.log('center:', center)
  console.log('size:', size)

  return (
    <mesh geometry={geometry} scale={[scaleFactor, scaleFactor, scaleFactor]}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

function Upper(props: { file: string }) {
  const geomUpper = useLoader(STLLoader, props.file)
  useLayoutEffect(() => {
    const mesh = new THREE.Mesh(geomUpper);
    const box = new THREE.Box3();
    box.expandByObject(mesh);
  }, [props.file])
  return <primitive object={geomUpper} />
}

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
        camera={{ position: [10, 10, 10], fov: 75 }}
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
          <Upper file={file} />
          {interactive && <OrbitControls enableDamping />}
          <primitive object={new AxesHelper(5)} position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelPreview;

