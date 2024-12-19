import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense, useState } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
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

// STL Model Component
const STLModel = (props: {
  file: string;
  setModelSize: (size: THREE.Vector3) => void;
}) => {
  const geometry = useLoader(STLLoader, props.file);

  // Center the geometry and align it to the origin
  geometry.computeBoundingBox();
  const size = geometry.boundingBox?.getSize(new THREE.Vector3());
  const min = geometry.boundingBox?.min;

  if (min) {
    geometry.translate(-min.x, -min.y, -min.z); // Align minimum point to origin
  }

  if (size) props.setModelSize(size); // Pass size to parent for axes adjustment

  return (
    <mesh geometry={geometry} scale={[1, 1, 1]}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

// Main Model Preview Component
const ModelPreview = (props: {
  file?: string;
  className?: string;
  interactive?: boolean;
}) => {
  const { file, className, interactive = true } = props;
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
          color: "black",
          padding: "5px",
          borderRadius: "8px",
          fontSize: "7px",
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
        camera={{ position: [modelSize.length(), modelSize.length(), modelSize.length()], fov: 50 }}
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
          <directionalLight position={[10, 10, 10]} intensity={1} />

          {/* STL Model */}
          <STLModel file={file} setModelSize={setModelSize} />

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
