import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserType, parseAddress } from "../services/utils";
import useCRSFToken from "./useCSRFToken";
import { getCustomAxios } from "./useCustomAxios";
import logger from "./useLogger";

interface ReturnProps {
  loadIsLoggedInQuery: UseQueryResult<boolean, Error>;
  userQuery: UseQueryResult<UserProps, Error>;
  deleteUser(): void;
  updateUserDetails(details: UserDetailsProps): void;
}

export type UserProps = {
  accessed: Date;
  created: Date;
  details: UserDetailsProps;
  email: string;
  hashedID: string;
  lastSeen: Date;
  name: string;
  organizations: string[];
  updated: Date;
  usertype: UserType;
};

export interface UserDetailsProps {
  address?: string;
}

export enum UserType {
  "USER",
  "ORGANIZATION",
  "ADMIN",
  "ANONYM",
}

export interface Address {
  city: string;
  houseNumber: string;
  street: string;
  country: string;
  zipcode: string;
}

const useUser = (): ReturnProps => {
  const navigate = useNavigate();
  const { CSRFTokenIsLoaded } = useCRSFToken();

  const loadIsLoggedInQuery = useQuery<boolean, Error>({
    queryKey: ["isLoggedIn"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/isLoggedIn/`)
        .then((response) => {
          logger("useUser | isLoggedIn ✅ |", response.data);
          return response.data === "Success" ? true : false;
        }),
    enabled: CSRFTokenIsLoaded(),
  });

  const userQuery = useQuery<UserProps, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      return getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getUser/`)
        .then((response) => {
          const userData = response.data;
          logger("useUser | getUser ✅ |", userData);
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

  const updateUserDetails = (details: UserDetailsProps) => {
    getCustomAxios()
      .post(`${process.env.VITE_HTTP_API_URL}/public/updateUserDetails/`, {
        details,
      })
      .then((response) => {
        logger("useUser | updateUser ✅ |", response);
      })
      .catch((error) => {
        logger("useUser | updateUser ❌ |", error);
      });
  };

  return {
    loadIsLoggedInQuery,
    userQuery,
    deleteUser,
    updateUserDetails,
  };
};

export default useUser;
