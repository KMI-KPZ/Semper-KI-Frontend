import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, Text } from "@component-library/index";
import useDefinedProcess from "@/hooks/Process/useDefinedProcess";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessFailedProps {}

export const isProcessFailed = (process: Process) => {
  return (
    process.processStatus === ProcessStatus.FAILED ||
    process.processStatus === ProcessStatus.CONFIRMATION_REJECTED ||
    process.processStatus === ProcessStatus.OFFER_REJECTED
  );
};

const ProcessFailed: React.FC<ProcessFailedProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useDefinedProcess();

  return (
    <Container width="full" direction="col" className="bg-white p-5">
      <Container
        width="full"
        direction="col"
        className="rounded-md border-2 border-red-500 bg-red-100 p-5"
      >
        <Heading variant="h2">
          {t("components.Process.Container.ActionContainer.Failed.heading")}
        </Heading>
        <Text>{`${t(
          "components.Process.Container.ActionContainer.Failed.reason"
        )}:  ${t(
          `enum.ProcessStatus.${
            ProcessStatus[process.processStatus] as keyof typeof ProcessStatus
          }`
        )}`}</Text>
      </Container>
    </Container>
  );
};

export default ProcessFailed;
