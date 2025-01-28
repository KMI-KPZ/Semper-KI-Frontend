import { useEffect, useRef } from "react";
import * as OV from "online-3d-viewer";

type ModelPreviewProps = {
  file: string | null;
  className?: string;
  modelName?: string;
};

const ModelPreview = ({ file, className, modelName }: ModelPreviewProps) => {
  const viewerRef = useRef<HTMLDivElement | null>(null); // Reference to the viewer container
  const viewerInstance = useRef<OV.EmbeddedViewer | null>(null); // Reference to the viewer instance

  useEffect(() => {
    if (!file || !modelName) return;

    const initViewer = async () => {
      // OV.SetExternalLibLocation("libs"); // Set external library location
      OV.Init3DViewerElements(); // Initialize 3D Viewer Elements

      // Only initialize if viewerInstance is not already set
      if (!viewerInstance.current) {
        const viewer = new OV.EmbeddedViewer(viewerRef.current, {
          backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
          defaultColor: new OV.RGBColor(200, 200, 200),
          onModelLoaded: () => {
            console.log("Model loaded!");
          },
        });

        viewerInstance.current = viewer;

        // Load the model using the provided file and model name
        const inputFiles = [
          new OV.InputFile(modelName, OV.FileSource.Url, file),
        ];
        viewer.LoadModelFromInputFiles(inputFiles);
      }
    };

    initViewer();

    // Cleanup function to destroy the viewer when unmounting
    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.Destroy();
        viewerInstance.current = null;
      }
    };
  }, []); // Effect will only run once on mount

  if (!file || !modelName) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        Loading Model...
      </div>
    );
  }

  return (
    <div
      className={className}
      ref={viewerRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default ModelPreview;
