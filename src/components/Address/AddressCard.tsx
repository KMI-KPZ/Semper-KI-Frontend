import { UserAddressProps } from "@/hooks/useUser";
import {
  Button,
  Container,
  Divider,
  Modal,
  Text,
} from "@component-library/index";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import AddressForm from "../Form/AddressForm";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";

interface AddressCardProps {
  address: UserAddressProps;
  select?: {
    checked: boolean;
    handleOnClickCard: (address: UserAddressProps) => void;
  };
  type?: "user" | "organization";
}

const AddressCard: React.FC<PropsWithChildren<AddressCardProps>> = (props) => {
  const { address, select, children, type = "user" } = props;
  const updateUser = useUpdateUser();
  const updateOrganization = useUpdateOrganization();
  const [edit, setEdit] = React.useState(false);
  const { t } = useTranslation();

  const handleOnClickCheckbox = () => {
    select?.handleOnClickCard(address);
  };

  const handleOnButtonClickEdit = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEdit(true);
  };

  const deleteAddress = (addressID: string) => {
    if (type === "user")
      updateUser.mutate({ deletions: { address: addressID } });
    else updateOrganization.mutate({ deletions: { address: addressID } });
  };

  const handleOnButtonClickDelete = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (window.confirm(t("components.Address.AddressCard.confirmDelete"))) {
      deleteAddress(address.id);
    }
  };

  return (
    <Container
      width="auto"
      direction="col"
      className="gap-0 overflow-clip rounded-lg border-2 bg-white"
    >
      {select !== undefined ? (
        <>
          <label className="flex w-full flex-row items-center justify-center gap-5 p-5 hover:cursor-pointer hover:bg-slate-50">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={select.checked}
              onChange={handleOnClickCheckbox}
            />
            <Text>
              {t(
                select.checked
                  ? "components.Address.AddressCard.selected"
                  : "components.Address.AddressCard.notSelected"
              )}
            </Text>
          </label>
          <Divider />
        </>
      ) : null}
      <Container direction="row" width="full" justify="between" className="p-5">
        <Container width="fit" align="start" direction="col" gap={3}>
          <Text>{t("components.Address.AddressCard.name")}</Text>
          <Text>{t("components.Address.AddressCard.company")}</Text>
          <Text>{t("components.Address.AddressCard.street")}</Text>
          <Text>{t("components.Address.AddressCard.city")}</Text>
          <Text>{t("components.Address.AddressCard.country")}</Text>
          <Text>{t("components.Address.AddressCard.standard")}</Text>
        </Container>
        <Container width="fit" align="start" direction="col" gap={3}>
          <Text>{`${address.firstName} ${address.lastName}`}</Text>
          <Text>
            {address.company === undefined || address.company === ""
              ? "---"
              : address.company}
          </Text>
          <Text>{`${address.street} ${address.houseNumber}`}</Text>
          <Text>{`${address.zipcode} ${address.city}`}</Text>
          <Text>{address.country}</Text>
          <Text>
            {address.standard
              ? t("components.Address.AddressCard.yes")
              : t("components.Address.AddressCard.no")}
          </Text>
        </Container>
      </Container>
      <Divider />
      <Container
        direction="col"
        width="full"
        className="gap-1 p-5"
        align="start"
      >
        <Container width="full" gap={3}>
          {children === undefined ? (
            <>
              <Button
                variant="text"
                size="sm"
                title={t("general.button.edit")}
                onClick={handleOnButtonClickEdit}
              />
              <Button
                variant="text"
                size="sm"
                title={t("general.button.delete")}
                onClick={handleOnButtonClickDelete}
              />
            </>
          ) : (
            children
          )}
        </Container>
      </Container>
      <Modal
        modalKey="ContractorSelectionAddressCardEdit"
        open={edit}
        closeModal={() => {
          setEdit(false);
        }}
      >
        <AddressForm
          type={type}
          initialAddress={address}
          closeModal={() => {
            setEdit(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default AddressCard;
