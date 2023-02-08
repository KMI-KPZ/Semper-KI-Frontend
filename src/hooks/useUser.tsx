import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interface/Interface";
import { getUserType } from "../services/utils";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  user: IUser | undefined;
  isLoggedIn: boolean;
  loadLoggedIn(): void;
  loadUser(): void;
  logoutUser(): void;
  deleteUser(): void;
}

const useUser = (): ReturnProps => {
  const navigate = useNavigate();
  const { axiosCustom } = useCustomAxios();
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const loadUser = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/getUser/`)
      .then((response) => {
        const userData = response.data;
        console.log("useUser| loadUser Successful", userData);
        setUser(
          Object.keys(userData).length === 0 && userData.constructor === Object
            ? undefined
            : { ...userData, type: getUserType(userData.type) }
        );
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("useUser| loadUser Error", error);
        setUser(undefined);
      });
  };

  const loadLoggedIn = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/isLoggedIn/`)
      .then((response) => {
        console.log("useUser| loadLoggedIn", response.data);
        setLoggedIn(response.data === "Successful" ? true : false);
      })
      .catch((error) => {
        console.log("useUser| loadLoggedIn error", error);
        setLoggedIn(false);
      });
  };

  const deleteUser = () => {
    axiosCustom
      .delete(`${process.env.REACT_APP_API_URL}/public/profileDeleteUser/`)
      .then((response) => {
        console.log("useUser| deleteUser Successful");
        navigate("/logout");
      })
      .catch((error) => {
        console.log("useUser| deleteUser Error", error);
      });
  };

  const logoutUser = () => {
    setUser(undefined);
    setLoggedIn(false);
  };

  return {
    user,
    isLoggedIn,
    loadUser,
    logoutUser,
    deleteUser,
    loadLoggedIn,
  };
};

export default useUser;
