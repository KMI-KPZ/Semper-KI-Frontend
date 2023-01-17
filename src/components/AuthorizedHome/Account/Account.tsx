import { Button } from "@mui/material";
import React from "react";
import useUser from "../../../hooks/useUser";
import { IUser } from "../../../interface/Interface";
import { getCurrentTimeInSecons, getTimeAsText } from "../../../services/utils";

import "./Account.scss";

interface Props {
  user: IUser;
}

const Account = ({ user }: Props) => {
  const { deleteUser } = useUser();

  const handleOnClickButtonDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    deleteUser();
  };

  return (
    <div className="account">
      <h1>Account</h1>
      <span>name: {user.name}</span>
      <span>email: {user.email}</span>
      <span>type: {user.type}</span>
      <span>created: {user.created}</span>
      <span>accessed: {user.accessed}</span>
      <span>updated: {user.updated}</span>
      <Button variant="contained" onClick={handleOnClickButtonDelete}>
        Benutzer Löschen
      </Button>
    </div>
  );
};

export default Account;
