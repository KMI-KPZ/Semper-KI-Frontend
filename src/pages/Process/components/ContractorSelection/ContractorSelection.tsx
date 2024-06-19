import {
  ManufactoringProcessProps,
  Process,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import ProcessContainer from "@/components/Process/Container";
import ProcessMenu from "@/components/Process/Menu";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Modal,
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
import ProcessContractorList from "./components/ContractorList";
import useDefinedProcess from "@/hooks/Process/useDefinedProcess";
import ContractorCard from "./components/ContractorCard";
import useGetContractors from "@/api/Project/Querys/useGetContractors";

interface ContractorSelectionProps {}

export type ProcessAddressType = "billing" | "delivery";

const ContractorSelection: React.FC<ContractorSelectionProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useDefinedProcess();
  const { user } = useAuthorizedUser();
  const contractors = useGetContractors(process.processID);

  const standardAddress: UserAddressProps | undefined =
    user.details.addresses.find((address) => address.standard === true);
  const currentContractor = contractors.data?.find(
    (contractor) =>
      contractor.hashedID === process.processDetails.provisionalContractor
  );

  const [editContractor, setEditContractor] = useState(false);
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

  const resetAddress = (type: ProcessAddressType) => {
    if (type === "billing") {
      setBillingAddress(standardAddress);
    } else {
      setDeliverAddress(standardAddress);
    }
  };

  const handleOnClickButtonEditContractor = () => {
    setEditContractor(true);
  };

  const closeEditContractor = () => {
    setEditContractor(false);
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
          className=" card"
        >
          <Heading variant="h3">
            {t(
              "Process.components.ContractorSelection.ContractorSelection.heading.sub1"
            )}
          </Heading>
          {process.processDetails.provisionalContractor === undefined ? (
            <Container width="full" direction="col">
              <Button
                size="sm"
                onClick={handleOnClickButtonEditContractor}
                variant="primary"
                title={t(
                  "Process.components.ContractorSelection.components.ContractorList.button.select"
                )}
              />
            </Container>
          ) : contractors.isLoading ? (
            <LoadingAnimation />
          ) : currentContractor === undefined ? (
            <Text>
              {t(
                "Process.components.ContractorSelection.components.ContractorList.noContractorFound"
              )}
            </Text>
          ) : (
            <ContractorCard contractor={currentContractor} />
          )}
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
      <Modal
        open={editContractor}
        modalKey="ProcessContractorList"
        closeModal={closeEditContractor}
      >
        <ProcessContractorList
          contractors={contractors}
          process={process}
          closeModal={closeEditContractor}
        />
      </Modal>
    </ProcessContainer>
  );
};

export default ContractorSelection;
