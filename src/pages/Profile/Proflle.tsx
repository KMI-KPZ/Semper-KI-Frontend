import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { User, UserType } from "@/hooks/useUser/types";
import { Heading } from "@component-library/Typography";
import useUser from "@/hooks/useUser";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "@component-library/Modal";
import ProfileForm from "./components/Form";

interface Props {
  user: User;
}

const Profile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { user } = props;
  const { deleteUser, updateUser } = useUser();
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
    <div className="flex flex-col gap-5 bg-white p-5">
      <Heading variant="h1">{t("Profile.header")}</Heading>
      <div className="w-full border-t-4" />
      <div className="flex flex-col gap-2 p-5">
        <Heading variant="h2">{t("Profile.general.header")}</Heading>
        <div className="w-full border-t-2" />
        <span>
          {t("Profile.general.name")}: {user.name}
        </span>
        <span>
          {t("Profile.general.email")}: {user.email}
        </span>
        <span>
          {t("Profile.general.type")}:{" "}
          {t(`enum.UserType.${UserType[user.usertype]}`)}
        </span>
      </div>
      {user.usertype === UserType.ORGANIZATION ? (
        <div className="flex flex-col gap-2 p-5">
          <Heading variant="h2">{t("Profile.company.header")}</Heading>
          <div className="w-full border-t-2" />
          <span>
            {t("Profile.company.name")}: {user.organizations}
          </span>
          {user.organizations[0] !== undefined &&
          user.organizations[0] === "None" ? (
            <Button width="full" title={t("Profile.button.selectChange")} />
          ) : null}
        </div>
      ) : null}
      {user.details.address !== undefined ? (
        <div className="flex flex-col gap-2 p-5">
          <Heading variant="h2">{t("Profile.address.header")}</Heading>
          <div className="w-full border-t-2" />
          <span>
            {t("Profile.address.street")}: {user.details.address}
          </span>
        </div>
      ) : null}
      <div className="flex flex-col gap-2 p-5">
        <Heading variant="h2">{t("Profile.time.header")}</Heading>
        <div className="w-full border-t-2" />
        <span>
          {t("Profile.time.created")}: {user.created.toLocaleString()}
        </span>
        <span>
          {t("Profile.time.accessed")}: {user.accessed.toLocaleString()}
        </span>
        <span>
          {t("Profile.time.updated")}: {user.updated.toLocaleString()}
        </span>
      </div>
      <Modal open={edit} closeModal={closeModal}>
        <ProfileForm user={user} />
      </Modal>
      <Button
        width="full"
        title={t(`Profile.button.${edit ? "save" : "edit"}`)}
        startIcon={edit ? <CheckIcon /> : <EditIcon />}
        onClick={handleOnClickButtonEdit}
      />
      <Button
        testid="button-delete"
        width="full"
        onClick={handleOnClickButtonDelete}
        title={t("Profile.button.delete")}
      />
    </div>
  );
};

export default Profile;
