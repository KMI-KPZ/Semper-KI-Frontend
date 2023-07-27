import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};
axios.defaults.withCredentials = true;

const axiosUnauthorized = axios.create({
  baseURL: `${process.env.VITE_HTTP_API_URL}/`,
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
  baseURL: `${process.env.VITE_HTTP_API_URL}/`,
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

const getCustomAxiosInstance = () => {
  return CSRFToken() === "" ? axiosUnauthorized : axiosAuthorized;
};
const customAxios = getCustomAxiosInstance();
export default customAxios;
