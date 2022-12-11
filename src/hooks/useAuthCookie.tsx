import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AuthTokenType } from "../interface/Interface";

interface useAuthCookieReturnProps {
  authToken: AuthTokenType | null;
  authLogin(): void;
  authLogout(): void;
}

const useAuthCookie = (): useAuthCookieReturnProps => {
  const [authToken, setAuthToken] = useState<AuthTokenType | null>(null);

  useEffect(() => {
    const oldAuthToken = localStorage.getItem("authToken");
    // console.log("oldAuthToken", oldAuthToken);
    if (oldAuthToken !== null) {
      const oldAuthTokenJSON = JSON.parse(oldAuthToken);
      // console.log("oldAuthToken JSON ", oldAuthTokenJSON);
      setAuthToken(oldAuthTokenJSON);
    }
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

      Cookies.remove("authToken");
      Cookies.remove("derp_cookie");
    }
  };

  const authLogout = (): void => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return { authToken, authLogin, authLogout };
};

export default useAuthCookie;
