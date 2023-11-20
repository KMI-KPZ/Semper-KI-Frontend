import useUserQuerys from "@/api/User/useUserQuerys";
import useUser, { UserProps } from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/Loading";
import { UseQueryResult } from "@tanstack/react-query";
import React, { PropsWithChildren, createContext } from "react";

interface UserContextProviderProps {}

export type UserContext = {
  user: UserProps | undefined;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContext>({
  user: undefined,
  isLoggedIn: false,
});

const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProviderProps>
> = (props) => {
  const { children } = props;
  const { loadIsLoggedInQuery, userQuery } = useUserQuerys();

  const isLoggedInIsLoaded: boolean =
    loadIsLoggedInQuery.isFetched && loadIsLoggedInQuery.data !== undefined;

  const userIsLoaded: boolean =
    isLoggedInIsLoaded &&
    ((loadIsLoggedInQuery.data === true &&
      userQuery.isFetched &&
      userQuery.data !== undefined) ||
      loadIsLoggedInQuery.data === false);

  return isLoggedInIsLoaded && userIsLoaded ? (
    <UserContext.Provider
      value={{
        user: userQuery.data,
        isLoggedIn: loadIsLoggedInQuery.data === true,
      }}
    >
      {children}
    </UserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default UserContextProvider;
