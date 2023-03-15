import { Container } from "@mui/system";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Logout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/public/logout/`)
      .then((response) => {
        console.log("get Logout ", response.data);
        window.location.href = response.data;
      })
      .catch((error) => {
        console.log("get Logout error", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      {isLoading ? (
        <LoadingAnimation />
      ) : error !== undefined ? (
        <h1>Es ist etwas schiefgelaufen : {error.message}</h1>
      ) : null}
    </div>
  );
};

export default Logout;
