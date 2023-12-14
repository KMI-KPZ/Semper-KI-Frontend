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
    accessedWhen: new Date(),
    createdWhen: new Date(),
    details: {
      email: "",
    },
    hashedID: "",
    lastSeen: new Date(),
    name: "",
    updatedWhen: new Date(),
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
