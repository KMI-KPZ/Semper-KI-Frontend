import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  CSRFToken: boolean;
}

const useCRSFToken = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [CSRFToken, setCSRFToken] = useState<boolean>(false);

  useEffect(() => {
    loadCSRFToken();
  }, []);

  const loadCSRFToken = (): void => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/csrfCookie/`)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        if (token !== undefined) {
          console.log("useCRSFToken | loadCSRFToken ✅ |");
          setCSRFToken(true);
        } else {
          console.log("useCRSFToken | loadCSRFToken ❌ |");
          setCSRFToken(false);
        }
      })
      .catch((error) => {
        console.log("useCRSFToken | loadCSRFToken ❌ |", error);
        setCSRFToken(false);
      });
  };

  return { CSRFToken };
};

export default useCRSFToken;
