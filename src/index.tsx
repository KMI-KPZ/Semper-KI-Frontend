import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./pages/App";
import { Heading } from "@component-library/Typography";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const fallback = (
  <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-hidden bg-white">
    <Heading variant="h1">Semper-KI</Heading>
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
