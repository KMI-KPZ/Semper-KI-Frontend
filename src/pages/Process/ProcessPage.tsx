import { Container, Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessInfo from "./components/Info";
import useProcess from "@/hooks/Process/useProcess";
import Service from "./components/Service/Service";
import StatusWizard from "./components/StatusWizard/StatusWizard";
import ContractorSelection from "./components/ContractorSelection/ContractorSelection";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import AuthorizedUserRouteOutlet from "@/routeOutlets/AuthorizedUserOutlet";
import { DefinedProcessOutlet } from "@/routeOutlets/DefinedProcessOutlet";
import ProcessVerify from "./components/Verify/Verify";
import ProcessStatusGate from "./components/StatusGate";
import ProcessRequest from "./components/Request/Request";

interface ProcessPageProps {}

const ProcessPage: React.FC<ProcessPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <Container direction="col" width="full">
      <Container width="full" className="bg-white p-2">
        <Heading variant="h1">{t("Process.ProcessPage.heading")}</Heading>
      </Container>
      <ProcessInfo process={process} />
      <Container width="full" direction="row" align="start">
        <StatusWizard process={process} />
        <Container direction="col" width="full">
          <Service process={process} />
          <ProcessStatusGate start={ProcessStatus.SERVICE_COMPLETED}>
            <AuthorizedUserRouteOutlet>
              <DefinedProcessOutlet>
                <ProcessStatusGate start={ProcessStatus.SERVICE_COMPLETED}>
                  <ContractorSelection />
                </ProcessStatusGate>
                <ProcessStatusGate start={ProcessStatus.CONTRACTOR_SELECTED}>
                  <ProcessVerify />
                </ProcessStatusGate>
                <ProcessStatusGate start={ProcessStatus.VERIFIED}>
                  <ProcessRequest />
                </ProcessStatusGate>
              </DefinedProcessOutlet>
            </AuthorizedUserRouteOutlet>
          </ProcessStatusGate>
        </Container>
      </Container>
    </Container>
  );
};

export default ProcessPage;
