import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

import "./i18n";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import App from "./components/App/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <Suspense fallback="Loading...">
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
);
