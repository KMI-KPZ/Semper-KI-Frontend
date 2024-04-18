import useGetUser from "@/api/User/Querys/useGetUser";
import useGetUserIsLoggedIn from "@/api/User/Querys/useGetUserIsLoggedIn";
import { UserProps, UserType } from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren, createContext } from "react";

interface UserContextProviderProps {}

export type UserContext = {
  user: UserProps;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContext>({
  user: { usertype: 3 },
  isLoggedIn: false,
});

const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProviderProps>
> = (props) => {
  const { children } = props;
  const userIsLoggedInQuery = useGetUserIsLoggedIn();
  const userQuery = useGetUser(userIsLoggedInQuery);

  const isLoggedInIsLoaded: boolean =
    userIsLoggedInQuery.isFetched && userIsLoggedInQuery.data !== undefined;

  const isLoggedIn: boolean = userIsLoggedInQuery.data === true;

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
