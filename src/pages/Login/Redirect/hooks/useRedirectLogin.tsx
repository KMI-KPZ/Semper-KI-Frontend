import customAxios from "@/hooks/useCustomAxios";
import { UserType } from "@/hooks/useUser/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

export const useRedirectLogin = (
  link?: string
): {
  redirectLoginQuery: UseQueryResult<AxiosResponse<any, any>, Error>;
} => {
  const redirectLoginQuery = useQuery<AxiosResponse, Error>({
    queryKey: ["login"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/login/`;
      return customAxios.get(apiUrl, {
        headers: {
          Usertype: "manufacturer",
        },
      });
    },
    enabled: link !== undefined,
  });

  useEffect(() => {
    if (
      redirectLoginQuery.data !== undefined &&
      redirectLoginQuery.status === "success" &&
      link !== undefined
    ) {
      const newLink = `${redirectLoginQuery.data.data}&${link}`;
      window.location.href = newLink;
    }
  }, [redirectLoginQuery.data]);

  return {
    redirectLoginQuery,
  };
};
