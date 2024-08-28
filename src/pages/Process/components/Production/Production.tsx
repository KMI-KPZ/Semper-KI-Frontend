import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessMessages from "@/components/Process/Messages/Messages";
import useProcess from "@/hooks/Process/useProcess";

interface ProcessProductionProps {}

const ProcessProduction: React.FC<ProcessProductionProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <ProcessContainer
      id="Production"
      menuButtonTitle={t(
        "Process.components.Production.Production.button.menu"
      )}
      pageTitle={`${t("Process.components.Production.Production.title")}:`}
      start={ProcessStatus.CONFIRMATION_COMPLETED}
      end={ProcessStatus.PRODUCTION_IN_PROGRESS}
    >
      <ProcessMessages
        messages={process.messages.Production}
        origin="Production"
      />
      {/* <ProcessMessages messages={process.messages.production} origin="Production" />   Akshay */}
    </ProcessContainer>
  );
};

export default ProcessProduction;
