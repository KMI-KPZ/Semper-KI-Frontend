import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessContainer from "@/components/Process/Container";
import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
  Modal,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserAddressProps } from "@/hooks/useUser";
import ProcessContractorList from "./components/ContractorList";
import useDefinedProcess from "@/hooks/Process/useDefinedProcess";
import ContractorCard from "./components/ContractorCard";
import ContractorSelectionAddressCard from "./components/AddressCard";
import useGetContractors from "@/api/Process/Querys/useGetContractors";

interface ProcessContractorSelectionProps {}

export type ProcessAddressType = "billing" | "delivery";

export interface ProcessAddressFormData {
  deliverAddress: UserAddressProps;
  billingAddress: UserAddressProps;
}

const ProcessContractorSelection: React.FC<ProcessContractorSelectionProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useDefinedProcess();
  const contractors = useGetContractors();

  const [editContractor, setEditContractor] = useState(false);

  const currentContractor = contractors.data?.find(
    (contractor) =>
      contractor.hashedID === process.processDetails.provisionalContractor
  );

  const [showDeliveryAddress, setShowDeliveryAddress] =
    useState<boolean>(false);

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowDeliveryAddress(!e.target.checked);
  };

  const handleOnClickButtonSelectContractor = () => {
    setEditContractor(true);
  };
  const handleOnClickButtonEditContractor = () => {
    setEditContractor(true);
  };

  const closeEditContractor = () => {
    setEditContractor(false);
  };

  const menuButtonTitle = t(
    "Process.components.ContractorSelection.ContractorSelection.button.menu"
  );
  const pageTitle = `${t(
    "Process.components.ContractorSelection.ContractorSelection.heading.main"
  )}: ${
    process.contractor === ""
      ? t(
          "Process.components.ContractorSelection.ContractorSelection.noContractor"
        )
      : process.contractor
  }`;

  return (
    <ProcessContainer
      id="Contractor"
      pageTitle={pageTitle}
      menuButtonTitle={menuButtonTitle}
      start={ProcessStatus.SERVICE_COMPLETED}
      end={ProcessStatus.SERVICE_COMPLETED}
    >
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
                onClick={handleOnClickButtonSelectContractor}
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
            <Container width="full" direction="col">
              <ContractorCard contractor={currentContractor} />
              <Button
                size="sm"
                onClick={handleOnClickButtonEditContractor}
                variant="secondary"
                title={t(
                  "Process.components.ContractorSelection.components.ContractorList.button.edit"
                )}
              />
            </Container>
          )}
        </Container>
        <Container direction="col" width="full">
          <ContractorSelectionAddressCard
            onChangeCheckBox={onChangeCheckBox}
            showDeliveryAddress={showDeliveryAddress}
            type={"billing"}
          />
          {showDeliveryAddress ? (
            <ContractorSelectionAddressCard
              onChangeCheckBox={onChangeCheckBox}
              showDeliveryAddress={showDeliveryAddress}
              type={"delivery"}
            />
          ) : null}
        </Container>
      </Container>

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

export default ProcessContractorSelection;
