import useUser, { UserProps } from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/Loading";
import React, { PropsWithChildren, createContext } from "react";
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
  const { loadIsLoggedInQuery, loadUserQuery, deleteUser } = useUser();

  const isLoggedInIsLoaded: boolean =
    loadIsLoggedInQuery.isFetched && loadIsLoggedInQuery.data !== undefined;

  return isLoggedInIsLoaded ? (
    <UserContext.Provider value={{ user: loadUserQuery.data, deleteUser }}>
      {children}
    </UserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default UserContextProvider;
