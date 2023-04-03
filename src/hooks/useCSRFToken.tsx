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
  const { data, isLoading, error } = useQuery<string, Error>(
    ["csrf"],
    async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/public/csrfCookie/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useCRSFToken | loadCSRFToken ✅ |");
        return response.data;
      });
    }
  );
  const checkCSRFTokenLoaded = (): boolean => {
    return data !== "" && Cookies.get("csrftoken") !== undefined ? true : false;
  };

  return {
    CSRFToken: checkCSRFTokenLoaded(),
    CSRFTokenError: error,
    CSRFTokenIsLoading: isLoading,
  };

  // const [CSRFToken, setCSRFToken] = useState<boolean>(false);
  // useEffect(() => {
  //   loadCSRFToken();
  // }, []);

  // const loadCSRFToken = (): void => {
  //   axiosCustom
  //     .get(`${process.env.REACT_APP_API_URL}/public/csrfCookie/`)
  //     .then((response) => {
  //       const token = Cookies.get("csrftoken");
  //       if (token !== undefined) {
  //         console.log("useCRSFToken | loadCSRFToken ✅ |");
  //         setCSRFToken(true);
  //       } else {
  //         console.log("useCRSFToken | loadCSRFToken ❌ |");
  //         setCSRFToken(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("useCRSFToken | loadCSRFToken ❌ |", error);
  //       setCSRFToken(false);
  //     });
  // };
  // return { CSRFToken};
};

export default useCRSFToken;
