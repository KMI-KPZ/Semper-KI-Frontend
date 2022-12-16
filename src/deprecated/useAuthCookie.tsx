import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { IAuthToken } from "../interface/Interface";

interface useAuthCookieReturnProps {
  authToken: IAuthToken | null;
  authLogin(): void;
  authLogout(): void;
}

const useAuthCookie = (): useAuthCookieReturnProps => {
  const [authToken, setAuthToken] = useState<IAuthToken | null>(null);

  useEffect(() => {
    const oldAuthToken = localStorage.getItem("authToken");
    // console.log("oldAuthToken", oldAuthToken);
    if (oldAuthToken !== null) {
      const oldAuthTokenJSON: IAuthToken = JSON.parse(oldAuthToken);
      console.log("oldAuthToken JSON ", oldAuthTokenJSON);
      const time = new Date().getTime() / 1000;
      if (oldAuthTokenJSON.expires_at <= time) {
        setAuthToken(null);
        localStorage.removeItem("authToken");
      } else {
        setAuthToken(oldAuthTokenJSON);
      }
    } //exp:10 current:9
  }, []);

  const authLogin = (): void => {
    const rawToken = Cookies.get("authToken");
    const localOldToken = localStorage.getItem("authToken");
    if (localOldToken === null && rawToken !== undefined) {
      let token = rawToken === undefined ? "" : rawToken;
      token = token.replaceAll("\\054", ",").replaceAll("\\", "");
      // console.log("authLogin", token);
      localStorage.setItem("authToken", token);

      let tokenJSON = JSON.parse(token);

      // console.log("authToken JSON", tokenJSON);
      setAuthToken(tokenJSON);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenJSON.access_token}`;

      Cookies.remove("authToken");
      Cookies.remove("derp_cookie");
    }
  };

  const authLogout = (): void => {
    setAuthToken(null);
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("authToken");
  };

  return { authToken, authLogin, authLogout };
};

export default useAuthCookie;
