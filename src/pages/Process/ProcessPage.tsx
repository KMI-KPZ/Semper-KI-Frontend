import { Container } from "@component-library/index";
import React from "react";
import useProcess from "@/hooks/Process/useProcess";
import Service from "./components/Service/Service";
import ProcessStatusWizard from "./components/StatusWizard/StatusWizard";
import ProcessContractorSelection from "./components/ContractorSelection/ContractorSelection";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessVerify from "./components/Verify/Verify";
import ProcessStatusGate from "../../components/Process/StatusGate";
import ProcessRequest from "./components/Request/Request";
import ProcessContract from "./components/Contract/Contract";
import ProcessDelivery from "./components/Delivery/Delivery";
import ProcessCompleted from "./components/Completed/Completed";
import ProcessProduction from "./components/Production/Production";
import AuthorizedUserOutlet from "@/outlets/AuthorizedUserOutlet";
import { DefinedProcessOutlet } from "@/outlets/DefinedProcessOutlet";
import ProcessHaeder from "./components/Header/Haeder";

interface ProcessPageProps {}

const ProcessPage: React.FC<ProcessPageProps> = (props) => {
  const {} = props;
  const { process } = useProcess();

  return (
    <Container direction="col" width="full">
      <ProcessHaeder process={process} />
      <Container width="full" items="start" direction="row" justify="start">
        <ProcessStatusWizard process={process} />
        <Container direction="col" width="full">
          <Service process={process} />
          <ProcessStatusGate start={ProcessStatus.SERVICE_COMPLETED}>
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
                <ProcessStatusGate start={ProcessStatus.REQUEST_COMPLETED}>
                  <ProcessContract />
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
          </ProcessStatusGate>
        </Container>
      </Container>
    </Container>
  );
};

export default ProcessPage;
