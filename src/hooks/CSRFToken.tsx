import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CRSFToken = () => {
  const url: string = "http://localhost:8000/csrf_cookie/";
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        setCsrfToken(token !== undefined ? token : "");
        console.log("CSRFToken", token, url);
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
      });
  }, []);
  return csrfToken;
};

export default CRSFToken;
