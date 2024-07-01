import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import ProcessContainer from "@/components/Process/Container";
import ProcessHeader from "@/components/Process/Header";
import ProcessVerifyCard, { VerifyStatus } from "./components/VerifyCard";

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
      <Container
        width="full"
        direction="row"
        className="flex-wrap md:flex-nowrap"
        align="start"
      >
        <ProcessVerifyCard status={VerifyStatus.READY} type="PRINTABILITY" />
        <ProcessVerifyCard status={VerifyStatus.STARTED} type="DRAFT" />
        <ProcessVerifyCard status={VerifyStatus.COMPLETED} type="CAPACITY" />
        <ProcessVerifyCard status={VerifyStatus.FAILED} type="STABILITY" />
      </Container>
      <ProcessStatusButtons
        start={ProcessStatus.CONTRACTOR_SELECTED}
        end={ProcessStatus.VERIFIED}
      />
    </ProcessContainer>
  );
};

export default ProcessVerify;
