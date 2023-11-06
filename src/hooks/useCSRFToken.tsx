import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  CSRFTokenIsLoaded(): boolean;
  CSRFTokenQuery: UseQueryResult<string, Error>;
}

const useCRSFToken = (): ReturnProps => {
  const CSRFTokenQuery = useQuery<string, Error>({
    queryKey: ["csrf"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/csrfCookie/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useCRSFToken | ✅ |");
          return response.data;
        });
    },
    staleTime: 1000 * 60 * 24,
  });
  const CSRFTokenIsLoaded = (): boolean => {
    return CSRFTokenQuery.isFetched &&
      CSRFTokenQuery.data !== "" &&
      Cookies.get("csrftoken") !== undefined
      ? true
      : false;
  };

  return {
    CSRFTokenIsLoaded,
    CSRFTokenQuery,
  };
};

export default useCRSFToken;
