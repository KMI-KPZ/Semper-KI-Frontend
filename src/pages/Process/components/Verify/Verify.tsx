import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container";
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
      pageTitle={t("Process.components.Verify.Verify.heading")}
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
          status={
            getVerifyStatus() === VerifyStatus.COMPLETED
              ? VerifyStatus.FAILED
              : getVerifyStatus()
          }
          type="STABILITY"
          errorMsg={
            getVerifyStatus() === VerifyStatus.COMPLETED
              ? "Stützkonstruktion nicht ausreichend"
              : undefined
          }
        />
      </Container>
    </ProcessContainer>
  );
};

export default ProcessVerify;
