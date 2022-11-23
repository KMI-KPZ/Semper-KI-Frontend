import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CRSFToken = ({ url }: { url: string }) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // if (isLoading) console.log("Is loading CSRF Token...");

    axios
      .get(url)
      .then((response) => {
        // console.log("CSRF Token Loaded: ", response.data);
        const token = Cookies.get("csrftoken");
        setCsrfToken(token !== undefined ? token : "");
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        // if (!isLoading) console.log("...done loading CSRF Token");
      });
  }, []);

  return <input type="hidden" name="csrfmiddelwaretoken" value={csrfToken} />;
};

export default CRSFToken;
