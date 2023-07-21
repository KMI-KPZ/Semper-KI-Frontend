import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { UserType } from "@/hooks/useUser/types";
import customAxios from "@/hooks/useCustomAxios";
import { useLocation, useSearchParams } from "react-router-dom";
import logger from "@/hooks/useLogger";

export const useLogin = (
  load: boolean,
  orga: boolean,
  register: boolean,
  path?: string
): {
  loginQuery: UseQueryResult<string, Error>;
} => {
  const { search } = useLocation();
  const params = useSearchParams();

  const getReplacedSearchParam = () => {
    return search !== "" ? search.replace("?", "&") : "";
  };
  const getUserType = (): string | undefined => {
    if (getReplacedSearchParam() !== "") return UserType[UserType.manufacturer];
    if (orga === true) return UserType[UserType.manufacturer];
    else return UserType[UserType.client];
  };
  const getOrgaID = (): string | undefined => {
    const orgaID = params[0].get("organization");
    return orgaID !== null ? orgaID : undefined;
  };

  const loginQuery = useQuery<string, Error>({
    queryKey: ["login"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return customAxios
        .get(apiUrl, {
          headers: {
            Usertype: getUserType(),
            Path: path === undefined ? "/" : path,
            Register:
              register !== undefined && register === true ? true : false,
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
    enabled: false, //load === true || search !== "",
  });

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
