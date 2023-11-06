import { getCustomAxios } from "@/hooks/useCustomAxios";
import { UserType } from "@/hooks/useUser";
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
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/login/`;
      return getCustomAxios().get(apiUrl, {
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
