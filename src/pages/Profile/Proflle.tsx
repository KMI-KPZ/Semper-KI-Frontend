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
import ProfileLocals from "./components/Locals";
import ProfileGeneral from "./components/General";
import ProfileAddress from "./components/Address";
import ProfileOrganization from "./components/Organization";

interface Props {}

interface EditState {
  edit: boolean;
  address: UserAddressProps | undefined;
}

const Profile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const { user, deleteUser } = useAuthorizedUser();

  const handleOnClickButtonDelete = () => {
    if (t("Profile.confirmDelete")) {
      deleteUser.mutate();
    }
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
        <ProfileGeneral user={user} />
        <ProfileOrganization user={user} />
        <ProfileAddress user={user} />
        <ProfileLocals user={user} />
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
    </Container>
  );
};

export default Profile;
