import path from "path";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { EUserType } from "../../interface/enums";
import { IUser } from "../../interface/Interface";
import Login from "../Login/Login";

interface Props {
  user: IUser | undefined;
}

interface AdminProps {
  userType: EUserType;
}

export const PrivateClientRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  return user !== undefined && user.type === EUserType.client ? (
    <Outlet />
  ) : (
    <Login userType={EUserType.client} path={pathname} />
  );
};

export const PrivateContractorRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  return user !== undefined && user.type === EUserType.manufacturer ? (
    <Outlet />
  ) : (
    <Login userType={EUserType.manufacturer} path={pathname} />
  );
};

export const PrivateAdminRoutes: React.FC<AdminProps> = (props) => {
  const { userType } = props;
  return userType === EUserType.admin ? <Outlet /> : <Navigate to="/" />;
};
