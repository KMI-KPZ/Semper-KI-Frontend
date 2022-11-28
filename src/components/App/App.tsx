import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
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

interface State {
  user: User | null;
  userType: UserType;
}

function App() {
  const [state, setState] = useState<State>({ user: null, userType: "client" });

  const setUserType = (userType: UserType): void => {
    setState((prevState) => ({ ...prevState, userType }));
  };

  const setUser = (user: User | null): void => {
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
      <Route path="login" element={<Login setUser={setUser} />} />
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
        <Route path="Process/*" element={<ProcessView />} />
        <Route path="test" element={<RequestTest />} />
        {unAuthorizedRoutes}
        {authorizedRoutes}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
