import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { EUserType } from "../../interface/enums";
import { IUser } from "../../interface/Interface";

interface Props {
  user: IUser | undefined;
}

interface AdminProps {
  userType: EUserType;
}

export const PrivateRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  return user !== undefined ? <Outlet /> : <Navigate to="/login-client" />;
};

export const PrivateAdminRoutes: React.FC<AdminProps> = (props) => {
  const { userType } = props;
  return userType === EUserType.admin ? <Outlet /> : <Navigate to="/" />;
};
