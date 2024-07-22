import React, { PropsWithChildren, createContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import { useTranslation } from "react-i18next";
import { UseQueryResult } from "@tanstack/react-query";

interface AuthorizedUserOutletProps {}

export type AuthorizedUserContext = {
  user: AuthorizedUserProps;
  query: UseQueryResult<AuthorizedUserProps, Error>;
};

export const AuthorizedUserContext = createContext<AuthorizedUserContext>({
  user: {} as AuthorizedUserProps,
  query: {} as UseQueryResult<AuthorizedUserProps, Error>,
});

const AuthorizedUserRouteOutlet: React.FC<
  PropsWithChildren<AuthorizedUserOutletProps>
> = (props) => {
  const { t } = useTranslation();
  const { children } = props;
  const { pathname } = useLocation();
  const { user, query } = useUser();

  // if (query.isFetching && query.isRefetching) return <LoadingAnimation />;
  return user.usertype !== UserType.ANONYM ? (
    <AuthorizedUserContext.Provider
      value={{
        user,
        query,
      }}
    >
      {children}
      <Outlet />
    </AuthorizedUserContext.Provider>
  ) : children === undefined ? (
    <Navigate to={`/login?redirectURL=${pathname}`} />
  ) : (
    <Container direction="col" className="bg-white p-5" width="full">
      <h1>{t("routeOutlets.AuthorizedUserOutlet.login")}</h1>
      <Button
        title={t("routeOutlets.AuthorizedUserOutlet.button.login")}
        variant="primary"
        to={`/login?redirectURL=${pathname}`}
      />
    </Container>
  );
};

export default AuthorizedUserRouteOutlet;
