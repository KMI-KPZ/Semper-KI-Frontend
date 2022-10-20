import React , {Suspense}from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.scss";
import {BrowserRouter} from "react-router-dom";

import "./i18n";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement );

root.render(
  <Suspense fallback="Loading...">
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>

);

