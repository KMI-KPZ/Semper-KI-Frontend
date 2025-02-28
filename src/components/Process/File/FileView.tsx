import React from "react";
import { Button, Container } from "@component-library/index";
import {
  ProcessOrigin,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ProcessFileTable from "./components/FileTable";
import ProcessUploadCard from "./components/UploadCard";
import ProcessStatusGate from "@/components/Process/StatusGate";
import { useTranslation } from "react-i18next";

interface ProcessFileViewProps {
  origin: ProcessOrigin;
  endStatus: ProcessStatus;
  collapsed?: boolean;
  collapsible?: boolean;
}

const ProcessFileView: React.FC<ProcessFileViewProps> = (props) => {
  const { origin, endStatus, collapsed = false, collapsible = false } = props;
  const { t } = useTranslation();
  const [files, setFiles] = React.useState<File[]>([]);
  const [showFiles, setShowFiles] = React.useState<boolean>(!collapsed);

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

  const handleOnButtonClickFile = () => {
    setShowFiles((prevState) => !prevState);
  };

  return (
    <Container width="full" direction="col">
      {(collapsible && showFiles) || !collapsible ? (
        <>
          <ProcessFileTable
            files={process.files}
            type="current"
            origin={origin}
          />
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
        </>
      ) : null}
      {collapsible ? (
        <Button
          size="sm"
          title={t(
            showFiles
              ? "Process.components.Request.button.hideFiles"
              : "Process.components.Request.button.showFiles"
          )}
          onClick={handleOnButtonClickFile}
        />
      ) : null}
    </Container>
  );
};

export default ProcessFileView;
