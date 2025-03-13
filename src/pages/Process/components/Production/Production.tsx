import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
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
      titleAddition={`${t("Process.components.Production.heading")}:`}
      start={ProcessStatus.CONFIRMATION_COMPLETED}
      end={ProcessStatus.PRODUCTION_IN_PROGRESS}
    >
      <ProcessMessages
        messages={process.messages.Production}
        origin="Production"
      />
    </ProcessContainer>
  );
};

export default ProcessProduction;
