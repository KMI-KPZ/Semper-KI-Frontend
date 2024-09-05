import { twMerge } from "tailwind-merge";
import { StlViewer } from "react-stl-viewer";
import { LoadingAnimation } from "@component-library/index";

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
  return (
    <StlViewer
      className={className}
      url={file}
      orbitControls={interactive}
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
