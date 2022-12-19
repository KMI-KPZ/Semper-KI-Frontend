import axios from "axios";
import React, { useState } from "react";
import { IAuthToken, IUser } from "../interface/Interface";

interface ReturnProps {
  authToken: IAuthToken | undefined;
  user: IUser | undefined;
  loadUser(): void;
  logoutUser(): void;
}

const useUser = (): ReturnProps => {
  const [authToken, setAuthToken] = useState<IAuthToken | undefined>();

  const loadUser = () => {
    axios
      .get("http://localhost:8000/getUser/")
      .then((response) => {
        console.log("getUser Data", response.data);
        setAuthToken(response.data);
      })
      .catch((error) => {
        console.log("getUser Error", error);
        setAuthToken(undefined);
      });
  };

  const logoutUser = () => {
    setAuthToken(undefined);
    axios
      .get("http://localhost:8000/deleteSession/")
      .then((response) => {
        console.log("Delete Session Id", response.data);
      })
      .catch((error) => {
        console.log("Delete Session Id Error", error);
      });
  };

  return {
    authToken,
    user: authToken?.userinfo,
    loadUser,
    logoutUser,
  };
};

export default useUser;
