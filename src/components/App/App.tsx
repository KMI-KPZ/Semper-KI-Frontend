import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./App.scss";
import "./../../styles.scss";
import { TUserType } from "../../interface/types";
import useCRSFToken from "../../hooks/useCSRFToken";
import axios from "axios";
import { IChat, IOrder, IProcess } from "../../interface/Interface";
import { TestOrderList, TestProcessList } from "../../services/TestData";
import useUser from "../../hooks/useUser";
import AuthorizedHome from "../AuthorizedHome/AuthorizedHome";
import { Home } from "../Home/Home";
import { ProcessView } from "../Process/ProcessView";
import Guide from "../Guide/Guide";
import Logout from "../Logout/Logout";
import LogoutCallback from "../Logout/LogoutCallback";
import Login from "../Login/Login";
import LoginCallback from "../Login/LoginCallback";
import { Error } from "../Error/Error";
import { IFilterItem } from "../Process/Filter/Interface";
import Redirect from "../Redirect/Redirect";
import Footer from "../Footer/Footer";
import { URL_AboutUs } from "../../config/Constants";

interface State {
  isLoggedIn: boolean;
  userType: TUserType;
  processList: IProcess[];
  orderList: IOrder[];
  guideFilter: IFilterItem[];
  chats: IChat[];
}

function App() {
  const [state, setState] = useState<State>({
    isLoggedIn: false,
    userType: "client",
    processList: TestProcessList,
    orderList: TestOrderList,
    guideFilter: [],
    chats: [],
  });
  const { loadCSRFToken } = useCRSFToken();
  const { user, loadUser, logoutUser } = useUser();

  const setUserType = (userType: TUserType): void => {
    setState((prevState) => ({ ...prevState, userType }));
  };

  const setProcessList = (processList: IProcess[]): void => {
    setState((prevState) => ({ ...prevState, processList }));
  };

  const setFilter = (guideFilter: IFilterItem[]): void => {
    setState((prevState) => ({ ...prevState, guideFilter }));
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: user === undefined ? false : true,
    }));
  }, [user]);

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
    console.log("Login");
    loadCSRFToken();
    setTimeout(() => {
      loadUser();
    }, 100);
    console.log("App", user);
  };

  const logout = () => {
    console.log("Logout");
    logoutUser();
  };

  const authorizedRoutes =
    state.isLoggedIn && user !== undefined ? (
      <>
        <Route
          path="*"
          element={
            <AuthorizedHome
              orderList={state.orderList}
              processList={state.processList}
              setProcessList={setProcessList}
              user={user}
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
      <div className="main-header">
        <Header isLoggedIn={state.isLoggedIn} userType={state.userType} />
      </div>
      <Routes data-testid="routes">
        {unAuthorizedRoutes}
        {authorizedRoutes}
        <Route
          path="process/*"
          element={
            <ProcessView
              guideAnswers={state.guideFilter}
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
          element={<LoginCallback login={login} user={user} />}
        />
        <Route
          path="aboutus"
          element={<Redirect link={URL_AboutUs} extern />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
