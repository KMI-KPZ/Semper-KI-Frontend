import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface ReturnProps {
  loadCSRFToken(): void;
}

const useCRSFToken = (): ReturnProps => {
  const setAxiosHeader = (token: string): void => {
    axios.defaults.headers.common = {
      "X-CSRFToken": token,
    };

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
  };

  const loadCSRFToken = (): void => {
    axios
      .get("http://localhost:8000/csrfCookie/")
      .then((response) => {
        const token = Cookies.get("csrftoken");
        if (token !== undefined) {
          setAxiosHeader(token);
          console.log("CSRF Token", token);
        } else {
          console.log("CSRF Token is undefined");
        }
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
      });
  };

  return { loadCSRFToken };
};

export default useCRSFToken;
