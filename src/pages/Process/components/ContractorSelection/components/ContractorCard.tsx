import useGetContractors, {
  ContractorProps,
} from "@/api/Project/Querys/useGetContractors";
import React from "react";
import { useTranslation } from "react-i18next";
import TestIMG from "@images/Test2.png";
import { Container, Text } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { UseFormRegister } from "react-hook-form";
import { ContractorSelectionFormData } from "./ContractorList";

interface ContractorCardProps {
  contractor: ContractorProps;
  selectContractor?: (contractorID: string) => void;
  process?: Process;
  selected?: boolean;
}

const ContractorCard: React.FC<ContractorCardProps> = (props) => {
  const { contractor, selected, process, selectContractor } = props;
  const { t } = useTranslation();

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
