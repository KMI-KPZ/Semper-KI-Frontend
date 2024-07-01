import ProcessContainer from "@/components/Process/Container";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessHeader from "@/components/Process/Header";

interface ProcessRequestProps {}

const ProcessRequest: React.FC<ProcessRequestProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer id="request">
      <ProcessHeader
        menuTitle={t("Process.components.Request.Request.button.menu")}
        pageTitle={t("Process.components.Request.Request.title")}
      ></ProcessHeader>
      <ProcessStatusButtons
        start={ProcessStatus.VERIFIED}
        end={ProcessStatus.REQUESTED}
      />
    </ProcessContainer>
  );
};

export default ProcessRequest;
