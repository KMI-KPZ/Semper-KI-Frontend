import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserType, parseAddress } from "../../services/utils";
import useCRSFToken from "../useCSRFToken";
import useCustomAxios from "../useCustomAxios";
import { User, UserType } from "./types";

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
  const { axiosCustom } = useCustomAxios();

  const loadIsLoggedInQuery = useQuery<boolean, Error>({
    queryKey: ["isLoggedIn"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/isLoggedIn/`)
        .then((response) => {
          console.log("useUser | isLoggedIn ✅ |", response.data);
          return response.data === "Success" ? true : false;
        }),
    enabled: isCSRFTokenLoaded === true,
  });

  const loadUserQuery = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getUser/`)
        .then((response) => {
          const userData = response.data;
          console.log("useUser | getUser ✅ |", userData);
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
    axiosCustom
      .delete(`${import.meta.env.VITE_HTTP_API_URL}/public/profileDeleteUser/`)
      .then((response) => {
        console.log("useUser | profileDeleteUser ✅ |");
        navigate("/logout");
      })
      .catch((error) => {
        console.log("useUser | deleteUser ❌ |", error);
      });
  };

  const updateUser = (userType: UserType) => {
    axiosCustom
      .post(`${import.meta.env.VITE_HTTP_API_URL}/public/updateUser/`, {
        userType: UserType[userType],
      })
      .then((response) => {
        console.log("useUser | updateUser ✅ |", response);
      })
      .catch((error) => {
        console.log("useUser | updateUser ❌ |", error);
      });
  };

  const user: User | undefined =
    loadUserQuery.data !== undefined && loadUserQuery.isFetched
      ? loadUserQuery.data
      : undefined;
  const userType: UserType = user === undefined ? UserType.anonym : user.type;
  const isLoggedInResponse: boolean =
    loadIsLoggedInQuery.data !== undefined && loadIsLoggedInQuery.isFetched;
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
