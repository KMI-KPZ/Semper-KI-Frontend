import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
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

const fallback = (
  <div className="flex flex-col items-center justify-center bg-white w-screen h-screen gap-5">
    <h1 className="md:text-4xl xl:text-9xl">Semper-KI</h1>
    <h2>Loading...</h2>
  </div>
);

root.render(
  <Suspense fallback={fallback}>
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
