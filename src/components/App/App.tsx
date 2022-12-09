import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../../feature/Error/Error";
import { Home } from "../../feature/Home/Home";
import { ProcessView } from "../../feature/Process/ProcessView";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./App.scss";
import "./../../styles.scss";
import { User } from "../../interface/Interface";
import { UserType } from "../../interface/types";
import Login from "../../feature/Login/Login";
import Logout from "../../feature/Logout/Logout";
import AuthorizedHome from "../../feature/AuthorizedHome/AuthorizedHome";
import Guide from "../../feature/Process/Guide/Guide";
import AccessToken from "../../hooks/AccessToken";
import CRSFToken from "../../hooks/CSRFToken";
import axios from "axios";
import LoginCallback from "../../feature/Login/LoginCallback";

interface State {
  user: User | null;
  userType: UserType;
}

function App() {
  const [state, setState] = useState<State>({ user: null, userType: "client" });
  const { token, refreshToken, login, logout } = AccessToken();

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

  const setUser = (user: User | null): void => {
    login(JSON.stringify(user));
    setState((prevState) => ({ ...prevState, user }));
  };

  const authorizedRoutes = state.user !== null && (
    <>
      <Route path="logout" element={<Logout setUser={setUser} />} />
      <Route path="*" element={<AuthorizedHome user={state.user} />} />
    </>
  );

  const unAuthorizedRoutes = state.user === null && (
    <>
      <Route index element={<Home userType={state.userType} />} />
      <Route path="login" element={<Login />} />
      <Route path="callback/:data" element={<LoginCallback />} />
    </>
  );

  return (
    <div className="App" data-testid="app">
      <div className="main-header">
        <div className="container">
          <Header
            user={state.user}
            userType={state.userType}
            setUserType={setUserType}
          />
        </div>
      </div>
      <Routes data-testid="routes">
        <Route path="process/*" element={<ProcessView />} />
        <Route path="test" element={<RequestTest />} />
        <Route path="guide" element={<Guide />} />
        {unAuthorizedRoutes}
        {authorizedRoutes}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
