import React, { useState } from "react";

interface AccessTokenReturnProps {
  token: string;
  refreshToken: string;
  login(token: any): void;
  logout(): void;
}

const AccessToken = (): AccessTokenReturnProps => {
  const [token, setToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const login = (token: string) => {
    console.log("set Token in Local Storage", token);

    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { token, refreshToken, login, logout };
};

export default AccessToken;
