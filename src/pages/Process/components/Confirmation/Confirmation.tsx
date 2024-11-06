import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessConfirmationProps {}

const ProcessConfirmation: React.FC<ProcessConfirmationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="Confirmation"
      menuButtonTitle={t(
        "Process.components.Confirmation.Confirmation.button.menu"
      )}
      pageTitle={`${t(
        "Process.components.Confirmation.Confirmation.heading"
      )}:`}
      start={ProcessStatus.OFFER_COMPLETED}
      end={ProcessStatus.OFFER_REJECTED}
    ></ProcessContainer>
  );
};

export default ProcessConfirmation;
