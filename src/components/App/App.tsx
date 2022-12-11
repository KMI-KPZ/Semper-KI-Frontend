import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../../feature/Error/Error";
import { Home } from "../../feature/Home/Home";
import { ProcessView } from "../../feature/Process/ProcessView";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./App.scss";
import "./../../styles.scss";
import { UserType } from "../../interface/types";
import Login from "../../feature/Login/Login";
import Logout from "../../feature/Logout/Logout";
import AuthorizedHome from "../../feature/AuthorizedHome/AuthorizedHome";
import Guide from "../../feature/Process/Guide/Guide";
import useAuthCookie from "../../hooks/useAuthCookie";
import CRSFToken from "../../hooks/CSRFToken";
import axios from "axios";
import LoginCallback from "../../feature/Login/LoginCallback";
import LogoutCallback from "../../feature/Logout/LogoutCallback";

interface State {
  userType: UserType;
}

function App() {
  const [state, setState] = useState<State>({ userType: "client" });
  const { authToken, authLogin, authLogout } = useAuthCookie();

  const csrfToken: string = CRSFToken();

  useEffect(() => {
    axios.defaults.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
  }, []);

  const setUserType = (userType: UserType): void => {
    setState((prevState) => ({ ...prevState, userType }));
  };

  const login = () => {
    authLogin();
  };

  const logout = () => {
    authLogout();
  };

  const authorizedRoutes = authToken !== null && (
    <>
      <Route
        path="*"
        element={
          <AuthorizedHome authToken={authToken} userType={state.userType} />
        }
      />
    </>
  );

  const unAuthorizedRoutes = authToken === null && (
    <>
      <Route index element={<Home userType={state.userType} />} />
    </>
  );

  return (
    <div className="App" data-testid="app">
      <div className="main-header">
        <div className="container">
          <Header
            authToken={authToken}
            userType={state.userType}
            setUserType={setUserType}
          />
        </div>
      </div>
      <Routes data-testid="routes">
        <Route path="process/*" element={<ProcessView />} />
        <Route path="test" element={<RequestTest />} />
        <Route path="guide" element={<Guide />} />
        <Route path="logout" element={<Logout logout={logout} />} />
        <Route
          path="callback/logout"
          element={<LogoutCallback logout={logout} />}
        />
        <Route path="login" element={<Login />} />
        <Route
          path="callback/login"
          element={<LoginCallback login={login} />}
        />
        {unAuthorizedRoutes}
        {authorizedRoutes}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
