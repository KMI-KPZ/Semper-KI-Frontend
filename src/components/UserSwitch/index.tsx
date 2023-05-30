import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import FactoryIcon from "@mui/icons-material/Factory";
import { UserType } from "@/hooks/useUser";

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
      className="relative flex select-none flex-col items-center justify-between gap-2 overflow-clip bg-türkis-300 p-1 hover:cursor-pointer xl:flex-row"
      onClick={handleOnClickSwitch}
    >
      <span
        className={`flex w-full flex-row items-center justify-center gap-2 px-3 py-1 duration-300 xl:w-fit
  ${
    userType === UserType.client ? "bg-türkis-800 text-white" : "bg-türkis-300"
  }`}
      >
        <PersonIcon />
        {t("General.UserSwitch.button.client")}
      </span>
      <div
        className={`absolute ${
          userType === UserType.client ? "left-0" : "right-0"
        }`}
      />
      <span
        className={`flex w-full flex-row items-center justify-center gap-2 px-3 py-1 duration-300 xl:w-fit
  ${
    userType === UserType.client ? "bg-türkis-300" : "bg-türkis-800 text-white"
  }`}
      >
        <FactoryIcon />
        {t("General.UserSwitch.button.contractor")}
      </span>
    </div>
  );
};
