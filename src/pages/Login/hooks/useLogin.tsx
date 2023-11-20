import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { UserType } from "@/hooks/useUser";
import { customAxios } from "@/api/customAxios";
import { useLocation, useSearchParams } from "react-router-dom";
import logger from "@/hooks/useLogger";

interface LoginMutationProps {
  userType: LoginUserType;
  register: boolean;
  path?: string;
}

export type LoginUserType =
  | "user"
  | "organization"
  | "admin"
  | "fakeUser"
  | "fakeOrganization"
  | "fakeAdmin";

export const useLogin = (): {
  loginMutation: UseMutationResult<string, Error, LoginMutationProps, unknown>;
} => {
  const { search } = useLocation();

  const getReplacedSearchParam = () => {
    return search !== "" ? search.replace("?", "&") : "";
  };

  const loginMutation = useMutation<string, Error, LoginMutationProps>({
    mutationFn: async (props) => {
      const { register, path, userType } = props;
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return customAxios
        .get(apiUrl, {
          headers: {
            Usertype: userType,
            Path: path === undefined ? "/" : path,
            Register: register,
          },
        })
        .then((response) => {
          logger("useLogin | loginQuery |", response);
          return response.data;
        });
    },
    onSuccess(data) {
      window.location.href = `${data}${getReplacedSearchParam()}`;
    },
  });

  return {
    loginMutation,
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
