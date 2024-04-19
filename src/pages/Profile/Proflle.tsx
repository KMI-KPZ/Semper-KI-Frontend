import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Text } from "@component-library/index";
import useUser, {
  AuthorizedUserProps,
  UserAddressProps,
  UserType,
} from "@/hooks/useUser";
import { Heading } from "@component-library/index";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "@component-library/index";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import AddressForm from "@/components/Form/AddressForm";
import Address from "./components/Address";

interface Props {}

interface EditState {
  edit: boolean;
  address: UserAddressProps | undefined;
}

const Profile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const { user, deleteUser } = useAuthorizedUser();
  const [addressForm, setAddressForm] = useState<EditState>({
    edit: false,
    address: undefined,
  });

  const handleOnClickButtonEditAddress = (address: UserAddressProps) => {
    setAddressForm({ edit: true, address: address });
  };

  const handleOnClickButtonDelete = () => {
    if (t("Profile.confirmDelete")) {
      deleteUser.mutate();
    }
  };

  const handleOnClickButtonAddAddress = () => {
    setAddressForm({ edit: true, address: undefined });
  };

  const closeModalAddress = () => {
    setAddressForm({ edit: false, address: undefined });
  };

  return (
    <Container className="md:max-w-2xl" direction="col" width="full">
      <Heading
        variant="h1"
        className="flex w-full items-center justify-center bg-white  p-5"
      >
        {t("Profile.header")}
      </Heading>
      <Container direction="col" className="bg-white p-5 " width="full">
        <Heading variant="h2">{t("Profile.general.header")}</Heading>
        <Divider />
        <Container width="full" direction="row" align="start" justify="start">
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text>{t("Profile.general.name")}</Text>
            <Text>{t("Profile.general.type")}</Text>
            <Text>{t("Profile.general.email")}</Text>
          </Container>
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text>{user.name}</Text>
            <Text>
              {t(
                `enum.UserType.${
                  UserType[user.usertype] as keyof typeof UserType
                }`
              )}
            </Text>
            <Text>{user.details.email}</Text>
          </Container>
        </Container>

        {user.usertype === UserType.ORGANIZATION ? (
          <>
            <Heading variant="h2">{t("Profile.company.header")}</Heading>
            <Divider />
            <span className="break-all">
              {t("Profile.company.name")}: {user.organization}
            </span>
          </>
        ) : null}
        <Heading variant="h2">{t("Profile.address.header")}</Heading>
        <Divider />
        <Container width="full" justify="start" align="center">
          {user.details.addresses.length > 0 ? (
            user.details.addresses.map((address, index) => (
              <Address
                key={index}
                address={address}
                handleOnClickButtonEditAddress={handleOnClickButtonEditAddress}
              />
            ))
          ) : (
            <Text>{t("Profile.address.noAddress")}</Text>
          )}
        </Container>
        <Container width="full" align="center" justify="center">
          <Button
            size="sm"
            variant="secondary"
            startIcon={<AddIcon />}
            onClick={handleOnClickButtonAddAddress}
            title={t("Profile.button.addAddress")}
          />
        </Container>
        <Heading variant="h2">{t("Profile.time.header")}</Heading>
        <Divider />
        <Container width="full" direction="row" align="start" justify="start">
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text>{t("Profile.time.created")}</Text>
            <Text>{t("Profile.time.accessed")}</Text>
            <Text>{t("Profile.time.updated")}</Text>
          </Container>
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text>{user.createdWhen.toLocaleString()}</Text>
            <Text>{user.accessedWhen.toLocaleString()}</Text>
            <Text>{user.updatedWhen.toLocaleString()}</Text>
          </Container>
        </Container>

        <Container width="full">
          <Button
            className="border-2 border-red-800 bg-red-700"
            variant="primary"
            size="sm"
            testid="button-delete"
            startIcon={<DeleteIcon />}
            onClick={handleOnClickButtonDelete}
            title={t("Profile.button.delete")}
          />
        </Container>
      </Container>
      <Modal
        open={addressForm.edit}
        closeModal={closeModalAddress}
        modalKey="ProfileForm"
      >
        <AddressForm
          closeModal={closeModalAddress}
          initialAddress={addressForm.address}
          title={
            addressForm.address === undefined
              ? t("Profile.newAddressTitle")
              : t("Profile.existingAddressTitle")
          }
        />
      </Modal>
    </Container>
  );
};

export default Profile;
