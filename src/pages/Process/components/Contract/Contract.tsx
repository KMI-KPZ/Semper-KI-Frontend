import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container";
import { ProcessFile, ProcessStatus } from "@/api/Process/Querys/useGetProcess";

import ProcessFileView from "@/components/Process/File/FileView";
import ProcessMessages from "@/components/Process/Messages/Messages";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useProcess from "@/hooks/Process/useProcess";

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
      end={ProcessStatus.OFFER_REJECTED}
    >
      <ProcessMessages messages={process.messages.Contract} origin="Contract" />
      <ProcessFileView origin="Contract" />
    </ProcessContainer>
  );
};

export default ProcessContract;
