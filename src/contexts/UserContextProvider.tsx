import useUserQuerys from "@/api/User/useUserQuerys";
import logger from "@/hooks/useLogger";
import useUser, {
  UserProps,
  AuthorizedUserProps,
  UserType,
  AnonymUser,
} from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/Loading";
import { UseQueryResult } from "@tanstack/react-query";
import React, { PropsWithChildren, createContext } from "react";

interface UserContextProviderProps {}

export type UserContext = {
  user: UserProps;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContext>({
  user: { usertype: UserType.ANONYM },
  isLoggedIn: false,
});

const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProviderProps>
> = (props) => {
  const { children } = props;
  const { loadIsLoggedInQuery, userQuery } = useUserQuerys();

  const isLoggedInIsLoaded: boolean =
    loadIsLoggedInQuery.isFetched && loadIsLoggedInQuery.data !== undefined;

  const isLoggedIn: boolean = loadIsLoggedInQuery.data === true;

  const userIsLoaded: boolean =
    isLoggedInIsLoaded &&
    (!isLoggedIn ||
      (isLoggedIn && userQuery.isFetched && userQuery.data !== undefined));

  const user: UserProps =
    userQuery.data === undefined
      ? { usertype: UserType.ANONYM }
      : userQuery.data;

  return isLoggedInIsLoaded && userIsLoaded ? (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default UserContextProvider;
