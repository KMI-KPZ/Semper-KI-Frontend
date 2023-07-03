import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { UserType } from "@/hooks/useUser/types";
import customAxios from "@/hooks/useCustomAxios";

export const useLogin = (
  load: boolean,
  userType: UserType,
  register: boolean,
  path?: string
): {
  loginQuery: UseQueryResult<AxiosResponse<any, any>, Error>;
} => {
  const loginQuery = useQuery<AxiosResponse, Error>({
    queryKey: ["login"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return customAxios.get(apiUrl, {
        headers: {
          Usertype: userType === undefined ? null : UserType[userType],
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
  const logoutQuery = useQuery<AxiosResponse, Error>({
    queryKey: ["logout"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/logout/`;
      return customAxios.get(apiUrl);
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
