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
import ContractorCard from "../../../../../components/Process/ContractorCard";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useGetContractors, {
  ContractorProps,
} from "@/api/Process/Querys/useGetContractors";
import PrioritiesForm from "@/components/Form/Priorities/PrioritiesForm";

interface ProcessContractorListProps {
  process: Process;
  closeModal: () => void;
}

export interface ContractorSelectionFormData {
  process: Process;
  contractorID: string;
}

const ProcessContractorList: React.FC<ProcessContractorListProps> = (props) => {
  const { process, closeModal } = props;
  const contractors = useGetContractors();
  const [onlyVerified, setOnlyVerified] = React.useState(false);
  const { t } = useTranslation();
  const updateProcess = useUpdateProcess();
  const [selectedContractor, setSelectedContractor] = React.useState<
    ContractorProps | undefined
  >(process.processDetails?.provisionalContractor);

  const saveContractor = () => {
    if (selectedContractor !== undefined)
      updateProcess.mutate(
        {
          processIDs: [process.processID],
          updates: {
            changes: {
              processDetails: {
                provisionalContractor: selectedContractor,
              },
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

  const selectContractor = (contractor: ContractorProps) => {
    setSelectedContractor(contractor);
  };
  const handleOnChangeOnlyVerified = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOnlyVerified(e.target.checked);
  };

  if (contractors.isLoading) return <LoadingAnimation />;
  return (
    <Container width="full" justify="start" direction="col">
      <Heading variant="h1">
        {t(
          "Process.components.ContractorSelection.components.ContractorList.heading"
        )}
      </Heading>
      <Divider />
      <PrioritiesForm
        priorities={process.processDetails.priorities}
        type="process"
      />
      <Divider />
      <Heading variant="h2">
        {t(
          "Process.components.ContractorSelection.components.ContractorList.contractors"
        )}
      </Heading>
      <Container width="full" direction="row">
        <input
          type="checkbox"
          id="verified"
          checked={onlyVerified}
          onChange={handleOnChangeOnlyVerified}
          className="h-6 w-6 hover:cursor-pointer"
        />
        <label htmlFor="verified" className="hover:cursor-pointer">
          {t(
            "Process.components.ContractorSelection.components.ContractorList.onlyVerified"
          )}
        </label>
      </Container>
      {contractors.data !== undefined &&
      contractors.data.errors !== undefined &&
      contractors.data.errors.length > 0 ? (
        <Container
          width="fit"
          direction="col"
          className="gap-0 rounded-md border-2 border-orange-500"
        >
          <Heading variant="h3" className="p-3">
            {t(
              "Process.components.ContractorSelection.components.ContractorList.errors"
            )}
          </Heading>
          <Divider />
          {contractors.data.errors.map((error, index) => (
            <Text key={index} className="p-3">
              {t("general.group")} {error.groupID + 1}
              {": "}
              {t(`types.ContractorsErrorType.${error.error}`)}
            </Text>
          ))}
        </Container>
      ) : null}
      {contractors.data !== undefined &&
      contractors.data.contractors.filter((contractor) =>
        onlyVerified ? contractor.verified : true
      ).length > 0 ? (
        <form className="flex flex-col items-center justify-start gap-5">
          <Container direction="col" width="full">
            {contractors.data.contractors
              .filter((contractor) =>
                onlyVerified ? contractor.verified : true
              )
              .map((contractor, index) => (
                <ContractorCard
                  selectContractor={selectContractor}
                  key={index}
                  contractor={contractor}
                  process={process}
                  selected={
                    contractor.hashedID === selectedContractor?.hashedID
                  }
                />
              ))}
          </Container>
          <Button
            onClick={saveContractor}
            variant="primary"
            active={selectedContractor !== undefined}
            title={t("general.button.save")}
          />
        </form>
      ) : (
        <Text>
          {t(
            onlyVerified
              ? "Process.components.ContractorSelection.components.ContractorList.noVerifiedContractorFound"
              : "Process.components.ContractorSelection.components.ContractorList.noContractorFound"
          )}
        </Text>
      )}
    </Container>
  );
};

export default ProcessContractorList;
