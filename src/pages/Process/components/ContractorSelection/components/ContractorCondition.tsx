import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import useProcess from "@/hooks/Process/useProcess";

interface ContractorConditionProps {}

const ContractorCondition: React.FC<ContractorConditionProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <Container direction="col" align="center" className={`gap-0 `}>
      <Heading variant="h2" className="whitespace-nowrap">
        {t(
          `Process.components.ContractorSelection.components.ContractorCondition.heading`
        )}
      </Heading>
      {/* {process.} */}
    </Container>
  );
};

export default ContractorCondition;
