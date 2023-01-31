import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  CSRFToken: string;
  loadCSRFToken(): void;
}

const useCRSFToken = (): ReturnProps => {
  const [CSRFToken, setCSRFToken] = useState<string>("");
  // const setAxiosHeader = (token: string): void => {
  //   axios.defaults.headers.common = {
  //     "X-CSRFToken": token,
  //   };
  //   axios.defaults.xsrfCookieName = "csrftoken";
  //   axios.defaults.xsrfHeaderName = "X-CSRFToken";
  // };

  const loadCSRFToken = (): void => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/public/csrfCookie/`)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        if (token !== undefined) {
          console.log("CSRF Token", token);
          setCSRFToken(token);
        } else {
          console.log("CSRF Token is undefined");
          setCSRFToken("");
        }
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
        setCSRFToken("");
      });
  };

  return { loadCSRFToken, CSRFToken };
};

export default useCRSFToken;
