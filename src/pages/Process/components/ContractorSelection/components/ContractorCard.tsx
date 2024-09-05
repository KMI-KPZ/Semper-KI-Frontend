import React from "react";
import TestIMG from "@images/Test2.png";
import { Container, Text } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { ContractorProps } from "@/api/Process/Querys/useGetContractors";

interface ContractorCardProps {
  contractor: ContractorProps;
  selectContractor?: (contractorID: string) => void;
  process?: Process;
  selected?: boolean;
}

const ContractorCard: React.FC<ContractorCardProps> = (props) => {
  const { contractor, selected, selectContractor } = props;

  return (
    <Container
      onClick={() => selectContractor && selectContractor(contractor.hashedID)}
      direction="row"
      width="full"
      justify="start"
      className={
        selected === undefined
          ? "card"
          : selected
          ? `active-card`
          : `hover-card`
      }
    >
      <img className="h-20" src={TestIMG} />
      <Container direction="col" justify="center" align="center">
        <Text>{contractor.name}</Text>
        <Text>{contractor.details.adress}</Text>
      </Container>
    </Container>
  );
};

export default ContractorCard;
