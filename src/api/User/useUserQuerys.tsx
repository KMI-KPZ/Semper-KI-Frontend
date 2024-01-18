import { customAxios } from "../customAxios";
import logger from "@/hooks/useLogger";
import { getAuthorizedUserType } from "@/services/utils";
import { AuthorizedUserProps } from "@/hooks/useUser";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface useUserQueryReturnProps {
  loadIsLoggedInQuery: UseQueryResult<boolean, Error>;
  userQuery: UseQueryResult<AuthorizedUserProps, Error>;
}

const useUserQuerys = (): useUserQueryReturnProps => {
  const navigate = useNavigate();

  const loadIsLoggedInQuery = useQuery<boolean, Error>({
    queryKey: ["isLoggedIn"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/isLoggedIn/`)
        .then((response) => {
          logger("useUser | isLoggedIn ✅ |", response.data);
          return response.data === "Success" ? true : false;
        }),
  });

  const userQuery = useQuery<AuthorizedUserProps, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      return customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getUser/`)
        .then((response) => {
          const userData = response.data;
          const newUser: AuthorizedUserProps = {
            hashedID: userData.hashedID,
            name: userData.name,
            organization: userData.organization,
            details: {
              email: userData.details.email,
              address: userData.details.address,
            },
            accessedWhen: new Date(userData.accessedWhen),
            createdWhen: new Date(userData.createdWhen),
            updatedWhen: new Date(userData.updatedWhen),
            lastSeen: new Date(userData.lastSeen),
            usertype: getAuthorizedUserType(userData.usertype),
          };
          logger("useUser | getUser ✅ |", newUser);
          return newUser;
        });
    },
    enabled:
      loadIsLoggedInQuery.isFetched &&
      loadIsLoggedInQuery.data !== undefined &&
      loadIsLoggedInQuery.data === true,
  });

  return {
    loadIsLoggedInQuery,
    userQuery,
  };
};

export default useUserQuerys;
