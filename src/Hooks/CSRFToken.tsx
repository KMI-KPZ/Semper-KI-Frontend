import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CRSFToken = () => {
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const getCookie = (name: string): string => {
  //   let cookieValue = "";
  //   if (document.cookie && document.cookie !== "") {
  //     const cookies = document.cookie.split(";");
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       if (cookie.substring(0, name.length + 1) === name + "=") {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // };

  useEffect(() => {
    setIsLoading(true);
    if (isLoading) console.log("Is loading CSRF Token...");
    axios
      .get(`${process.env.REACT_APP_API_URL}/csrf_cookie`)
      .then((response) => {
        console.log("CSRF Token Loaded", response.data);
        // setCsrfToken(getCookie("csrftoken"));
        let token = Cookies.get("csrftoken");
        setCsrfToken(token !== undefined ? token : "");
      })
      .catch((error) => {
        console.log("CSRF Token Error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
        if (!isLoading) console.log("...done loading CSRF Token");
      });
  }, []);

  // return <input type={"hidden"} name="csrfmiddelwaretoken" value={csrfToken} />;
  return csrfToken;
};

export default CRSFToken;
