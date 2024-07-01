import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import ProcessContainer from "@/components/Process/Container";
import ProcessHeader from "@/components/Process/Header";

interface ProcessVerifyProps {}

const ProcessVerify: React.FC<ProcessVerifyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer id="verified">
      <ProcessHeader
        menuTitle={t("Process.components.Verify.Verify.button.menu")}
        pageTitle={t("Process.components.Verify.Verify.title")}
      ></ProcessHeader>
      <ProcessStatusButtons
        start={ProcessStatus.CONTRACTOR_SELECTED}
        end={ProcessStatus.VERIFIED}
      />
    </ProcessContainer>
  );
};

export default ProcessVerify;
