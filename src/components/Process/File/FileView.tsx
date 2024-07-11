import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { ProcessOrigin } from "@/api/Process/Querys/useGetProcess";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useProcess from "@/hooks/Process/useProcess";
import ProcessFileTable from "./components/FileTable";
import ProcessUploadCard from "./components/UploadCard";

interface ProcessFileViewProps {
  origin: ProcessOrigin;
}

const ProcessFileView: React.FC<ProcessFileViewProps> = (props) => {
  const { origin } = props;
  const { t } = useTranslation();
  const [files, setFiles] = React.useState<File[]>([]);
  const { user } = useAuthorizedUser();

  const { process } = useProcess();

  const addFiles = (newFiles: File[]) => {
    setFiles((prevState) => [...prevState, ...newFiles]);
  };

  const resetUploadFiles = () => {
    setFiles([]);
  };

  return (
    <Container width="full" direction="col">
      {/* <Container width="full" direction="col">
        <Text>
          {t(
            process.client === user.hashedID ||
              process.client === user.organization
              ? "Process.components.Contract.Contract.user"
              : "Process.components.Contract.Contract.orga"
          )}
        </Text>
      </Container> */}
      <ProcessFileTable files={process.files} type="current" origin={origin} />
      <ProcessFileTable
        origin={origin}
        files={files}
        type="upload"
        resetUploadFiles={resetUploadFiles}
      />
      <ProcessUploadCard addFiles={addFiles} />
    </Container>
  );
};

export default ProcessFileView;
