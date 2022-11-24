import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CRSFToken = (url: string) => {
  const [csrfToken, setCsrfToken] = useState("");
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        setCsrfToken(token !== undefined ? token : "");
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
      });
  }, [url]);

  return csrfToken;
};

export default CRSFToken;
