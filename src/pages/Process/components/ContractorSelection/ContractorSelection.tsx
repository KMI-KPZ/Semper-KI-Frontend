import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessContainer from "@/components/Process/Container";
import ProcessMenu from "@/components/Process/Menu";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import useUser, { UserAddressProps } from "@/hooks/useUser";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { useForm } from "react-hook-form";
import ContractorSelectionAddressCard from "./components/AddressCard";
import logger from "@/hooks/useLogger";

interface ContractorSelectionProps {
  process: Process;
}

export type ProcessAddressType = "billing" | "delivery";

export interface ContractorSelectionFormData {
  processes: {
    process: Process;
    contractorID: string;
  }[];
}

const ContractorSelection: React.FC<ContractorSelectionProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const updateProcess = useUpdateProcess();
  const standardAddress: UserAddressProps | undefined =
    user.details.addresses.find((address) => address.standard === true);

  const [deliverAddress, setDeliverAddress] = useState(standardAddress);
  const [billingAddress, setBillingAddress] = useState(standardAddress);
  const [addressesEqual, setAddressesEqual] = useState(true);

  const handleOnChangeAddressEqual = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressesEqual(event.target.checked);
  };

  const setAddress = (type: ProcessAddressType, address: UserAddressProps) => {
    if (type === "billing") {
      setBillingAddress(address);
    } else {
      setDeliverAddress(address);
    }
  };

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

  const onSubmit = (data: ContractorSelectionFormData) => {
    data.processes.forEach((process, index, allProcesses) => {
      updateProcess.mutate({
        processIDs: [process.process.processID],
        updates: {
          changes: {
            processStatus: ProcessStatus.CONTRACTOR_SELECTED,
            provisionalContractor: process.contractorID,
            processDetails: {
              clientDeliverAddress: deliverAddress,
              clientBillingAddress: addressesEqual
                ? deliverAddress
                : billingAddress,
            },
          },
        },
      });
    });
  };

  const resetAddress = (type: ProcessAddressType) => {
    if (type === "billing") {
      setBillingAddress(standardAddress);
    } else {
      setDeliverAddress(standardAddress);
    }
  };

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
      <Container width="full" justify="center" align="start" direction="auto">
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
        <Container direction="col" width="full">
          <ContractorSelectionAddressCard
            resetAddress={resetAddress}
            address={billingAddress}
            setAddress={setAddress}
            type={"billing"}
            addressesEqual={addressesEqual}
            handleOnChangeAddressEqual={handleOnChangeAddressEqual}
          />
          {!addressesEqual ? (
            <ContractorSelectionAddressCard
              resetAddress={resetAddress}
              setAddress={setAddress}
              address={deliverAddress}
              type={"delivery"}
              addressesEqual={addressesEqual}
              handleOnChangeAddressEqual={handleOnChangeAddressEqual}
            />
          ) : null}
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
