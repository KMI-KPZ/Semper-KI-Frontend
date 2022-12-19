import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  loadCSRFToken(): void;
}

const useCRSFToken = (): ReturnProps => {
  const { axiosUnauthorized } = useCustomAxios();
  const loadCSRFToken = (): void => {
    axiosUnauthorized
      .get("/csrfCookie/")
      .then((response) => {
        const token = Cookies.get("csrftoken");
        if (token !== undefined) {
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
