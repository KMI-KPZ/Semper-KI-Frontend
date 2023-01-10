import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import React from "react";

interface ReturnProps {
  axiosUnauthorized: AxiosInstance;
  axiosAuthorized: AxiosInstance;
  axiosCustom: AxiosInstance;
}

const useCustomAxios = (): ReturnProps => {
  const axiosUnauthorized = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`,
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

  const axiosAuthorized = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/`,
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

  const axiosCustom = CSRFToken() === "" ? axiosUnauthorized : axiosAuthorized;

  return { axiosAuthorized, axiosUnauthorized, axiosCustom };
};

export default useCustomAxios;
