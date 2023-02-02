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

  return { loadCSRFToken, CSRFToken };
};

export default useCRSFToken;
