import React from "react";
import "./App.scss";
import "./styles.scss";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home/Home";
import { Error } from "./containers/Error";
import { ProcessView } from "./containers/Process/ProcessView";
import { RequestTest } from "./RequestTest/RequestTest";
import Login from "./containers/Login";

// import { Provider } from "react-redux";
// import store from "./store";

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
