import { Button } from "@mui/material";
import React from "react";
import useUser from "../../../hooks/useUser";
import { EUserType } from "../../../interface/enums";
import { IUser } from "../../../interface/Interface";

import "./Account.scss";

interface Props {
  user: IUser;
}

const Account: React.FC<Props> = ({ user }) => {
  const { deleteUser, updateUser } = useUser();

  const handleOnClickButtonDelete = () => {
    deleteUser();
  };
  const handleOnClickButtonUpdate = () => {
    updateUser();
  };

  return (
    <div className="account">
      <h1>Account</h1>
      <span>name: {user.name}</span>
      <span>email: {user.email}</span>
      <span>type: {EUserType[user.type]}</span>
      <span>created: {user.created}</span>
      <span>accessed: {user.accessed}</span>
      <span>updated: {user.updated}</span>
      <Button
        variant="contained"
        color="error"
        onClick={handleOnClickButtonDelete}
      >
        Benutzer Löschen
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handleOnClickButtonUpdate}
      >
        Benutzer Updaten
      </Button>
    </div>
  );
};

export default Account;
