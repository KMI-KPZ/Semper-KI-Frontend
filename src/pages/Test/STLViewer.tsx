import { useEffect, useRef, useState } from "react";
import * as OV from "online-3d-viewer";

type ModelPreviewProps = {
  file: string | null;
  className?: string;
  modelName?: string;
};

const ModelPreview = ({ file, className, modelName }: ModelPreviewProps) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const viewerInstance = useRef<OV.EmbeddedViewer | null>(null);
  const [boundingBox, setBoundingBox] = useState<OV.Box3D | null>(null); // State for bounding box

  useEffect(() => {
    if (!file || !modelName) return;

    const initViewer = async () => {
      OV.Init3DViewerElements();

      if (!viewerInstance.current) {
        const viewer = new OV.EmbeddedViewer(viewerRef.current, {
          backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
          defaultColor: new OV.RGBColor(200, 200, 200),
          onModelLoaded: () => {
            if (viewer.GetModel()) {
              const model = viewer.GetModel();
              const box = OV.GetBoundingBox(model); // Calculate bounding box
              setBoundingBox(box);
              console.log("Bounding Box:", box);
            }
          },
        });

        viewerInstance.current = viewer;

        const inputFiles = [
          new OV.InputFile(modelName, OV.FileSource.Url, file),
        ];
        viewer.LoadModelFromInputFiles(inputFiles);
      }
    };

    initViewer();

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.Destroy();
        viewerInstance.current = null;
      }
    };
  }, [file, modelName]);

  // Render Axis Overlay using the bounding box
  const renderAxes = () => {
    if (!boundingBox) return null;

    const sizeX = boundingBox.max.x - boundingBox.min.x;
    const sizeY = boundingBox.max.y - boundingBox.min.y;
    const sizeZ = boundingBox.max.z - boundingBox.min.z;

    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <h4>Size</h4>
        <p>X: {sizeX.toFixed(2)}</p>
        <p>Y: {sizeY.toFixed(2)}</p>
        <p>Z: {sizeZ.toFixed(2)}</p>
      </div>
    );
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {boundingBox && renderAxes()} {/* Render axes if bounding box is available */}
      <div
        ref={viewerRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
};

export default ModelPreview;
