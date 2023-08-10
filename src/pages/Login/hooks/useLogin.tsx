import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { UserType } from "@/hooks/useUser/types";
import { getCustomAxios } from "@/hooks/useCustomAxios";
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
    if (getReplacedSearchParam() !== "") return UserType[UserType.ORGANIZATION];
    if (orga === true) return UserType[UserType.ORGANIZATION];
    else return UserType[UserType.USER];
  };
  const getOrgaID = (): string | undefined => {
    const orgaID = params[0].get("organization");
    return orgaID !== null ? orgaID : undefined;
  };

  const loginQuery = useQuery<string, Error>({
    queryKey: ["login"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return getCustomAxios()
        .get(apiUrl, {
          headers: {
            Usertype: getUserType()?.toLocaleLowerCase(),
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
    enabled: load === true || search !== "",
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
      return getCustomAxios().get(apiUrl);
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
