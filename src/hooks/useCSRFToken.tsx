import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useCustomAxios from "./useCustomAxios";
import { useQuery } from "@tanstack/react-query";

interface ReturnProps {
  CSRFToken: boolean;
  CSRFTokenIsLoading: boolean;
  CSRFTokenError: Error | null;
}

const useCRSFToken = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const { data, isLoading, error } = useQuery<string, Error>({
    queryKey: ["csrf"],
    queryFn: async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/csrfCookie/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useCRSFToken | ✅ |");
        return response.data;
      });
    },
    staleTime: 1000 * 60 * 24,
  });
  const checkCSRFTokenLoaded = (): boolean => {
    return data !== "" && Cookies.get("csrftoken") !== undefined ? true : false;
  };

  return {
    CSRFToken: checkCSRFTokenLoaded(),
    CSRFTokenError: error,
    CSRFTokenIsLoading: isLoading,
  };
};

export default useCRSFToken;
