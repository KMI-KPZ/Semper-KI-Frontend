import { Button, Switch } from "@mui/material";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import { EUserType } from "../../interface/enums";
import { IUser } from "../../interface/Interface";

interface Props {
  user: IUser;
}

const Account: React.FC<Props> = (props) => {
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
      <h1>Account</h1>
      <span>name: {user.name}</span>
      <span>email: {user.email}</span>
      <span>type: {EUserType[userType]}</span>
      <span>Organisation: {user.organization}</span>
      <div className="flex flex-col gap-2 bg-slate-200 p-2">
        <h2>Adresse</h2>
        <span>
          Straße: {user.address.street} {user.address.houseNumber}
        </span>
        <span>
          Stadt: {user.address.zipcode} {user.address.city}
        </span>
        <span>Land: {user.address.country}</span>
      </div>
      <span>created: {user.created.toLocaleString()}</span>
      <span>accessed: {user.accessed.toLocaleString()}</span>
      <span>updated: {user.updated.toLocaleString()}</span>
      <Button
        sx={{
          backgroundColor: "grey",
          "&:hover": { backgroundColor: "#888888" },
        }}
        variant="contained"
        onClick={handleOnClickButtonDelete}
      >
        Benutzer Löschen
      </Button>
    </div>
  );
};

export default Account;
