import { Process } from "@/api/Process/Querys/useGetProcess";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ContractorCard from "./ContractorCard";
import { UseQueryResult } from "@tanstack/react-query";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { ContractorProps } from "@/api/Process/Querys/useGetContractors";

interface ProcessContractorListProps {
  contractors: UseQueryResult<ContractorProps[], Error>;
  process: Process;
  closeModal: () => void;
}

export interface ContractorSelectionFormData {
  process: Process;
  contractorID: string;
}

const ProcessContractorList: React.FC<ProcessContractorListProps> = (props) => {
  const { contractors, process, closeModal } = props;
  const { t } = useTranslation();
  const updateProcess = useUpdateProcess();
  const [contractorID, setContractorID] = React.useState<string | undefined>(
    undefined
  );

  const saveContractor = () => {
    updateProcess.mutate(
      {
        processIDs: [process.processID],
        updates: {
          changes: {
            provisionalContractor: contractorID,
          },
        },
      },
      {
        onSuccess() {
          closeModal();
        },
      }
    );
  };

  const selectContractor = (contractorID: string) => {
    setContractorID(contractorID);
  };

  if (contractors.isLoading) return <LoadingAnimation />;
  return (
    <Container width="full" justify="start" direction="col">
      <Heading variant="h2">
        {t(
          "Process.components.ContractorSelection.components.ContractorList.heading"
        )}
      </Heading>
      <Divider />
      {contractors.data !== undefined && contractors.data.length > 0 ? (
        <form className="flex flex-col items-center justify-start gap-5">
          <Container direction="col" width="full">
            {contractors.data.map((contractor, index) => (
              <ContractorCard
                selectContractor={selectContractor}
                key={index}
                contractor={contractor}
                process={process}
                selected={contractorID === contractor.hashedID}
              />
            ))}
          </Container>
          <Button
            onClick={saveContractor}
            variant="primary"
            title={t(
              "Process.components.ContractorSelection.components.ContractorList.button.save"
            )}
          />
        </form>
      ) : (
        <Text>
          {t(
            "Process.components.ContractorSelection.components.ContractorList.noContractorFound"
          )}
        </Text>
      )}
    </Container>
  );
};

export default ProcessContractorList;
