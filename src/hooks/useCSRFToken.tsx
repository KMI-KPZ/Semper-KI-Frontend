import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import customAxios from "./useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface ReturnProps {
  isCSRFTokenLoaded: boolean;
  CSRFTokenQuery: UseQueryResult<string, Error>;
}

const useCRSFToken = (): ReturnProps => {
  const CSRFTokenQuery = useQuery<string, Error>({
    queryKey: ["csrf"],
    queryFn: async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/csrfCookie/`;
      return customAxios.get(apiUrl).then((response) => {
        console.log("useCRSFToken | ✅ |");
        return response.data;
      });
    },
    staleTime: 1000 * 60 * 24,
  });
  const checkCSRFTokenLoaded = (): boolean => {
    return CSRFTokenQuery.data !== "" && Cookies.get("csrftoken") !== undefined
      ? true
      : false;
  };

  return {
    isCSRFTokenLoaded: checkCSRFTokenLoaded(),
    CSRFTokenQuery,
  };
};

export default useCRSFToken;
