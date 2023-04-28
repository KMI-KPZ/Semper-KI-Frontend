import { UseQueryResult, useQuery } from "@tanstack/react-query";
import useCustomAxios from "./useCustomAxios";
import { EUserType } from "../interface/enums";
import { useEffect } from "react";
import { AxiosResponse } from "axios";

export const useLogin = (
  fetchLoginUsertype?: EUserType,
  path?: string,
  register?: boolean
): {
  loginQuery: UseQueryResult<AxiosResponse<any, any>, Error>;
} => {
  const { axiosCustom } = useCustomAxios();
  const loginQuery = useQuery<AxiosResponse, Error>({
    queryKey: ["login"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/login/`;
      return axiosCustom.get(apiUrl, {
        headers: {
          Usertype:
            fetchLoginUsertype === undefined
              ? null
              : EUserType[fetchLoginUsertype],
          Path: path === undefined ? "/" : path,
          Register: register !== undefined && register === true ? true : false,
        },
      });
    },
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
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/logout/`;
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
