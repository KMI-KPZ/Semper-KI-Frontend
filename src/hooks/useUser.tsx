import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interface/Interface";
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
        console.log("getUser Data", userData);
        setUser(
          Object.keys(userData).length === 0 && userData.constructor === Object
            ? undefined
            : userData
        );
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("getUser Error", error);
        setUser(undefined);
      });
  };

  const loadLoggedIn = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/isLoggedIn/`)
      .then((response) => {
        console.log("islogged", response);
        setLoggedIn(response.data === "Successful" ? true : false);
      })
      .catch((error) => {
        console.log("loadLoggedIn error:", error);
        setLoggedIn(false);
      });
  };

  const deleteUser = () => {
    axiosCustom
      .delete(`${process.env.REACT_APP_API_URL}/public/profileDeleteUser/`)
      .then((response) => {
        console.log("delete User", response.data);
        navigate("/logout");
      })
      .catch((error) => {
        console.log("delete User Error", error);
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
