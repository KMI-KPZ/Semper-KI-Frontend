import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessContainer from "@/components/Process/Container/Container";
import {
  Button,
  Container,
  Heading,
  Modal,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useUser, { UserAddressProps, UserType } from "@/hooks/useUser";
import ProcessContractorList from "./components/ContractorList";
import useDefinedProcess from "@/hooks/Process/useDefinedProcess";
import ContractorCard from "../../../../components/Process/ContractorCard";
import ContractorSelectionAddressCard from "./components/AddressCard";
import ProcessConditionIcon from "@/components/Process/ConditionIcon";
import ProcessStatusGate from "../../../../components/Process/StatusGate";
import ProcessContractorCosts from "./components/Costs";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

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
  const { user } = useUser();

  const [editContractor, setEditContractor] = useState(false);
  const [showCosts, setShowCosts] = useState(false);

  const closeCosts = () => {
    setShowCosts(false);
  };

  const handleOnClickShowCosts = () => {
    setShowCosts(true);
  };

  const currentContractor =
    process.processDetails.provisionalContractor &&
    Object.keys(process.processDetails.provisionalContractor).length > 0
      ? process.processDetails.provisionalContractor
      : undefined;

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

  const pageTitle = `${
    currentContractor === undefined ||
    currentContractor.name === undefined ||
    currentContractor.name === ""
      ? t("Process.components.ContractorSelection.noContractor")
      : currentContractor.name
  }`;

  return (
    <ProcessContainer
      id="Contractor"
      titleAddition={pageTitle}
      start={ProcessStatus.SERVICE_COMPLETED}
      end={ProcessStatus.SERVICE_COMPLETED}
    >
      <Container width="full" justify="center" items="start" direction="auto">
        <Container
          width="full"
          justify="start"
          direction="col"
          className={`card bg-white ${
            !showDeliveryAddress ? "self-stretch" : ""
          }`}
          id="Process-Contractor"
        >
          <Container width="fit" className={`gap-2  p-0`}>
            <ProcessConditionIcon error={currentContractor === undefined} />

            <Heading variant="h3">
              {t("Process.components.ContractorSelection.heading.sub1")}
            </Heading>
          </Container>
          {currentContractor === undefined ? (
            <Container width="full" height="full" direction="col">
              <PermissionGate element="ProcessSelectContractorSelect">
                <Button
                  size="sm"
                  onClick={handleOnClickButtonSelectContractor}
                  variant="primary"
                  title={t(
                    "Process.components.ContractorSelection.button.select"
                  )}
                />
              </PermissionGate>
            </Container>
          ) : currentContractor === undefined ? (
            <Text>
              {t("Process.components.ContractorSelection.noContractorFound")}
            </Text>
          ) : (
            <Container width="full" direction="col">
              <ContractorCard contractor={currentContractor} />
              <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
                <PermissionGate element="ProcessSelectContractorEdit">
                  <Button
                    size="sm"
                    onClick={handleOnClickButtonEditContractor}
                    variant="secondary"
                    title={t("general.button.edit")}
                  />
                </PermissionGate>
              </ProcessStatusGate>
              {process.contractor !== undefined &&
              process.contractor.hashedID !== undefined &&
              user.usertype === UserType.ORGANIZATION &&
              user.organization !== undefined &&
              process.contractor.hashedID === user.organization ? (
                <Container width="full">
                  <PermissionGate element="ProcessSelectContractorCostOverView">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleOnClickShowCosts}
                      title={t(
                        "Process.components.ContractorSelection.button.costOverview"
                      )}
                    />
                  </PermissionGate>
                </Container>
              ) : null}
            </Container>
          )}
        </Container>
        <Container
          direction="col"
          width="full"
          justify="start"
          className="self-stretch rounded-md "
        >
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
        <PermissionGate element="ProcessSelectContractorContractorList">
          <ProcessContractorList
            process={process}
            closeModal={closeEditContractor}
          />
        </PermissionGate>
      </Modal>
      <Modal
        open={showCosts}
        modalKey="ProcessContractorCosts"
        closeModal={closeCosts}
      >
        <PermissionGate element="ProcessSelectContractorCostOverView">
          <ProcessContractorCosts
            process={process}
            closeModal={closeEditContractor}
          />
        </PermissionGate>
      </Modal>
    </ProcessContainer>
  );
};

export default ProcessContractorSelection;
