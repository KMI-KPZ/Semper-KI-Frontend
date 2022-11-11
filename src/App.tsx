import React from "react";
import "./App.scss";
import "./styles.scss";
import { Header } from "./Header/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Error } from "./Error";
import { ProcessView } from "./Process/ProcessView";
import { RequestTest } from "./RequestTest/RequestTest";

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
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
