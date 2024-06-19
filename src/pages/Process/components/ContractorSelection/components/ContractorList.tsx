import {
  DefinedProcess,
  ManufactoringProcessProps,
  Process,
} from "@/api/Process/Querys/useGetProcess";
import useGetContractors, {
  ContractorProps,
} from "@/api/Project/Querys/useGetContractors";
import {
  Button,
  Container,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ContractorCard from "./ContractorCard";
import { useForm } from "react-hook-form";
import { UseQueryResult } from "@tanstack/react-query";

interface ProcessContractorListProps {
  contractors: UseQueryResult<ContractorProps[], Error>;
}

export interface ContractorSelectionFormData {
  processes: {
    process: Process;
    contractorID: string;
  }[];
}

const ProcessContractorList: React.FC<ProcessContractorListProps> = (props) => {
  const { contractors } = props;
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContractorSelectionFormData>({
    defaultValues: async () => ({
      processes: [],
    }),
  });

  // const onSubmit = (data: ContractorSelectionFormData) => {
  //   data.processes.forEach((process, index, allProcesses) => {
  //     updateProcess.mutate({
  //       processIDs: [process.process.processID],
  //       updates: {
  //         changes: {
  //           processStatus: ProcessStatus.CONTRACTOR_SELECTED,
  //           provisionalContractor: process.contractorID,
  //           processDetails: {
  //             clientDeliverAddress: deliverAddress,
  //             clientBillingAddress: addressesEqual
  //               ? deliverAddress
  //               : billingAddress,
  //           },
  //         },
  //       },
  //     });
  //   });
  // };

  if (contractors.isLoading) return <LoadingAnimation />;
  return (
    <Container width="full" direction="col">
      {contractors.data !== undefined && contractors.data.length > 0 ? (
        contractors.data.map((contractor, index) => (
          <ContractorCard key={index} contractor={contractor} />
        ))
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
