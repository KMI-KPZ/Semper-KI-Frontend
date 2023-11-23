import { AppLoadingSuspense } from "@component-library/Loading";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";

interface AuthorizedUserOutletProps {}

export type AuthorizedUserContext = {
  user: AuthorizedUserProps;
  deleteUser(): void;
};

export const AuthorizedUserContext = createContext<AuthorizedUserContext>({
  user: {
    accessed: new Date(),
    created: new Date(),
    email: "",
    details: {},
    hashedID: "",
    lastSeen: new Date(),
    name: "",
    organizations: [],
    updated: new Date(),
    usertype: 0,
  },
  deleteUser: () => {},
});

const AuthorizedUserRouteOutlet: React.FC<AuthorizedUserOutletProps> = (
  props
) => {
  const {} = props;
  const { user, deleteUser } = useUser();

  return user.usertype !== UserType.ANONYM ? (
    <AuthorizedUserContext.Provider value={{ user, deleteUser }}>
      <Outlet />
    </AuthorizedUserContext.Provider>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthorizedUserRouteOutlet;
