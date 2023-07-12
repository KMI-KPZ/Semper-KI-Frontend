import { User, UserType } from "@/hooks/useUser/types";
import { Error } from "@/pages/Error/Error";
import LoginView from "@/pages/Login/Login";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

interface Props {
  user: User | undefined;
}

interface AdminProps {
  userType: UserType | undefined;
}

export const PrivateClientRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (user !== undefined && user.type !== UserType.client)
    return <Error text={t("PrivateRoutes.error.client")} />;
  return user !== undefined && user.type === UserType.client ? (
    <Outlet />
  ) : (
    <LoginView path={pathname} userType={UserType.client} />
  );
};

export const PrivateManufacturerRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (user !== undefined && user.type !== UserType.manufacturer)
    return <Error text={t("PrivateRoutes.error.manufacturer")} />;
  return user !== undefined && user.type === UserType.manufacturer ? (
    <Outlet />
  ) : (
    <LoginView path={pathname} userType={UserType.manufacturer} />
  );
};

export const PrivateRoutes: React.FC<{ user?: User }> = ({ user }) => {
  const { pathname } = useLocation();
  return user !== undefined ? <Outlet /> : <LoginView path={pathname} />;
};

export const PrivateAdminRoutes: React.FC<AdminProps> = (props) => {
  const { userType } = props;
  const { t } = useTranslation();
  return userType === UserType.admin ? <Outlet /> : <Error />;
};
