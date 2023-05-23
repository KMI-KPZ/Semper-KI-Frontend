import { UseQueryResult, useQuery } from "@tanstack/react-query";
import useCustomAxios from "./useCustomAxios";
import { EUserType } from "../interface/enums";
import { useEffect } from "react";
import { AxiosResponse } from "axios";

export const useLogin = (
  load: boolean,
  userType: EUserType,
  register: boolean,
  path?: string
): {
  loginQuery: UseQueryResult<AxiosResponse<any, any>, Error>;
} => {
  const { axiosCustom } = useCustomAxios();
  const loginQuery = useQuery<AxiosResponse, Error>({
    queryKey: ["login"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/login/`;
      return axiosCustom.get(apiUrl, {
        headers: {
          Usertype: userType === undefined ? null : EUserType[userType],
          Path: path === undefined ? "/" : path,
          Register: register !== undefined && register === true ? true : false,
        },
      });
    },
    enabled: userType !== undefined && load === true,
  });
  useEffect(() => {
    if (loginQuery.data !== undefined && loginQuery.status === "success")
      window.location.href = loginQuery.data.data;
  }, [loginQuery.data]);
  return {
    loginQuery,
  };
};

export const useLogout = (): {
  logoutQuery: UseQueryResult<AxiosResponse<any, any>, Error>;
} => {
  const { axiosCustom } = useCustomAxios();
  const logoutQuery = useQuery<AxiosResponse, Error>({
    queryKey: ["logout"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/logout/`;
      return axiosCustom.get(apiUrl);
    },
  });
  useEffect(() => {
    if (logoutQuery.data !== undefined && logoutQuery.status === "success")
      window.location.href = logoutQuery.data.data;
  }, [logoutQuery.data]);
  return {
    logoutQuery,
  };
};
