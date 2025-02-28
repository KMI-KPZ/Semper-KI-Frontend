import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { UserAddressProps } from "@/hooks/useUser";
import {
  Button,
  Container,
  Divider,
  Heading,
  Modal,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProcessAddressType } from "../ContractorSelection";
import AddressSelection from "./AddressSelection";
import useDefinedProcess from "@/hooks/Process/useDefinedProcess";
import ProcessConditionIcon from "@/components/Process/ConditionIcon";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "../../../../../components/Process/StatusGate";

interface ContractorSelectionAddressCardProps {
  showDeliveryAddress: boolean;
  type: ProcessAddressType;
  onChangeCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContractorSelectionAddressCard: React.FC<
  ContractorSelectionAddressCardProps
> = (props) => {
  const { type, showDeliveryAddress, onChangeCheckBox } = props;
  const { t } = useTranslation();

  const { process } = useDefinedProcess();
  const address =
    type === "delivery"
      ? process.processDetails.clientDeliverAddress
      : process.processDetails.clientBillingAddress;

  const { user } = useAuthorizedUser();
  const standardAddress: UserAddressProps | undefined =
    user.details.addresses === undefined
      ? undefined
      : user.details.addresses.find((address) => address.standard === true);

  const updateProcess = useUpdateProcess();
  const [edit, setEdit] = React.useState(false);

  const handleOnButtonClickEdit = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEdit(true);
  };

  const setAddress = (
    address: UserAddressProps | undefined,
    equal?: boolean
  ) => {
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: {
        changes: {
          processDetails: {
            clientBillingAddress: type === "billing" ? address : undefined,
            clientDeliverAddress:
              type === "delivery" || !showDeliveryAddress || equal
                ? address
                : undefined,
          },
        },
      },
    });
  };

  const handleOnButtonClickReset = () => {
    setAddress(standardAddress);
  };

  const selectAddress = (address: UserAddressProps) => {
    setAddress(address);
  };

  const handleOnChangeAddressEqual = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(process.processDetails.clientBillingAddress, true);
    onChangeCheckBox(event);
  };

  return (
    <Container
      width="full"
      direction="col"
      className="card h-full gap-0 self-stretch bg-white"
      justify="start"
      id={
        type === "billing"
          ? "Process-Address-Billing"
          : "Process-Address-Deliver"
      }
    >
      {showDeliveryAddress === false ? (
        <div id="Process-Address-Deliver" />
      ) : null}
      <Container width="fit" className={`gap-2 p-0 `}>
        <ProcessConditionIcon
          error={
            (process.processDetails.clientBillingAddress === undefined &&
              type === "billing") ||
            (process.processDetails.clientDeliverAddress === undefined &&
              type === "delivery") ||
            (process.processDetails.clientDeliverAddress === undefined &&
              showDeliveryAddress)
          }
        />

        <Heading variant="h3">
          {t(
            `Process.components.ContractorSelection.components.AddressCard.heading.${
              !showDeliveryAddress ? "billingDelivery" : type
            }`
          )}
        </Heading>
      </Container>
      {address === undefined ? (
        <Container
          direction="row"
          width="full"
          justify="center"
          className="p-5"
        >
          <Text>
            {t(
              "Process.components.ContractorSelection.components.AddressCard.noAddress"
            )}
          </Text>
        </Container>
      ) : (
        <Container
          direction="row"
          width="full"
          justify="center"
          className="p-5"
        >
          <Container width="fit" items="start" direction="col" gap={3}>
            {address.company ? <Text>{t("general.company")}</Text> : null}
            <Text>{t("general.name")}</Text>
            <Text>{t("general.street")}</Text>
            <Text>{t("general.city")}</Text>
            <Text>{t("general.country")}</Text>
          </Container>
          <Container width="fit" items="start" direction="col" gap={3}>
            {address.company ? <Text>{address.company}</Text> : null}
            <Text>{`${address.firstName} ${address.lastName}`}</Text>
            <Text>{`${address.street} ${address.houseNumber}`}</Text>
            <Text>{`${address.zipcode} ${address.city}`}</Text>
            <Text>{address.country}</Text>
          </Container>
        </Container>
      )}
      <Divider />
      <Container
        direction="col"
        width="full"
        className="gap-1 p-5"
        items="center"
      >
        <Container>
          <label
            htmlFor="addressEqual"
            className="flex flex-row items-center justify-center gap-3 hover:cursor-pointer"
          >
            <input
              type="checkbox"
              id="addressEqual"
              checked={!showDeliveryAddress}
              className="h-4 w-4"
              disabled={
                process.processStatus >= ProcessStatus.CONTRACTOR_COMPLETED
              }
              onChange={handleOnChangeAddressEqual}
            />
            <Text>
              {t(
                "Process.components.ContractorSelection.components.AddressCard.sameAddress"
              )}
            </Text>
          </label>
        </Container>
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          <Container width="full" gap={3}>
            <Button
              variant="text"
              size="sm"
              title={t(
                "Process.components.ContractorSelection.components.AddressCard.button.editAddress"
              )}
              onClick={handleOnButtonClickEdit}
            />
            <Button
              variant="text"
              size="sm"
              title={t(
                "Process.components.ContractorSelection.components.AddressCard.button.resetAddress"
              )}
              onClick={handleOnButtonClickReset}
            />
          </Container>
        </ProcessStatusGate>
      </Container>
      <Modal
        modalKey="ContractorSelectionAddressSelection"
        open={edit}
        closeModal={() => {
          setEdit(false);
        }}
      >
        <AddressSelection
          selectAddress={selectAddress}
          closeModal={() => {
            setEdit(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default ContractorSelectionAddressCard;
