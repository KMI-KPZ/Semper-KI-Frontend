import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useUser from "../../hooks/useUser";
import { EUserType } from "../../interface/enums";
import { IUser } from "../../interface/Interface";

interface Props {
  user: IUser;
}

const Profil: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { user } = props;
  const { deleteUser, updateUser } = useUser();
  const [userType, setUserType] = useState<EUserType>(user.type);

  const handleOnClickButtonDelete = () => {
    deleteUser();
  };
  const handleOnChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    setUserType(
      e.currentTarget.checked === true
        ? EUserType.manufacturer
        : EUserType.client
    );
    updateUser(
      e.currentTarget.checked === true
        ? EUserType.manufacturer
        : EUserType.client
    );
  };

  return (
    <div className="flex flex-col gap-2 p-10 bg-white">
      <h1>{t("Profil.header")}</h1>
      <span>
        {t("Profil.name")}: {user.name}
      </span>
      <span>
        {t("Profil.email")}: {user.email}
      </span>
      <span>
        {t("Profil.type")}: {EUserType[userType]}
      </span>
      <span>
        {t("Profil.company")}: {user.organization}
      </span>
      <div className="flex flex-col gap-2 bg-slate-200 p-2">
        <h2>{t("Profil.address.header")}</h2>
        <span>
          {t("Profil.address.street")}: {user.address.street}{" "}
          {user.address.houseNumber}
        </span>
        <span>
          {t("Profil.address.city")}: {user.address.zipcode} {user.address.city}
        </span>
        <span>
          {t("Profil.address.country")}: {user.address.country}
        </span>
      </div>
      <span>
        {t("Profil.address.created")}: {user.created.toLocaleString()}
      </span>
      <span>
        {t("Profil.address.accessed")}: {user.accessed.toLocaleString()}
      </span>
      <span>
        {t("Profil.address.updated")}: {user.updated.toLocaleString()}
      </span>
      <Button
        sx={{
          backgroundColor: "grey",
          "&:hover": { backgroundColor: "#888888" },
        }}
        variant="contained"
        onClick={handleOnClickButtonDelete}
      >
        {t("Profil.button.delete")}
      </Button>
    </div>
  );
};

export default Profil;
