import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  CSRFToken: string;
}

const useCRSFToken = (): ReturnProps => {
  const [CSRFToken, setCSRFToken] = useState<string>("");

  const loadCSRFToken = (): void => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/public/csrfCookie/`)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        if (token !== undefined) {
          console.log("useCRSFToken| loadCSRFToken Successful");
          setCSRFToken(token);
        } else {
          console.log("useCRSFToken| loadCSRFToken Failed");
          setCSRFToken("");
        }
      })
      .catch((error) => {
        console.log("useCRSFToken| loadCSRFToken Error", error);
        setCSRFToken("");
      });
  };

  useEffect(() => {
    axios.defaults.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
    axios.defaults.withCredentials = true;
    loadCSRFToken();
  }, []);

  return { CSRFToken };
};

export default useCRSFToken;
