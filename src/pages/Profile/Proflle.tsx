import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { Heading } from "@component-library/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@component-library/Modal";
import ProfileForm from "./components/Form";
import Container from "@component-library/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthorizedUserContext } from "@/routeOutlets/AuthorizedUserOutlet";

interface Props {}

const Profile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const { user, deleteUser } = useContext(AuthorizedUserContext);
  const [edit, setEdit] = useState(false);

  const handleOnClickButtonDelete = () => {
    deleteUser();
  };

  const handleOnClickButtonEdit = () => {
    setEdit(true);
  };

  const closeModal = () => {
    setEdit(false);
  };

  return (
    <Container className=" bg-white p-5" direction="col" width="full">
      <Heading variant="h1">{t("Profile.header")}</Heading>
      <div className="w-full border-t-4" />
      <Container direction="col" align="start">
        <Heading variant="h2">{t("Profile.general.header")}</Heading>
        <div className="w-full border-t-2" />
        <span>
          {t("Profile.general.name")}: {user.name}
        </span>
        <span>
          {t("Profile.general.email")}: {user.details.email}
        </span>
        <span>
          {t("Profile.general.type")}:{" "}
          {t(
            `enum.UserType.${UserType[user.usertype] as keyof typeof UserType}`
          )}
        </span>

        {user.usertype === UserType.ORGANIZATION ? (
          <>
            <Heading variant="h2">{t("Profile.company.header")}</Heading>
            <div className="w-full border-t-2" />
            <span className="break-all">
              {t("Profile.company.name")}: {user.organization}
            </span>
            {user.organization !== undefined && user.organization === "None" ? (
              <Button title={t("Profile.button.selectChange")} />
            ) : null}
          </>
        ) : null}
        {user.details.address !== undefined ? (
          <>
            <Heading variant="h2">{t("Profile.address.header")}</Heading>
            <div className="w-full border-t-2" />
            <span>
              {t("Profile.address.street")}: {user.details.address}
            </span>
          </>
        ) : null}
        <Heading variant="h2">{t("Profile.time.header")}</Heading>
        <div className="w-full border-t-2" />
        <span>
          {t("Profile.time.created")}: {user.createdWhen.toLocaleString()}
        </span>
        <span>
          {t("Profile.time.accessed")}: {user.accessedWhen.toLocaleString()}
        </span>
        <span>
          {t("Profile.time.updated")}: {user.updatedWhen.toLocaleString()}
        </span>
        <Container justify="center">
          <Button
            title={t(`Profile.button.edit`)}
            startIcon={<EditIcon />}
            onClick={handleOnClickButtonEdit}
          />
          <Button
            testid="button-delete"
            startIcon={<DeleteIcon />}
            onClick={handleOnClickButtonDelete}
            title={t("Profile.button.delete")}
          />
        </Container>
      </Container>
      <Modal open={edit} closeModal={closeModal} title="ProfileForm">
        <ProfileForm user={user} />
      </Modal>
    </Container>
  );
};

export default Profile;
