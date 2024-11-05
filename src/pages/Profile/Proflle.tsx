import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider } from "@component-library/index";
import { UserType } from "@/hooks/useUser";
import { Heading } from "@component-library/index";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import NotificationForm from "../../components/Form/Notifications/NotificationForm";
import ProfileStatistics from "./components/Statistics";
import ProfileLocals from "./components/Locals";
import ProfileGeneral from "./components/General";
import ProfileAddress from "./components/Address";
import ProfileOrganization from "./components/Organization";
import useDeleteUser from "@/api/User/Mutations/useDeleteUser";
import ProfileAPIToken from "./components/APIToken";
import useScrollIntoView from "@/hooks/Process/useScrollIntoView";

interface Props {}

const Profile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const { user } = useAuthorizedUser();
  const deleteUser = useDeleteUser();

  const handleOnClickButtonDelete = () => {
    if (t("Profile.confirmDelete")) {
      deleteUser.mutate();
    }
  };

  useScrollIntoView();

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
        <NotificationForm
          type="user"
          settings={
            user.usertype === UserType.USER
              ? user.details.notificationSettings?.user
              : user.details.notificationSettings?.organization
          }
        />
        <Divider />
        <ProfileAPIToken />
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
