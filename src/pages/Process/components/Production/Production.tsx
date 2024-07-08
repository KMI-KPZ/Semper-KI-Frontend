import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessProductionProps {}

const ProcessProduction: React.FC<ProcessProductionProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer
      id="production"
      menuButtonTitle={t(
        "Process.components.Production.Production.button.menu"
      )}
      pageTitle={`${t("Process.components.Production.Production.title")}:`}
      start={ProcessStatus.CONFIRMED_BY_CONTRACTOR}
      end={ProcessStatus.PRODUCTION}
    ></ProcessContainer>
  );
};

export default ProcessProduction;
