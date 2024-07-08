import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessCompletedProps {}

const ProcessCompleted: React.FC<ProcessCompletedProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="delivery"
      menuButtonTitle={t("Process.components.Completed.Completed.button.menu")}
      pageTitle={`${t("Process.components.Completed.Completed.title")}:`}
      start={ProcessStatus.DELIVERY}
      end={ProcessStatus.COMPLETED}
    ></ProcessContainer>
  );
};

export default ProcessCompleted;
