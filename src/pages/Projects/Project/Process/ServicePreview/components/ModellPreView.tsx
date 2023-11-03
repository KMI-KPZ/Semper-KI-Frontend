import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";

interface ProcessServiceManufacturingModelPreviewProps {
  modelUrl: string;
}

const ProcessServiceManufacturingModelPreview: React.FC<
  ProcessServiceManufacturingModelPreviewProps
> = ({ modelUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    // const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new STLLoader();
    loader.load(modelUrl, (geometry) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x111111,
        shininess: 200,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      //   controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, [canvasRef, modelUrl]);

  return <canvas ref={canvasRef} />;
};

export default ProcessServiceManufacturingModelPreview;
