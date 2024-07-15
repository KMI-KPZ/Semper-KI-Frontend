import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessFile, ProcessStatus } from "@/api/Process/Querys/useGetProcess";

import useProcess from "@/hooks/Process/useProcess";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import ProcessFileTable from "../../../../components/Process/File/components/FileTable";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import ProcessUploadCard from "@/components/Process/File/components/UploadCard";
import ProcessFileView from "@/components/Process/File/FileView";

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
      start={ProcessStatus.REQUEST_COMPLETED}
      end={ProcessStatus.OFFER_COMPLETED}
    >
      {/* <Process */}
      <ProcessFileView origin="Contract" />
    </ProcessContainer>
  );
};

export default ProcessContract;
