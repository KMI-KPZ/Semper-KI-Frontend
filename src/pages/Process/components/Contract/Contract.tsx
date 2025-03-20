import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessFileView from "@/components/Process/File/FileView";
import ProcessMessages from "@/components/Process/Messages/Messages";
import useProcess from "@/hooks/Process/useProcess";
import ContractUpload from "./ContractUpload";

interface ProcessContractProps {}

const ProcessContract: React.FC<ProcessContractProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  const getAddtionalTitle = () => {
    const contractFiles = process.files.filter(
      (file) => file.origin === "ContractFiles"
    );
    if (
      contractFiles.length === 0 &&
      process.processStatus === ProcessStatus.REQUEST_COMPLETED
    ) {
      return t("Process.components.Contract.noContract");
    }
    if (
      contractFiles.length > 0 &&
      process.processStatus === ProcessStatus.REQUEST_COMPLETED
    ) {
      return t("Process.components.Contract.isContract");
    }
    if (process.processStatus === ProcessStatus.OFFER_REJECTED) {
      return t("Process.components.Contract.rejectedClient");
    }
    if (process.processStatus === ProcessStatus.OFFER_COMPLETED)
      return t("Process.components.Contract.acceptedClient");
    if (process.processStatus === ProcessStatus.CONFIRMATION_REJECTED)
      return t("Process.components.Contract.rejectedContractor");
    if (process.processStatus === ProcessStatus.CONFIRMATION_COMPLETED)
      return t("Process.components.Contract.acceptedContractor");
  };

  return (
    <ProcessContainer
      id="Contract"
      titleAddition={getAddtionalTitle()}
      start={ProcessStatus.REQUEST_COMPLETED}
      end={ProcessStatus.OFFER_REJECTED}
    >
      <ProcessMessages messages={process.messages.Contract} origin="Contract" />
      <ProcessFileView
        origin="Contract"
        endStatus={ProcessStatus.OFFER_COMPLETED}
      />
      <ContractUpload />
    </ProcessContainer>
  );
};

export default ProcessContract;
