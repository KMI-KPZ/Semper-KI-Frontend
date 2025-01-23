import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense, useState, useCallback } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { LoadingAnimation } from "@component-library/index";

// Helper Component for Dynamic Axes with Measurements
const DynamicAxes = ({ size }) => {
  const padding = size.length() * 0.1; // Small padding for visualization
  const fontSize = size.length() * 0.05; // Adjust label font size based on model size

  return (
    <>
      {/* X-Axis Measurement */}
      <Text
        position={[size.x + padding, 0, 0]}
        fontSize={fontSize}
        color="red"
        anchorX="center"
        anchorY="middle"
      >
        {size.x.toFixed(2)} mm
      </Text>
      {/* Y-Axis Measurement */}
      <Text
        position={[0, size.y + padding, 0]}
        fontSize={fontSize}
        color="green"
        anchorX="center"
        anchorY="middle"
      >
        {size.y.toFixed(2)} mm
      </Text>
      {/* Z-Axis Measurement */}
      <Text
        position={[0, 0, size.z + padding]}
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
const STLModel = ({ file, setModelSize }) => {
  const geometry = useLoader(STLLoader, file);

  // Center the geometry and align it to the origin
  geometry.computeBoundingBox();
  if (geometry.boundingBox) {
    const size = geometry.boundingBox.getSize(new THREE.Vector3());
    const min = geometry.boundingBox.min;

    geometry.translate(-min.x, -min.y, -min.z); // Align minimum point to origin
    setModelSize(size); // Pass size to parent
  }

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
  modelName?: string;
}) => {
  const { file, className, interactive = true, modelName } = props;
  const [modelSize, setModelSize] = useState(new THREE.Vector3(1, 1, 1)); // Default size

  const handleScreenshot = useCallback((event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default button behavior
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const screenshotName = modelName ? `${modelName.replace(/[^a-zA-Z0-9]/g, "_")}_screenshot.png` : "canvas_screenshot.png";
  
      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = screenshotName;
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to trigger the download
      document.body.removeChild(link); // Remove the link after triggering the download
    } else {
      console.error("Canvas element not found");
    }
  }, [modelName]);

  if (!file) return <LoadingAnimation />;

  return (
    <div className={className} style={{ position: "relative" }}>
      {/* Dimensions Display */}
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "white",
          padding: "5px",
          borderRadius: "8px",
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

      {/* Canvas */}
      <Canvas
        camera={{
          position: [
            modelSize.length(),
            modelSize.length(),
            modelSize.length(),
          ],
          fov: 50,
        }}
        gl={{ preserveDrawingBuffer: true }} // Enable preserveDrawingBuffer
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
          <STLModel file={file} setModelSize={setModelSize} modelName={modelName} />
          <DynamicAxes size={modelSize} />
          {interactive && <OrbitControls enableDamping />}
        </Suspense>
      </Canvas>

      {/* Screenshot Button */}
      <button
        onClick={handleScreenshot}
        style={{
          position: "absolute",
          bottom: "5px",
          left: "2px",
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "10px 15px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Take Screenshot
      </button>
    </div>
  );
};

export default ModelPreview;
