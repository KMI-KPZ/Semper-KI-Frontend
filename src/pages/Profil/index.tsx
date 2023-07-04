import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { User, UserType } from "@/hooks/useUser/types";
import { Heading } from "@component-library/Typography";
import useUser from "@/hooks/useUser";

interface Props {
  user: User;
}

const Profil: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { user } = props;
  const { deleteUser, updateUser } = useUser();
  const [userType, setUserType] = useState<UserType>(user.type);

  const handleOnClickButtonDelete = () => {
    deleteUser();
  };
  const handleOnChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(
      e.currentTarget.checked === true ? UserType.manufacturer : UserType.client
    );
    updateUser(
      e.currentTarget.checked === true ? UserType.manufacturer : UserType.client
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-white p-5">
      <Heading variant="h1">{t("Profil.header")}</Heading>
      <div className="w-full border-t-4" />
      <div className="flex flex-col gap-2 p-5">
        <Heading variant="h2">{t("Profil.general.header")}</Heading>
        <div className="w-full border-t-2" />
        <span>
          {t("Profil.general.name")}: {user.name}
        </span>
        <span>
          {t("Profil.general.email")}: {user.email}
        </span>
        <span>
          {t("Profil.general.type")}: {t(`enum.UserType.${UserType[userType]}`)}
        </span>
      </div>
      {userType === UserType.manufacturer ? (
        <div className="flex flex-col gap-2 p-5">
          <Heading variant="h2">{t("Profil.company.header")}</Heading>
          <div className="w-full border-t-2" />
          <span>
            {t("Profil.company.name")}: {user.organization}
          </span>
          {user.organization === "None" ? (
            <Button width="full" title={t("Profil.button.selectChange")} />
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col gap-2 p-5">
        <Heading variant="h2">{t("Profil.address.header")}</Heading>
        <div className="w-full border-t-2" />
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
      </div>{" "}
      <div className="flex flex-col gap-2 p-5">
        <Heading variant="h2">{t("Profil.time.header")}</Heading>
        <div className="w-full border-t-2" />
        <span>
          {t("Profil.time.created")}: {user.created.toLocaleString()}
        </span>
        <span>
          {t("Profil.time.accessed")}: {user.accessed.toLocaleString()}
        </span>
        <span>
          {t("Profil.time.updated")}: {user.updated.toLocaleString()}
        </span>
      </div>
      <Button
        testid="button-delete"
        width="full"
        onClick={handleOnClickButtonDelete}
        title={t("Profil.button.delete")}
      />
    </div>
  );
};

export default Profil;
