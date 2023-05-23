import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EUserType } from "../interface/enums";
import { IUser } from "../interface/Interface";
import { getUserType, parseAddress } from "../services/utils";
import useCRSFToken from "./useCSRFToken";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  userType: EUserType;
  user: IUser | undefined;
  isLoggedIn: boolean;
  isLoggedInResponse: boolean;
  loadIsLoggedInQuery: UseQueryResult<boolean, Error>;
  loadUserQuery: UseQueryResult<IUser, Error>;
  deleteUser(): void;
  updateUser(userType: EUserType): void;
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

  const loadUserQuery = useQuery<IUser, Error>({
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

  const updateUser = (userType: EUserType) => {
    axiosCustom
      .post(`${import.meta.env.VITE_HTTP_API_URL}/public/updateUser/`, {
        userType: EUserType[userType],
      })
      .then((response) => {
        console.log("useUser | updateUser ✅ |", response);
      })
      .catch((error) => {
        console.log("useUser | updateUser ❌ |", error);
      });
  };

  const user: IUser | undefined =
    loadUserQuery.data !== undefined && loadUserQuery.isFetched
      ? loadUserQuery.data
      : undefined;
  const userType: EUserType = user === undefined ? EUserType.anonym : user.type;
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
