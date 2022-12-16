import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { IAuthToken, IUser } from "../interface/Interface";

interface ReturnProps {
  authToken: IAuthToken | undefined;
  user: IUser | undefined;
  getUser(): void;
  logoutUser(): void;
}

const useUser = (): ReturnProps => {
  const [authToken, setAuthToken] = useState<IAuthToken | undefined>();

  const getUser = () => {
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
    Cookies.remove("csrftoken");
  };

  return { authToken, user: authToken?.userinfo, getUser, logoutUser };
};

export default useUser;
