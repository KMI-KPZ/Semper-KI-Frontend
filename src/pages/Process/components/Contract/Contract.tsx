import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessFile, ProcessStatus } from "@/api/Process/Querys/useGetProcess";

import useProcess from "@/hooks/Process/useProcess";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import ProcessFileTable from "./components/FileTable";
import ProcessUploadCard from "@/components/Process/UploadCard";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

interface ProcessContractProps {}

const ProcessContract: React.FC<ProcessContractProps> = (props) => {
  const {} = props;
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
    <ProcessContainer
      id="Contract"
      menuButtonTitle={t("Process.components.Contract.Contract.button.menu")}
      pageTitle={`${t("Process.components.Contract.Contract.title")}:`}
      start={ProcessStatus.CLARIFICATION}
      end={ProcessStatus.CONFIRMED_BY_CONTRACTOR}
    >
      <Container width="full" direction="col">
        <Text>
          {t(
            process.client === user.hashedID ||
              process.client === user.organization
              ? "Process.components.Contract.Contract.user"
              : "Process.components.Contract.Contract.orga"
          )}
        </Text>
      </Container>
      <ProcessFileTable files={process.files} type="current" />
      <ProcessFileTable
        files={files}
        type="upload"
        resetUploadFiles={resetUploadFiles}
      />
      <ProcessUploadCard addFiles={addFiles} />
    </ProcessContainer>
  );
};

export default ProcessContract;
