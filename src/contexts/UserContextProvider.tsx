import useUser, { UserProps } from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/Loading";
import { userInfo } from "os";
import React, {
  Dispatch,
  PropsWithChildren,
  createContext,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface UserContextProviderProps {}

export type UserContext = {
  user: UserProps | undefined;
  deleteUser(): void;
};

export const UserContext = createContext<UserContext>({
  user: undefined,
  deleteUser: () => {},
});

const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProviderProps>
> = (props) => {
  const { children } = props;
  const { loadIsLoggedInQuery, userQuery, deleteUser } = useUser();

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
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default UserContextProvider;
