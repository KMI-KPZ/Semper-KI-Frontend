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
    "overflow-clip w-full h-full rounded-md border-2 max-h-[600px] max-w-[1000px] h-[300px] w-[500px] ",
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
};

export default ModelPreview;
