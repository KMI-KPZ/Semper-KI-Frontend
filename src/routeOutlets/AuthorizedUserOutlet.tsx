import { AppLoadingSuspense } from "@component-library/Loading";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser, {
  AuthorizedUserProps,
  UpdateUserProps,
  UserDetailsProps,
  UserType,
} from "@/hooks/useUser";
import logger from "@/hooks/useLogger";

interface AuthorizedUserOutletProps {}

export type AuthorizedUserContext = {
  user: AuthorizedUserProps;
  deleteUser(): void;
  updateUserDetails: (details: UpdateUserProps) => void;
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
  updateUserDetails: () => {},
});

const AuthorizedUserRouteOutlet: React.FC<AuthorizedUserOutletProps> = (
  props
) => {
  const {} = props;
  const { user, deleteUser, updateUserDetails } = useUser();
  const { pathname } = useLocation();

  return user.usertype !== UserType.ANONYM ? (
    <AuthorizedUserContext.Provider
      value={{ user, deleteUser, updateUserDetails }}
    >
      <Outlet />
    </AuthorizedUserContext.Provider>
  ) : (
    <Navigate to={`/login?redirectURL=${pathname}`} />
  );
};

export default AuthorizedUserRouteOutlet;
