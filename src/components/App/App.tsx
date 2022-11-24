import { Login } from "@mui/icons-material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Error } from "../../feature/Error/Error";
import { Home } from "../../feature/Home/Home";
import { ProcessView } from "../../feature/Process/ProcessView";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import "./App.scss";
import "./../../styles.scss";

function App() {
  return (
    <div className="App" data-testid="app">
      <div className="main-header">
        <div className="container">
          <Header />
        </div>
      </div>
      <Routes data-testid="routes">
        <Route index element={<Home />} />
        <Route path="Process/*" element={<ProcessView />} />
        <Route path="test" element={<RequestTest />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
