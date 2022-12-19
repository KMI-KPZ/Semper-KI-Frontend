import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { IAuthToken, IUser } from "../interface/Interface";
import useCRSFToken from "./useCSRFToken";

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
  };

  return {
    authToken,
    user: authToken?.userinfo,
    loadUser,
    logoutUser,
  };
};

export default useUser;
