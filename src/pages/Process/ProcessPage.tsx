import { Container, Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessInfo from "./components/Info";
import useProcess from "@/hooks/Process/useProcess";
import Service from "./components/Service/Service";
import ProcessStatusWizard from "./components/StatusWizard/StatusWizard";
import ProcessContractorSelection from "./components/ContractorSelection/ContractorSelection";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessVerify from "./components/Verify/Verify";
import ProcessStatusGate from "./components/StatusGate";
import ProcessRequest from "./components/Request/Request";
import ProcessClarify from "./components/Clarify/Clarify";
import ProcessContract from "./components/Contract/Contract";
import useScrollIntoView from "@/hooks/Process/useScrollIntoView";
import ProcessConfirmation from "./components/Confirmation/Confirmation";
import ProcessDelivery from "./components/Delivery/Delivery";
import ProcessCompleted from "./components/Completed/Completed";
import ProcessProduction from "./components/Production/Production";
import AuthorizedUserOutlet from "@/outlets/AuthorizedUserOutlet";
import { DefinedProcessOutlet } from "@/outlets/DefinedProcessOutlet";

interface ProcessPageProps {}

const ProcessPage: React.FC<ProcessPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <Container direction="col" width="full">
      <Container width="full" className="rounded-xl bg-white p-2">
        <Heading variant="h1">{t("Process.ProcessPage.heading")}</Heading>
      </Container>
      <ProcessInfo process={process} />
      <Container width="full" align="start">
        <ProcessStatusWizard process={process} />
        <Container direction="col" width="full">
          <Service process={process} />
          <AuthorizedUserOutlet>
            <DefinedProcessOutlet>
              <ProcessStatusGate start={ProcessStatus.SERVICE_COMPLETED}>
                <ProcessContractorSelection />
              </ProcessStatusGate>
              <ProcessStatusGate start={ProcessStatus.CONTRACTOR_COMPLETED}>
                <ProcessVerify />
              </ProcessStatusGate>
              <ProcessStatusGate start={ProcessStatus.VERIFYING_COMPLETED}>
                <ProcessRequest />
              </ProcessStatusGate>
              {/* <ProcessStatusGate start={ProcessStatus.CLARIFICATION}>
                <ProcessClarify />
              </ProcessStatusGate> */}
              <ProcessStatusGate start={ProcessStatus.REQUEST_COMPLETED}>
                <ProcessContract />
              </ProcessStatusGate>
              <ProcessStatusGate start={ProcessStatus.OFFER_COMPLETED}>
                <ProcessConfirmation />
              </ProcessStatusGate>
              <ProcessStatusGate start={ProcessStatus.CONFIRMATION_COMPLETED}>
                <ProcessProduction />
              </ProcessStatusGate>
              <ProcessStatusGate start={ProcessStatus.PRODUCTION_COMPLETED}>
                <ProcessDelivery />
              </ProcessStatusGate>
              <ProcessStatusGate start={ProcessStatus.DELIVERY_COMPLETED}>
                <ProcessCompleted />
              </ProcessStatusGate>
            </DefinedProcessOutlet>
          </AuthorizedUserOutlet>
        </Container>
      </Container>
    </Container>
  );
};

export default ProcessPage;
