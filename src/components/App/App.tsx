import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./App.scss";
import "./../../styles.scss";
import { TUserType } from "../../interface/types";
import useAuthCookie from "../../deprecated/useAuthCookie";
import useCRSFToken from "../../hooks/useCSRFToken";
import axios from "axios";
import { IChat, IOrder, IProcess } from "../../interface/Interface";
import { TestOrderList, TestProcessList } from "../../services/TestData";
import useUser from "../../hooks/useUser";
import AuthorizedHome from "../AuthorizedHome/AuthorizedHome";
import { Home } from "../Home/Home";
import Navigation from "../Navigation/Navigation";
import { ProcessView } from "../Process/ProcessView";
import Guide from "../Guide/Guide";
import Logout from "../Logout/Logout";
import LogoutCallback from "../Logout/LogoutCallback";
import Login from "../Login/Login";
import LoginCallback from "../Login/LoginCallback";
import { Error } from "../Error/Error";
import { IFilterItem } from "../Process/Filter/Interface";

interface State {
  menuOpen: boolean;
  isLoggedIn: boolean;
  userType: TUserType;
  processList: IProcess[];
  orderList: IOrder[];
  filter: IFilterItem[];
  chats: IChat[];
}

function App() {
  const [state, setState] = useState<State>({
    menuOpen: false,
    isLoggedIn: false,
    userType: "client",
    processList: TestProcessList,
    orderList: TestOrderList,
    filter: [],
    chats: [],
  });
  const { loadCSRFToken } = useCRSFToken();
  const { authToken, user, loadUser, logoutUser } = useUser();

  const setMenuOpen = (menuOpen: boolean) => {
    setState((prevState) => ({ ...prevState, menuOpen }));
  };

  const setUserType = (userType: TUserType): void => {
    setState((prevState) => ({ ...prevState, userType }));
  };

  const setProcessList = (processList: IProcess[]): void => {
    setState((prevState) => ({ ...prevState, processList }));
  };

  const setFilter = (filter: IFilterItem[]): void => {
    console.log("set Filter", filter);
    setState((prevState) => ({ ...prevState, filter }));
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: authToken === undefined ? false : true,
    }));
  }, [authToken]);

  useEffect(() => {
    axios.defaults.headers.common = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
    axios.defaults.withCredentials = true;
    loadCSRFToken();
  }, []);

  const login = () => {
    loadCSRFToken();
    setTimeout(() => {
      loadUser();
    }, 100);
  };

  const logout = () => {
    logoutUser();
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
              filter={state.filter}
              setProcessList={setProcessList}
              processList={
                state.processList.length > 0 ? state.processList : undefined
              }
            />
          }
        />
        <Route path="test" element={<RequestTest />} />
        <Route path="guide/:path" element={<Guide setFilter={setFilter} />} />
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
