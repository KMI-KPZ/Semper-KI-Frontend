import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  user: IUser | undefined;
  loadUser(): void;
  logoutUser(): void;
  deleteUser(): void;
}

const useUser = (): ReturnProps => {
  const navigate = useNavigate();
  const { axiosCustom } = useCustomAxios();
  const [user, setUser] = useState<IUser | undefined>();

  const loadUser = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/getUser/`)
      .then((response) => {
        console.log("getUser Data", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log("getUser Error", error);
        setUser(undefined);
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
  };

  return {
    user: user,
    loadUser,
    logoutUser,
    deleteUser,
  };
};

export default useUser;
