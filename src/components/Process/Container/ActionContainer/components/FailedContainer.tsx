import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import GrayContainer from "@component-library/Container/GrayContainer";

interface ActionContainerWarpperProps {
  failed: boolean;
}

export const isProcessFailed = (process: Process) => {
  return (
    process.processStatus === ProcessStatus.FAILED ||
    process.processStatus === ProcessStatus.CONFIRMATION_REJECTED ||
    process.processStatus === ProcessStatus.OFFER_REJECTED
  );
};

const ActionContainerWarpper: React.FC<
  PropsWithChildren<ActionContainerWarpperProps>
> = (props) => {
  const { children, failed = false } = props;
  const { t } = useTranslation();

  return (
    <GrayContainer width="full" direction="col">
      <Container
        width="full"
        direction="col"
        className="rounded-md bg-white p-5"
      >
        {failed ? (
          <Heading variant="h2">
            {t(
              "components.Process.Container.ActionContainer.components.ActionContainerWarpper.heading"
            )}
          </Heading>
        ) : null}
        {children}
      </Container>
    </GrayContainer>
  );
};

export default ActionContainerWarpper;
