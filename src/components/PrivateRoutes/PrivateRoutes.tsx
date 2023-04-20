import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { EUserType } from "../../interface/enums";
import { IUser } from "../../interface/Interface";
import { Error } from "../Error/Error";
import Login from "../Login/Login";
import LoginView from "../Login/LoginView";

interface Props {
  user: IUser | undefined;
}

interface AdminProps {
  userType: EUserType | undefined;
}

export const PrivateClientRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();

  if (user !== undefined && user.type !== EUserType.client)
    return (
      <Error text="Sie Müssen als Kunde angemeldet Sein um diese Seite zu sehen" />
    );
  return user !== undefined && user.type === EUserType.client ? (
    <Outlet />
  ) : (
    <Login userType={EUserType.client} path={pathname} />
  );
};

export const PrivateManufacturerRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();

  if (user !== undefined && user.type !== EUserType.manufacturer)
    return (
      <Error text="Sie Müssen als Hersteller angemeldet Sein um diese Seite zu sehen" />
    );
  return user !== undefined && user.type === EUserType.manufacturer ? (
    <Outlet />
  ) : (
    <Login userType={EUserType.manufacturer} path={pathname} />
  );
};

export const PrivateRoutes: React.FC<{ user?: IUser }> = ({ user }) => {
  const { pathname } = useLocation();
  return user !== undefined ? <Outlet /> : <LoginView path={pathname} />;
};

export const PrivateAdminRoutes: React.FC<AdminProps> = (props) => {
  const { userType } = props;
  return userType === EUserType.admin ? <Outlet /> : <Navigate to="/" />;
};
