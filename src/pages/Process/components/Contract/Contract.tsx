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

  return (
    <ProcessContainer
      id="Contract"
      titleAddition={`${t("Process.components.Contract.heading")}:`}
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
