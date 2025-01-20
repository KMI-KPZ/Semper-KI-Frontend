import React from "react";
import { Container } from "@component-library/index";
import {
  ProcessOrigin,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ProcessFileTable from "./components/FileTable";
import ProcessUploadCard from "./components/UploadCard";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";

interface ProcessFileViewProps {
  origin: ProcessOrigin;
  endStatus: ProcessStatus;
}

const ProcessFileView: React.FC<ProcessFileViewProps> = (props) => {
  const { origin, endStatus } = props;
  const [files, setFiles] = React.useState<File[]>([]);

  const { process } = useProcess();

  const addFiles = (newFiles: File[]) => {
    setFiles((prevState) => [...prevState, ...newFiles]);
  };

  const resetUploadFiles = () => {
    setFiles([]);
  };

  const deleteFile = (fileIndex: number) => {
    setFiles((prevState) =>
      prevState.filter((_, index) => index !== fileIndex)
    );
  };

  return (
    <Container width="full" direction="col">
      <ProcessFileTable files={process.files} type="current" origin={origin} />
      <ProcessFileTable
        origin={origin}
        files={files}
        type="upload"
        resetUploadFiles={resetUploadFiles}
        deleteFile={deleteFile}
      />
      <ProcessStatusGate endExclude end={endStatus}>
        <ProcessUploadCard addFiles={addFiles} />
      </ProcessStatusGate>
    </Container>
  );
};

export default ProcessFileView;
