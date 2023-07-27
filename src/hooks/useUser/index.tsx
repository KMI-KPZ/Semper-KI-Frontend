import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserType, parseAddress } from "../../services/utils";
import useCRSFToken from "../useCSRFToken";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import { User, UserType } from "./types";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  userType: UserType;
  user: User | undefined;
  isLoggedIn: boolean;
  isLoggedInResponse: boolean;
  loadIsLoggedInQuery: UseQueryResult<boolean, Error>;
  loadUserQuery: UseQueryResult<User, Error>;
  deleteUser(): void;
  updateUser(userType: UserType): void;
}

const useUser = (): ReturnProps => {
  const navigate = useNavigate();
  const { isCSRFTokenLoaded } = useCRSFToken();

  const loadIsLoggedInQuery = useQuery<boolean, Error>({
    queryKey: ["isLoggedIn"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/isLoggedIn/`)
        .then((response) => {
          logger("useUser | isLoggedIn ✅ |", response.data);
          return response.data === "Success" ? true : false;
        }),
    enabled: isCSRFTokenLoaded === true,
  });

  const loadUserQuery = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getUser/`)
        .then((response) => {
          const userData = response.data;
          logger("useUser | getUser ✅ |", userData);
          return {
            ...userData,
            type: getUserType(userData.type),
            address: parseAddress(userData.address),
            accessed: new Date(userData.accessed),
            created: new Date(userData.created),
            updated: new Date(userData.updated),
          };
        }),
    enabled:
      loadIsLoggedInQuery.isFetched &&
      loadIsLoggedInQuery.data !== undefined &&
      loadIsLoggedInQuery.data === true,
  });

  const deleteUser = () => {
    getCustomAxios()
      .delete(`${process.env.VITE_HTTP_API_URL}/public/profileDeleteUser/`)
      .then((response) => {
        logger("useUser | profileDeleteUser ✅ |");
        navigate("/logout");
      })
      .catch((error) => {
        logger("useUser | deleteUser ❌ |", error);
      });
  };

  const updateUser = (userType: UserType) => {
    getCustomAxios()
      .post(`${process.env.VITE_HTTP_API_URL}/public/updateUser/`, {
        userType: UserType[userType],
      })
      .then((response) => {
        logger("useUser | updateUser ✅ |", response);
      })
      .catch((error) => {
        logger("useUser | updateUser ❌ |", error);
      });
  };

  const user: User | undefined =
    loadUserQuery.data !== undefined && loadUserQuery.isFetched
      ? loadUserQuery.data
      : undefined;
  const userType: UserType = user === undefined ? UserType.anonym : user.type;
  const isLoggedInResponse: boolean =
    loadIsLoggedInQuery.data !== undefined &&
    loadIsLoggedInQuery.isFetched &&
    isCSRFTokenLoaded === true;
  const isLoggedIn: boolean =
    isLoggedInResponse && loadIsLoggedInQuery.data === true;

  return {
    loadIsLoggedInQuery,
    loadUserQuery,
    userType,
    user,
    isLoggedIn,
    isLoggedInResponse,
    deleteUser,
    updateUser,
  };
};

export default useUser;
