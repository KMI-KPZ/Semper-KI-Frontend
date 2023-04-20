import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EUserType } from "../interface/enums";
import { IUser } from "../interface/Interface";
import { getUserType, parseAddress } from "../services/utils";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  userType: EUserType | undefined;
  user: IUser | undefined;
  isLoggedIn: boolean;
  isLoggedInResponse: boolean;
  loadLoggedIn(): void;
  logoutUser(): void;
  deleteUser(): void;
  updateUser(userType: EUserType): void;
}

const useUser = (): ReturnProps => {
  const navigate = useNavigate();
  const { axiosCustom } = useCustomAxios();
  const [userType, setUserType] = useState<EUserType>();
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isLoggedInResponse, setIsLoggedInResponse] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn === true) {
      loadUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user !== undefined) {
      setUserType(user.type);
    }
  }, [user]);

  const loadUser = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_HTTP_API_URL}/public/getUser/`)
      .then((response) => {
        const userData = response.data;
        console.log("useUser | loadUser ✅ |", userData);
        setUser(
          Object.keys(userData).length === 0 && userData.constructor === Object
            ? undefined
            : {
                ...userData,
                type: getUserType(userData.type),
                address: parseAddress(userData.address),
                accessed: new Date(userData.accessed),
                created: new Date(userData.created),
                updated: new Date(userData.updated),
              }
        );
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("useUser | loadUser ❌ |", error);
        setUser(undefined);
      });
  };

  const loadLoggedIn = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_HTTP_API_URL}/public/isLoggedIn/`)
      .then((response) => {
        console.log("useUser | loadLoggedIn ✅ |", response.data);
        setLoggedIn(response.data === "Success" ? true : false);
        setIsLoggedInResponse(true);
      })
      .catch((error) => {
        console.log("useUser | loadLoggedIn ❌ |", error);
        setLoggedIn(false);
      });
  };

  const deleteUser = () => {
    axiosCustom
      .delete(`${process.env.REACT_APP_HTTP_API_URL}/public/profileDeleteUser/`)
      .then((response) => {
        console.log("useUser | deleteUser ✅ |");
        navigate("/logout");
      })
      .catch((error) => {
        console.log("useUser | deleteUser ❌ |", error);
      });
  };

  const updateUser = (userType: EUserType) => {
    axiosCustom
      .post(`${process.env.REACT_APP_HTTP_API_URL}/public/updateUser/`, {
        userType: EUserType[userType],
      })
      .then((response) => {
        console.log("useUser | updateUser ✅ |", response);
      })
      .catch((error) => {
        console.log("useUser | updateUser ❌ |", error);
      });
  };

  const logoutUser = () => {
    setUser(undefined);
    setLoggedIn(false);
  };

  return {
    userType,
    user,
    isLoggedIn,
    isLoggedInResponse,
    logoutUser,
    deleteUser,
    loadLoggedIn,
    updateUser,
  };
};

export default useUser;
