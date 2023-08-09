import { User, UserType } from "@/hooks/useUser/types";
import { Error } from "@/pages/Error/Error";
import LoginView from "@/pages/Login/Login";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

interface Props {
  user: User | undefined;
}

export const UserRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { pathname } = useLocation();
  return user === undefined ? <LoginView path={pathname} /> : <Outlet />;
};

export const AdminRoutes: React.FC<Props> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  return user !== undefined && user.usertype === UserType.ADMIN ? (
    <Outlet />
  ) : (
    <Error />
  );
};
