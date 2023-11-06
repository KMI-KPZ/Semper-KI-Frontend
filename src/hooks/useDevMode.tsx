import React from "react";
import { useTranslation } from "react-i18next";
import { getCustomAxios } from "./useCustomAxios";
import logger from "./useLogger";
import { getUserType } from "@/services/utils";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import useUser, { UserProps } from "./useUser";

interface useDevModeProps {
  mockedUserType?: MockedUserType;
}

interface useDevModeReturnProps {
  loadMockedUserQuery: UseQueryResult<UserProps, Error>;
}

export type MockedUserType = "user" | "organisation" | "admin";

const useDevMode = (props: useDevModeProps): useDevModeReturnProps => {
  const { mockedUserType } = props;
  const { loadIsLoggedInQuery } = useUser();

  const loadMockedUserQuery = useQuery<UserProps, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      return getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/private/mockLogin/`, {
          headers: { Usertype: mockedUserType },
        })
        .then((response) => {
          const userData = response.data;
          logger("useUser | mockedGetUser ✅ |", userData);
          const newUser: UserProps = {
            ...userData,
            accessed: new Date(userData.accessed),
            created: new Date(userData.created),
            updated: new Date(userData.updated),
            lastSeen: new Date(userData.lastSeen),
            usertype: getUserType(userData.usertype),
          };
          return newUser;
        });
    },
    enabled:
      mockedUserType !== undefined &&
      loadIsLoggedInQuery.isFetched &&
      loadIsLoggedInQuery.data !== undefined &&
      loadIsLoggedInQuery.data === true,
  });

  return { loadMockedUserQuery };
};

export default useDevMode;
