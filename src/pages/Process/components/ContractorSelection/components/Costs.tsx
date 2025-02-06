import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";

interface ProcessContractorCostsProps {
  process: Process;
  closeModal: () => void;
}

const ProcessContractorCosts: React.FC<ProcessContractorCostsProps> = (
  props
) => {
  const { process } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <Heading variant="h1">
        {t("Process.components.ContractorSelection.components.Costs.heading")}
      </Heading>
      <Container
        direction="col"
        width="full"
        className="overflow-auto"
        justify="start"
        items="start"
      >
        <pre className="p-2">
          <code>{JSON.stringify(process.processDetails.prices, null, 2)}</code>
        </pre>
      </Container>
    </Container>
  );
};

export default ProcessContractorCosts;
