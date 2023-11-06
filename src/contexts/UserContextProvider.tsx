import useUser, { UserProps } from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/Loading";
import React, { PropsWithChildren, createContext } from "react";
import { useTranslation } from "react-i18next";

interface UserContextProviderProps {}

export type UserContext = {
  user: UserProps | undefined;
};

export const UserContext = createContext<UserContext>({
  user: undefined,
});

const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProviderProps>
> = (props) => {
  const { children } = props;
  const { loadIsLoggedInQuery, loadUserQuery } = useUser();

  const isLoggedInIsLoaded: boolean =
    loadIsLoggedInQuery.isFetched && loadIsLoggedInQuery.data !== undefined;

  return isLoggedInIsLoaded ? (
    <UserContext.Provider value={{ user: loadUserQuery.data }}>
      {children}
    </UserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default UserContextProvider;
