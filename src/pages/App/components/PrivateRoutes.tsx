import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { EUserType } from "../../../interface/enums";
import { IUser } from "../../../interface/Interface";
import { Error } from "../../Error";
import LoginView from "../../Login/LoginView";

interface Props {
  user: IUser | undefined;
}

interface AdminProps {
  userType: EUserType | undefined;
}

export const PrivateClientRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (user !== undefined && user.type !== EUserType.client)
    return <Error text={t("PrivateRoutes.error.client")} />;
  return user !== undefined && user.type === EUserType.client ? (
    <Outlet />
  ) : (
    <LoginView path={pathname} userType={EUserType.client} />
  );
};

export const PrivateManufacturerRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (user !== undefined && user.type !== EUserType.manufacturer)
    return <Error text={t("PrivateRoutes.error.manufacturer")} />;
  return user !== undefined && user.type === EUserType.manufacturer ? (
    <Outlet />
  ) : (
    <LoginView path={pathname} userType={EUserType.manufacturer} />
  );
};

export const PrivateRoutes: React.FC<{ user?: IUser }> = ({ user }) => {
  const { pathname } = useLocation();
  return user !== undefined ? <Outlet /> : <LoginView path={pathname} />;
};

export const PrivateAdminRoutes: React.FC<AdminProps> = (props) => {
  const { userType } = props;
  const { t } = useTranslation();
  return userType === EUserType.admin ? <Outlet /> : <Error />;
};
