import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import ProcessMessages from "@/components/Process/Messages/Messages";

interface ProcessClarifyProps {}

const ProcessClarify: React.FC<ProcessClarifyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <ProcessContainer
      id="Clarification"
      menuButtonTitle={t("Process.components.Clarify.Clarify.button.menu")}
      pageTitle={`${t("Process.components.Clarify.Clarify.title")}:`}
      start={ProcessStatus.VERIFYING_COMPLETED}
      end={ProcessStatus.VERIFYING_COMPLETED}
    >
      <ProcessMessages
        messages={process.messages.Clarification}
        origin="Clarification"
      />
      {/* <ProcessMessages messages={process.messages.clarification} origin="Clarification" /> //Akshay */}
    </ProcessContainer>
  );
};

export default ProcessClarify;
