import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import React from "react";

interface ReturnProps {
  axiosUnauthorized: AxiosInstance;
  axiosAuthorized: AxiosInstance;
}

const useCustomAxios = (): ReturnProps => {
  const unAuthorized = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    withCredentials: true,
  });

  const CSRFToken = (): string => {
    const token = Cookies.get("csrftoken");
    if (token !== undefined) {
      return token;
    } else {
      return "";
    }
  };

  const authorized = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Accept: "application/json",
      "X-CSRFToken": CSRFToken(),
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  });

  return { axiosAuthorized: authorized, axiosUnauthorized: unAuthorized };
};

export default useCustomAxios;
