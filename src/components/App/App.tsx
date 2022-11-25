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
        <Route index element={<Home />} />
        <Route path="Process/*" element={<ProcessView />} />
        <Route path="test" element={<RequestTest />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="logout" element={<Logout setUser={setUser} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
