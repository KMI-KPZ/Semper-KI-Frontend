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
import AddressCard from "@/components/Address/AddressCard";
import ProfileNotifications from "./components/Notifications";
import ProfileStatistics from "./components/Statistics";

interface Props {}

interface EditState {
  edit: boolean;
  address: UserAddressProps | undefined;
}

const Profile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const { user, deleteUser } = useAuthorizedUser();
  const [newAddress, setNewAddress] = useState(false);

  const handleOnClickButtonDelete = () => {
    if (t("Profile.confirmDelete")) {
      deleteUser.mutate();
    }
  };

  const handleOnClickButtonAddAddress = () => {
    setNewAddress(true);
  };

  const closeModalAddress = () => {
    setNewAddress(false);
  };

  return (
    <Container className="" direction="col" width="full">
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
            <Text className="break-all">{t("Profile.general.name")}</Text>
            <Text className="break-all">{t("Profile.general.type")}</Text>
            <Text className="break-all">{t("Profile.general.email")}</Text>
          </Container>
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text className="break-all">{user.name}</Text>
            <Text className="break-all">
              {t(
                `enum.UserType.${
                  UserType[user.usertype] as keyof typeof UserType
                }`
              )}
            </Text>
            <Text className="break-all">{user.details.email}</Text>
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
        <Container width="full" justify="start" align="start" wrap="wrap">
          {user.details.addresses !== undefined &&
          user.details.addresses.length > 0 ? (
            user.details.addresses.map((address, index) => (
              <AddressCard key={index} address={address} />
            ))
          ) : (
            <Text>{t("Profile.address.noAddress")}</Text>
          )}
          <div
            className="hover-card flex flex-col items-center justify-center gap-5 p-10"
            onClick={handleOnClickButtonAddAddress}
          >
            <AddIcon />
            <Text>{t("Profile.button.addAddress")}</Text>
          </div>
        </Container>
        <ProfileStatistics user={user} />
        <ProfileNotifications user={user} />
        <Divider />
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
        open={newAddress}
        closeModal={closeModalAddress}
        modalKey="ProfileForm"
      >
        <AddressForm
          closeModal={closeModalAddress}
          title={t("Profile.newAddressTitle")}
        />
      </Modal>
    </Container>
  );
};

export default Profile;
