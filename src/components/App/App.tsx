import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../../feature/Error/Error";
import { Home } from "../../feature/Home/Home";
import { ProcessView } from "../../feature/Process/ProcessView";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./App.scss";
import "./../../styles.scss";
import { TUserType } from "../../interface/types";
import Login from "../../feature/Login/Login";
import Logout from "../../feature/Logout/Logout";
import AuthorizedHome from "../../feature/AuthorizedHome/AuthorizedHome";
import Guide from "../../feature/Process/Guide/Guide";
import useAuthCookie from "../../deprecated/useAuthCookie";
import useCRSFToken from "../../hooks/useCSRFToken";
import axios from "axios";
import LoginCallback from "../../feature/Login/LoginCallback";
import LogoutCallback from "../../feature/Logout/LogoutCallback";
import { IChat, IOrder, IProcess } from "../../interface/Interface";
import Navigation from "../../feature/Navigation/Navigation";
import { TestOrderList, TestProcessList } from "../../services/TestData";
import useUser from "../../hooks/useUser";

interface State {
  menuOpen: boolean;
  isLoggedIn: boolean;
  userType: TUserType;
  processList: IProcess[];
  orderList: IOrder[];
  chats: IChat[];
}

function App() {
  const [state, setState] = useState<State>({
    menuOpen: false,
    isLoggedIn: false,
    userType: "client",
    processList: TestProcessList,
    orderList: TestOrderList,
    chats: [],
  });
  useCRSFToken();
  const { authToken, user, getUser, logoutUser } = useUser();

  const setMenuOpen = (menuOpen: boolean) => {
    setState((prevState) => ({ ...prevState, menuOpen }));
  };

  const setUserType = (userType: TUserType): void => {
    setState((prevState) => ({ ...prevState, userType }));
  };

  const setProcessList = (processList: IProcess[]): void => {
    setState((prevState) => ({ ...prevState, processList }));
  };

  const login = () => {
    getUser();
    setState((prevState) => ({ ...prevState, isLoggedIn: true }));
  };

  const logout = () => {
    logoutUser();
    setState((prevState) => ({ ...prevState, isLoggedIn: false }));
  };

  const authorizedRoutes =
    state.isLoggedIn && authToken !== undefined ? (
      <>
        <Route
          path="*"
          element={
            <AuthorizedHome
              orderList={state.orderList}
              processList={state.processList}
              setProcessList={setProcessList}
              authToken={authToken}
              userType={state.userType}
            />
          }
        />
      </>
    ) : null;

  const unAuthorizedRoutes = !state.isLoggedIn && (
    <>
      <Route index element={<Home userType={state.userType} />} />
    </>
  );

  return (
    <div className="App" data-testid="app">
      {authToken !== null && state.menuOpen ? (
        <Navigation
          userType={state.userType}
          open={state.menuOpen}
          setMenuOpen={setMenuOpen}
        />
      ) : null}
      <div className="main-header">
        <div className="header-container">
          <Header
            isMenuOpen={state.menuOpen}
            setMenuOpen={setMenuOpen}
            // authToken={authToken}
            isLoggedIn={state.isLoggedIn}
            userType={state.userType}
            setUserType={setUserType}
          />
        </div>
      </div>
      <Routes data-testid="routes">
        {unAuthorizedRoutes}
        {authorizedRoutes}
        <Route
          path="process/*"
          element={
            <ProcessView
              setProcessList={setProcessList}
              processList={
                state.processList.length > 0 ? state.processList : undefined
              }
            />
          }
        />
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
          element={<LoginCallback login={login} authToken={authToken} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
