import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EUserType } from "../../interface/enums";
import PersonIcon from "@mui/icons-material/Person";
import FactoryIcon from "@mui/icons-material/Factory";

interface Props {
  userType: EUserType;
  onClick(userType: EUserType): void;
}

const UserSwitch: React.FC<Props> = (props) => {
  const { onClick, userType } = props;
  const { t } = useTranslation();

  const handleOnClickSwitch = () => {
    onClick(
      userType === EUserType.client ? EUserType.manufacturer : EUserType.client
    );
  };

  return (
    <div
      className="relative flex select-none flex-row items-center justify-between gap-2 overflow-clip bg-türkis-300 p-1 hover:cursor-pointer"
      onClick={handleOnClickSwitch}
    >
      <span
        className={`flex flex-row items-center justify-center gap-2 py-1 px-3 duration-300
  ${
    userType === EUserType.client ? "bg-türkis-800 text-white" : "bg-türkis-300"
  }`}
      >
        <PersonIcon />
        {t("General.UserSwitch.button.client")}
      </span>
      <div
        className={`absolute ${
          userType === EUserType.client ? "left-0" : "right-0"
        }`}
      />
      <span
        className={`flex flex-row items-center justify-center gap-2 py-1 px-3 duration-300
  ${
    userType === EUserType.client ? "bg-türkis-300" : "bg-türkis-800 text-white"
  }`}
      >
        <FactoryIcon />
        {t("General.UserSwitch.button.contractor")}
      </span>
    </div>
  );
};

export default UserSwitch;
