import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessContractProps {}

const ProcessContract: React.FC<ProcessContractProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="offer"
      menuButtonTitle={t("Process.components.Contract.Contract.button.menu")}
      pageTitle={`${t("Process.components.Contract.Contract.title")}:`}
      start={ProcessStatus.CONFIRMED_BY_CONTRACTOR}
      end={ProcessStatus.REJECTED_BY_CONTRACTOR}
    ></ProcessContainer>
  );
};

export default ProcessContract;
