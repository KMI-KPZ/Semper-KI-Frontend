import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessContainer from "@/components/Process/Container/Container";
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
      end={ProcessStatus.VERIFICATION_FAILED}
      menuButtonTitle={t("Process.components.Verify.button.menu")}
      pageTitle={t("Process.components.Verify.heading")}
      showDelete={process.processStatus === ProcessStatus.VERIFICATION_FAILED}
    >
      <Container
        width="full"
        direction="row"
        className="flex-wrap md:flex-nowrap"
        items="start"
      >
        <ProcessVerifyCard
          status={getVerifyStatus()}
          type="PROCESS"
          errorMsg={
            process.processDetails.verificationResults !== undefined &&
            process.processDetails.verificationResults.process !== undefined &&
            process.processDetails.verificationResults.process.msg !== undefined
              ? process.processDetails.verificationResults.process.msg
              : undefined
          }
        />
        <ProcessVerifyCard
          status={getVerifyStatus()}
          type="FEM"
          errorMsg={
            process.processDetails.verificationResults !== undefined &&
            process.processDetails.verificationResults.fem !== undefined &&
            process.processDetails.verificationResults.fem.msg !== undefined
              ? process.processDetails.verificationResults.fem.msg
              : undefined
          }
        />
        {/* <ProcessVerifyCard status={getVerifyStatus()} type="PRINTABILITY" />
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
        /> */}
      </Container>
    </ProcessContainer>
  );
};

export default ProcessVerify;
