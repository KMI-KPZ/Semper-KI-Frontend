import { Button, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { EUserType } from "../../../interface/enums";
import { IUser } from "../../../interface/Interface";

import "./Account.scss";

interface Props {
  user: IUser;
}

const Account: React.FC<Props> = ({ user }) => {
  const { deleteUser, updateUser } = useUser();
  const [userType, setUserType] = useState<EUserType>(user.type);

  const handleOnClickButtonDelete = () => {
    deleteUser();
  };
  const handleOnChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    setUserType(
      e.currentTarget.checked === true ? EUserType.contractor : EUserType.client
    );
    updateUser(
      e.currentTarget.checked === true ? EUserType.contractor : EUserType.client
    );
  };

  return (
    <div className="account">
      <h1>Account</h1>
      <span>name: {user.name}</span>
      <span>email: {user.email}</span>
      <span>type: {EUserType[userType]}</span>
      <span>
        {userType === EUserType.client ? <b>client</b> : "client"}
        <Switch
          color="default"
          checked={userType === EUserType.contractor ? true : false}
          onChange={handleOnChangeSwitch}
        />
        {userType === EUserType.contractor ? <b>contractor</b> : "contractor"}
      </span>
      <span>created: {user.created}</span>
      <span>accessed: {user.accessed}</span>
      <span>updated: {user.updated}</span>
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
