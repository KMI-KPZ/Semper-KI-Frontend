import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CRSFToken = (url: string) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        const token = Cookies.get("csrftoken");
        setCsrfToken(token !== undefined ? token : "");
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return csrfToken;
};

export default CRSFToken;
