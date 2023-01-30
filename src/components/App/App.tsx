import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./../../styles.scss";
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
import { EUserType } from "../../interface/enums";
import Service from "../Service/Service";

export interface IAppState {
  isLoggedIn: boolean;
  userType: EUserType;
  processList: IProcess[];
  orderList: IOrder[];
  guideFilter: IFilterItem[];
  chats: IChat[];
}

export interface IAppContext {
  state: IAppState;
  setState: React.Dispatch<React.SetStateAction<IAppState>>;
}
export const AppContext = createContext<IAppContext>({
  state: {
    isLoggedIn: false,
    userType: 0,
    processList: [{}],
    orderList: TestOrderList,
    guideFilter: [],
    chats: [],
  },
  setState: () => {},
});

function App() {
  const [state, setState] = useState<IAppState>({
    isLoggedIn: false,
    userType: 0,
    processList: [{}],
    orderList: TestOrderList,
    guideFilter: [],
    chats: [],
  });
  const { loadCSRFToken } = useCRSFToken();
  const { user, loadUser, logoutUser } = useUser();

  const setUserType = (userType: EUserType): void => {
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
      userType: user === undefined ? 0 : 1,
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
    <AppContext.Provider value={{ state, setState }}>
      <div className="app" data-testid="app">
        <div className="main-header">
          <Header isLoggedIn={state.isLoggedIn} userType={state.userType} />
        </div>
        <div className="main-content">
          <Routes data-testid="routes">
            {unAuthorizedRoutes}
            {authorizedRoutes}
            <Route
              path="process/*"
              element={<ProcessView guideAnswers={state.guideFilter} />}
            />
            <Route path="test" element={<RequestTest />} />
            <Route
              path="guide/:path"
              element={<Guide setFilter={setFilter} />}
            />
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
            <Route path="service/*" element={<Service />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
