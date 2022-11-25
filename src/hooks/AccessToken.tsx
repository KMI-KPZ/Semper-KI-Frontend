import React, { useState } from "react";

interface AccessTokenReturnProps {
  token: string;
  refreshToken: string;
}

const AccessToken = (): AccessTokenReturnProps => {
  const [token, setToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  return { token, refreshToken };
};

export default AccessToken;
