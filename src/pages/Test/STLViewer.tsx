import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense, useState } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { LoadingAnimation } from "@component-library/index";

// Helper Component for Dynamic Axes with Measurements
const DynamicAxes = ({ size }: { size: THREE.Vector3 }) => {
  const padding = size.length() * 0.1; // Small padding for visualization
  const fontSize = size.length() * 0.05; // Adjust label font size based on model size

  return (
    <>
      {/* X-Axis Measurement */}
      <Text
        position={[size.x, 0, 0]}
        fontSize={fontSize}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        {size.x.toFixed(2)} mm
      </Text>
      {/* Y-Axis Measurement */}
      <Text
        position={[0, size.y, 0]}
        fontSize={fontSize}
        color="green"
        anchorX="center"
        anchorY="middle"
      >
        {size.y.toFixed(2)} mm
      </Text>
      {/* Z-Axis Measurement */}
      <Text
        position={[0, 0, size.z]}
        fontSize={fontSize}
        color="blue"
        anchorX="center"
        anchorY="middle"
      >
        {size.z.toFixed(2)} mm
      </Text>

      {/* Axes Helper */}
      <primitive object={new THREE.AxesHelper(size.length() + padding)} />
    </>
  );
};

// Utility to process BufferGeometry for STL files
const processGeometry = (geometry: THREE.BufferGeometry, setModelSize: (size: THREE.Vector3) => void) => {
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  if (geometry.boundingBox) {
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    geometry.translate(-center.x, -center.y, -center.z);
    const size = geometry.boundingBox.getSize(new THREE.Vector3());
    setModelSize(size);
  }
};

// Utility to process Object3D for FBX and OBJ files
const processObject = (object: THREE.Object3D, setModelSize: (size: THREE.Vector3) => void) => {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const geometry = child.geometry as THREE.BufferGeometry;
      processGeometry(geometry, setModelSize);
    }
  });

  const boundingBox = new THREE.Box3().setFromObject(object);
  const size = boundingBox.getSize(new THREE.Vector3());
  setModelSize(size);
};

// STL Model Component
const STLModel = (props: {
  file: string;
  modelName: string;
  setModelSize: (size: THREE.Vector3) => void;
}) => {
  const { file, modelName, setModelSize } = props;
  const extension = modelName.split('.').pop()?.toLowerCase();

  let object: THREE.Object3D | THREE.BufferGeometry;

  if (extension === "stl") {
    const geometry = useLoader(STLLoader, file);
    processGeometry(geometry, setModelSize);
    return (
      <mesh geometry={geometry} scale={[1, 1, 1]}>
        <meshStandardMaterial color="red" />
      </mesh>
    );
  } else if (extension === "fbx") {
    object = useLoader(FBXLoader, file);
  } else if (extension === "obj") {
    object = useLoader(OBJLoader, file);
  } else {
    throw new Error("Unsupported file format");
  }

  // Process FBX and OBJ files
  processObject(object, setModelSize);

  return <primitive object={object} scale={[1, 1, 1]} />;
};

// Main Model Preview Component
const ModelPreview = (props: {
  file?: string;
  className?: string;
  interactive?: boolean;
  modelName?: string;
}) => {
  const { file, className, interactive = true, modelName } = props;
  const [modelSize, setModelSize] = useState(new THREE.Vector3(1, 1, 1)); // Default size

  if (!file) return <LoadingAnimation />;

  return (
    <div className={className} style={{ position: "relative" }}>
      {/* Display Dimensions in Upper Right Corner */}
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "0.5px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "white",
          padding: "5px",
          borderRadius: "8px",
          fontSize: "12px",
        }}
      >
        <div>
          <span style={{ color: "red" }}>Length:</span> {modelSize.x.toFixed(2)} mm
        </div>
        <div>
          <span style={{ color: "green" }}>Width:</span> {modelSize.y.toFixed(2)} mm
        </div>
        <div>
          <span style={{ color: "blue" }}>Height:</span> {modelSize.z.toFixed(2)} mm
        </div>
      </div>

      <Canvas
        camera={{
          position: [modelSize.length() * 2, modelSize.length() * 2, modelSize.length() * 2],
          near: 0.1,
          far: modelSize.length() * 10,
          fov: 50,
        }}
        gl={{ antialias: true }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} shadow-bias={-0.001} />

          {/* STL Model */}
          <STLModel file={file} setModelSize={setModelSize} modelName={modelName} />

          {/* Dynamic Axes with Measurements */}
          <DynamicAxes size={modelSize} />

          {/* Interactive Controls */}
          {interactive && <OrbitControls enableDamping />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelPreview;
