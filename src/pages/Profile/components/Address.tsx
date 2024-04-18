import { Address, UserAddressProps } from "@/hooks/useUser";
import { Button, Container, Divider, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface AddressProps {
  address: UserAddressProps;
}

const AddressCard: React.FC<AddressProps> = (props) => {
  const { address } = props;
  const { t } = useTranslation();

  const handleOnClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  const handleOnButtonClickEdit = () => {
    console.log("Edit");
  };
  const handleOnButtonClickDelete = () => {
    console.log("Delete");
  };

  return (
    <Container width="fit" direction="col" className="rounded-lg border-2 p-5">
      <Container direction="row" width="full" justify="between">
        <Container width="fit" align="start" direction="col" gap={3}>
          {address.company ? (
            <Text>{t("Profile.components.Address.company")}</Text>
          ) : null}
          <Text>{t("Profile.components.Address.name")}</Text>
          <Text>{t("Profile.components.Address.street")}</Text>
          <Text>{t("Profile.components.Address.city")}</Text>
          <Text>{t("Profile.components.Address.country")}</Text>
        </Container>
        <Container width="fit" align="start" direction="col" gap={3}>
          {address.company ? <Text>{address.company}</Text> : null}
          <Text>{`${address.firstName} ${address.lastName}`}</Text>
          <Text>{`${address.street} ${address.houseNumber}`}</Text>
          <Text>{`${address.zipcode} ${address.city}`}</Text>
          <Text>{address.country}</Text>
        </Container>
      </Container>
      <Divider />
      <Container direction="col" width="full" className="gap-1" align="start">
        <Container width="full">
          <input
            type="checkbox"
            className="h-4 w-4"
            id="addressCheckbox"
            checked={address.standard}
            onChange={handleOnClickCheckbox}
          />
          <label htmlFor="addressCheckbox">
            <Text>{t("Profile.components.Address.standard")}</Text>
          </label>
        </Container>
        <Container width="full" gap={3}>
          <Button
            variant="text"
            size="sm"
            title={t("Profile.components.Address.buttons.edit")}
            onClick={handleOnButtonClickEdit}
          />
          <Button
            variant="text"
            size="sm"
            title={t("Profile.components.Address.buttons.delete")}
            onClick={handleOnButtonClickDelete}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default AddressCard;
