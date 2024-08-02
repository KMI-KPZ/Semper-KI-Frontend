import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import ProcessContainer from "@/components/Process/Container";
import ProcessHeader from "@/components/Process/Header";
import ProcessVerifyCard, { VerifyStatus } from "./components/VerifyCard";
import useProcess from "@/hooks/Process/useProcess";

interface ProcessVerifyProps {}

const ProcessVerify: React.FC<ProcessVerifyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  const getVerifyStatus = (): VerifyStatus => {
    if (process.processStatus === ProcessStatus.CONTRACTOR_COMPLETED) {
      return VerifyStatus.READY;
    }
    if (process.processStatus === ProcessStatus.VERIFYING_IN_PROGRESS) {
      return VerifyStatus.STARTED;
    }
    {
      return VerifyStatus.COMPLETED;
    }
  };

  return (
    <ProcessContainer
      id="Verification"
      start={ProcessStatus.CONTRACTOR_COMPLETED}
      end={ProcessStatus.VERIFYING_IN_PROGRESS}
      menuButtonTitle={t("Process.components.Verify.Verify.button.menu")}
      pageTitle={t("Process.components.Verify.Verify.title")}
    >
      <Container
        width="full"
        direction="row"
        className="flex-wrap md:flex-nowrap"
        align="start"
      >
        <ProcessVerifyCard status={getVerifyStatus()} type="PRINTABILITY" />
        <ProcessVerifyCard status={getVerifyStatus()} type="DRAFT" />
        <ProcessVerifyCard status={getVerifyStatus()} type="CAPACITY" />
        <ProcessVerifyCard
          status={VerifyStatus.FAILED}
          type="STABILITY"
          errorMsg="Die Scheiße hat nicht funktioniert Junge!!!"
        />
      </Container>
    </ProcessContainer>
  );
};

export default ProcessVerify;
