import useGetContractors, {
  ContractorProps,
} from "@/api/Project/Querys/useGetContractors";
import React from "react";
import { useTranslation } from "react-i18next";
import TestIMG from "@images/Test2.png";
import { Container, Text } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";

interface ContractorCardProps {
  contractor: ContractorProps;
  process?: Process;
}

const ContractorCard: React.FC<ContractorCardProps> = (props) => {
  const { contractor } = props;
  const { t } = useTranslation();

  return (
    <Container direction="col">
      <img className="" src={TestIMG} />
      <Container direction="col">
        <Text>{contractor.name}</Text>
        <Text>{contractor.details.adress}</Text>
      </Container>
    </Container>
  );
};

export default ContractorCard;
