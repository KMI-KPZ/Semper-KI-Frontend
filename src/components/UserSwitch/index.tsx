import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import FactoryIcon from "@mui/icons-material/Factory";
import { UserType } from "@/hooks/useUser/types";
import { Button } from "@component-library/Button";

interface Props {
  userType: UserType;
  onClick(userType: UserType): void;
}

export const UserSwitch: React.FC<Props> = (props) => {
  const { onClick, userType } = props;
  const { t } = useTranslation();

  const handleOnClickSwitch = () => {
    onClick(
      userType === UserType.client ? UserType.manufacturer : UserType.client
    );
  };

  return (
    <div
      className="relative flex w-fit select-none flex-row flex-wrap items-center justify-center gap-2 bg-slate-200 p-1 hover:cursor-pointer "
      onClick={handleOnClickSwitch}
    >
      <Button
        title={t("General.UserSwitch.button.client")}
        startIcon={<PersonIcon />}
        variant={userType === UserType.client ? "primary" : "secondary"}
        onClick={handleOnClickSwitch}
      />
      <div
        className={`absolute ${
          userType === UserType.client ? "left-0" : "right-0"
        }`}
      />
      <Button
        title={t("General.UserSwitch.button.contractor")}
        startIcon={<FactoryIcon />}
        variant={userType === UserType.manufacturer ? "primary" : "secondary"}
        onClick={handleOnClickSwitch}
      />
    </div>
  );
};
