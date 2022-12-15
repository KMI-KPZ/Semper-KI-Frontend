import axios from "axios";
import React, { useState } from "react";
import { IUser } from "../interface/Interface";

interface ReturnProps {
  response: string;
  sendRequest(): void;
}

const useUser = (): ReturnProps => {
  const [response, setResponse] = useState<string>("");

  const sendRequest = () => {
    axios
      .get("http://localhost:8000/getUser/")
      .then((response) => {
        setResponse((prevState) => response.data);
      })
      .catch((error) => {
        console.log("getUser Error", error);
      });
  };

  return { response, sendRequest };
};

export default useUser;
