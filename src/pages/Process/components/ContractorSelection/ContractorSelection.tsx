import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessContainer from "@/components/Process/Container";
import ProcessMenu from "@/components/Process/Menu";
import { Container, Divider, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";

interface ContractorSelectionProps {
  process: Process;
}

const ContractorSelection: React.FC<ContractorSelectionProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer id="contractorSelected">
      <ProcessMenu
        title={t(
          "Process.components.ContractorSelection.ContractorSelection.button.menu"
        )}
      ></ProcessMenu>
      <Container width="full" justify="start">
        <Heading variant="h2">
          {t(
            "Process.components.ContractorSelection.ContractorSelection.heading.main"
          )}
          {`: ${
            process.contractor === ""
              ? t(
                  "Process.components.ContractorSelection.ContractorSelection.noContractor"
                )
              : process.contractor
          }`}
        </Heading>
      </Container>
      <Divider />
      <Container width="full" justify="start" direction="auto">
        <Container
          width="full"
          justify="start"
          direction="col"
          className=" overflow-clip rounded-xl border-2 p-5 shadow-lg"
        >
          <Heading variant="h3">
            {t(
              "Process.components.ContractorSelection.ContractorSelection.heading.sub1"
            )}
          </Heading>
        </Container>
        <Container
          width="full"
          justify="start"
          direction="col"
          className=" overflow-clip rounded-xl border-2 p-5 shadow-lg"
        >
          <Heading variant="h3">
            {t(
              "Process.components.ContractorSelection.ContractorSelection.heading.sub2"
            )}
          </Heading>
        </Container>
      </Container>
      <ProcessStatusButtons
        start={ProcessStatus.SERVICE_COMPLETED}
        end={ProcessStatus.CONTRACTOR_SELECTED}
      />
    </ProcessContainer>
  );
};

export default ContractorSelection;
