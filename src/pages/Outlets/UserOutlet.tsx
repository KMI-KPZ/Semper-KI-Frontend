import { UserProps, UserType } from "@/hooks/useUser/types";
import { Error } from "@/pages/Error/Error";
import LoginView from "@/pages/Login/Login";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

interface Props {
  user: UserProps | undefined;
}

export const UserOutlet: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  return user === undefined ? <LoginView path={pathname} /> : <Outlet />;
};

export const OrganizationOutlet: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  const { t } = useTranslation();
  if (user === undefined) return <LoginView path={pathname} />;
  return user.usertype === UserType.ORGANIZATION ? (
    <Outlet />
  ) : (
    <Error text={t("Outlets.UserOutlet.error.organization")} />
  );
};

export const AdminOutlet: React.FC<Props> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  return user !== undefined && user.usertype === UserType.ADMIN ? (
    <Outlet />
  ) : (
    <Error />
  );
};
