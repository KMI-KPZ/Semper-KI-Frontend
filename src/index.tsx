import "./i18n";
import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import App from "./pages/App/App";
import {Heading} from "@component-library/index";
import UserContextProvider from "./contexts/UserContextProvider";
import PermissionContextProvider from "./contexts/PermissionContextProvider";
import EventContextProvider from "./contexts/EventContextProvider";
import BodyScrollContextProvider from "./contexts/BodyScrollContextProvider";
import ModalContextProvider from "./contexts/ModalContextProvider";
import CSRFOutlet from "./outlets/CSRFOutlet";
import UserLocalsOutlet from "./outlets/UserLocalsOutlet";
import {TopicsProvider} from "@/contexts/ChatbotContextProvider";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev";

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
        <Heading variant="h2">Loading...</Heading>
    </div>
);

root.render(
    <Suspense fallback={fallback}>
        <React.StrictMode>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CSRFOutlet>
                        <TopicsProvider>
                            <UserContextProvider>
                                <UserLocalsOutlet>
                                    <PermissionContextProvider>
                                        <EventContextProvider>
                                            <BodyScrollContextProvider>
                                                <ModalContextProvider>
                                                    <DevSupport ComponentPreviews={ComponentPreviews}
                                                                useInitialHook={useInitial}
                                                    >
                                                        <App/>
                                                    </DevSupport>
                                                    <ReactQueryDevtools/>
                                                </ModalContextProvider>
                                            </BodyScrollContextProvider>
                                        </EventContextProvider>
                                    </PermissionContextProvider>
                                </UserLocalsOutlet>
                            </UserContextProvider>
                        </TopicsProvider>
                    </CSRFOutlet>
                </QueryClientProvider>
            </BrowserRouter>
        </React.StrictMode>
    </Suspense>
);
