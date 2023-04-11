import { UseQueryResult, useQuery } from "@tanstack/react-query";
import useCustomAxios from "./useCustomAxios";
import { EUserType } from "../interface/enums";
import { useEffect } from "react";
import { AxiosResponse } from "axios";

interface ReturnProps {
  data: AxiosResponse | undefined;
  isLoading: boolean;
  error: Error | null | undefined;
}

export const useLogin = (fetchLoginUsertype: EUserType): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { data, isLoading, error } = useQuery<AxiosResponse, Error>({
    queryKey: ["login", EUserType[fetchLoginUsertype]],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/login/`;
      return axiosCustom.get(apiUrl, {
        headers: {
          Usertype: EUserType[fetchLoginUsertype],
        },
      });
    },
    enabled:
      fetchLoginUsertype === EUserType.client ||
      fetchLoginUsertype === EUserType.contractor,
  });
  useEffect(() => {
    if (data !== undefined && isLoading === false)
      window.location.href = data.data;
  }, [data]);
  return {
    data,
    error,
    isLoading,
  };
};

export const useLogout = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { data, isLoading, error } = useQuery<AxiosResponse, Error>({
    queryKey: ["logout"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/logout/`;
      return axiosCustom.get(apiUrl);
    },
  });
  useEffect(() => {
    if (data !== undefined && isLoading === false)
      window.location.href = data.data;
  }, [data]);
  return {
    data,
    error,
    isLoading,
  };
};
