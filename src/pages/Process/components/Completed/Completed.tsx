import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessCompletedProps {}

const ProcessCompleted: React.FC<ProcessCompletedProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="Completed"
      menuButtonTitle={t("Process.components.Completed.button.menu")}
      pageTitle={`${t("Process.components.Completed.heading")}:`}
      start={ProcessStatus.DELIVERY_COMPLETED}
    ></ProcessContainer>
  );
};

export default ProcessCompleted;
