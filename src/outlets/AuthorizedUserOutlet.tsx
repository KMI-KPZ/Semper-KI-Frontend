import { AppLoadingSuspense } from "@component-library/Loading";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { Outlet } from "react-router-dom";
import { UserProps } from "@/hooks/useUser";

interface AuthorizedUserOutletProps {}

export type AuthorizedUserContext = {
  user: UserProps;
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
});

const AuthorizedUserOutlet: React.FC<AuthorizedUserOutletProps> = (props) => {
  const {} = props;
  const { user } = useContext(UserContext);

  return user !== undefined ? (
    <AuthorizedUserContext.Provider value={{ user }}>
      <Outlet />
    </AuthorizedUserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default AuthorizedUserOutlet;
