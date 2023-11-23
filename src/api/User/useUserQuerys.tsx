import { customAxios } from "../customAxios";
import logger from "@/hooks/useLogger";
import { getUserType } from "@/services/utils";
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
          logger("useUser | getUser ✅ |", userData);
          const newUser: AuthorizedUserProps = {
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
