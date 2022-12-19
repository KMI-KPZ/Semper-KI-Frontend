import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface ReturnProps {
  loadCSRFToken(): void;
}

const useCRSFToken = (): ReturnProps => {
  const setAxiosHeader = (token: string): void => {
    axios.defaults.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
    axios.defaults.withCredentials = true;
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
          console.log("CSRFToken", token);
        } else {
          console.log("CSRDToken was undefined");
        }
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
      });
  };

  return { loadCSRFToken };
};

export default useCRSFToken;
