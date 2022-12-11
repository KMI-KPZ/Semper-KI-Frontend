import React from "react";
import { AuthTokenType } from "../../../interface/Interface";
import { getCurrentTimeInSecons } from "../../../services/utils";

import "./Account.scss";

interface Props {
  authToken: AuthTokenType;
}

const Account = ({ authToken }: Props) => {
  return (
    <div className="account">
      <h1>Account</h1>
      <span>Time: {getCurrentTimeInSecons()}</span>
      <span>
        User Expired:
        {authToken.userinfo.exp < getCurrentTimeInSecons()
          ? "true"
          : "false"}{" "}
      </span>
      <span>
        User Expires in:
        {authToken.userinfo.exp - getCurrentTimeInSecons()}secs
      </span>
      <span>
        Token Expired:
        {authToken.expires_at < getCurrentTimeInSecons() ? "true" : "false"}
      </span>
      <span>
        Token Exspires in:
        {authToken.expires_at - getCurrentTimeInSecons()}secs
      </span>
      <h2>User</h2>
      <span>name: {authToken.userinfo.name}</span>
      <span>nickname: {authToken.userinfo.nickname}</span>
      <span>email: {authToken.userinfo.email}</span>
      <span>email_verified: {authToken.userinfo.email_verified}</span>
      <span>exp: {authToken.userinfo.exp}</span>
      <span>iat: {authToken.userinfo.iat}</span>
      <span>iss: {authToken.userinfo.iss}</span>
      <h2>Token</h2>
      <span>access_token: {authToken.access_token}</span>
      <span>expires_at: {authToken.expires_at}</span>
      <span>expires_in: {authToken.expires_in}</span>
      <span>id_token: {authToken.id_token}</span>
      <span>scope: {authToken.scope}</span>
      <span>token_type: {authToken.token_type}</span>
    </div>
  );
};

export default Account;
