import React, {useState} from 'react';
import './App.scss';
import './styles.scss'
import {Header} from "./Header/Header";
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home/Home";
import {Error} from "./Error";
import {ProcessView} from "./Process/ProcessView";

interface State {
}

function App() {
  const [state,setState] = useState<State>({});

  return (
    <div className="App">
      <div className="main-header">
        <div className="container">
          <Header/>
        </div>
      </div>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="Process/*" element={<ProcessView/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
    </div>
  );
}

export default App;
