import useGetIsLoggedIn from "@/api/Authentification/Querys/useGetIsLoggedIn";
import useGetUser from "@/api/User/Querys/useGetUser";
import { toast } from "@/hooks/useToast";
import { AuthorizedUserProps, UserProps, UserType } from "@/hooks/useUser";
import { AppLoadingSuspense } from "@component-library/index";
import { UseQueryResult } from "@tanstack/react-query";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface UserContextProviderProps {}

export type UserContext = {
  query: UseQueryResult<AuthorizedUserProps, Error>;
  user: UserProps;
  isLoggedIn: boolean;
};

export const UserContext = createContext<UserContext>({
  query: {} as UseQueryResult<AuthorizedUserProps, Error>,
  user: {} as UserProps,
  isLoggedIn: false,
});

const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProviderProps>
> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const userIsLoggedInQuery = useGetIsLoggedIn();
  const userQuery = useGetUser(userIsLoggedInQuery);

  const [userReminder, setUserReminder] = useState(false);

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

  useEffect(() => {
    if (
      userReminder === false &&
      user.usertype !== UserType.ANONYM &&
      (user.details.addresses === undefined ||
        user.details.addresses.length === 0)
      // user.details.email === undefined ||
      // user.details.email === "")
    ) {
      setUserReminder(true);
      toast(t("contexts.UserContextProvider.completeUserData"), "account");
    }
  }, [user, userReminder]);

  return isLoggedInIsLoaded && userIsLoaded ? (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        query: userQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  ) : (
    <AppLoadingSuspense />
  );
};

export default UserContextProvider;
