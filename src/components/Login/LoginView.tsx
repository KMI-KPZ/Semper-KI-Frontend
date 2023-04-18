import React, { ReactNode, useState } from "react";
import { EUserType } from "../../interface/enums";
import Button from "../General/Button";
import Login from "./Login";

interface Props {
  path?: string;
  register?: boolean;
}

const LoginView: React.FC<Props> = (props) => {
  const { path, register } = props;
  const [userType, setUserType] = useState<EUserType>();

  const handleOnClickButtonClient = () => {
    setUserType(EUserType.client);
  };
  const handleOnClickButtonManufacturer = () => {
    setUserType(EUserType.manufacturer);
  };

  if (userType !== undefined)
    return (
      <Login
        userType={EUserType.manufacturer}
        path={path}
        register={register}
      />
    );
  return (
    <div className="flex flex-col w-fit p-5 items-center justify-center gap-5 bg-white">
      <h1>
        {path === undefined
          ? "Anmelden"
          : "Für die gewünschte Seite müssen sie sich anmelden"}
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        <Button onClick={handleOnClickButtonClient}>
          {path === undefined ? "Für Kunde" : "Als Kunde Anmelden/Registieren"}
        </Button>
        <Button onClick={handleOnClickButtonManufacturer}>
          {path === undefined
            ? "Für Hersteller"
            : "Als Hersteller Anmelden/Registieren"}
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
