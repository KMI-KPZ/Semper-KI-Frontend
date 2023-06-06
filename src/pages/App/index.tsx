import Background from "@/components/Background";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { URL_AboutUs } from "@/config/constants";
import useCart from "@/hooks/useCart";
import useMissedEvent from "@/hooks/useMissedEvent";
import useUser, {
  OrderCollectionEvent,
  OrderEvent,
  User,
  UserType,
} from "@/hooks/useUser";
import { useWebsocket } from "@/hooks/useWebsocket";
import { Heading } from "@component-library/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminMaterials from "../Admin/Materials";
import AdminModels from "../Admin/Models";
import AdminOrders from "../Admin/Orders";
import AdminUsers from "../Admin/Users";
import { Error } from "../Error";
import GuideRoutes from "../Guide";
import { Home } from "../Home";
import LoginView from "../Login";
import RedirectLogin from "../Login/Redirect";
import Logout from "../Logout";
import OrderCollectionOverview from "../Orders";
import OrganizationView from "../Organization";
import Portfolio from "../Portfolio";
import { IProcessItem, ProcessView } from "../Process";
import Cart from "../Process/Cart";
import Checkout from "../Process/Checkout";
import { IFilterItem } from "../Process/Filter";
import ManufacturerView from "../Process/Manufacturer";
import Profil from "../Profil";
import Redirect from "../Redirect";
import { RequestTest } from "../RequestTest";
import ServiceRoutes from "../Service";
import {
  PrivateAdminRoutes,
  PrivateClientRoutes,
  PrivateManufacturerRoutes,
  PrivateRoutes,
} from "./components/PrivateRoutes";

export type AppState = {
  selectedProgressItem?: { index: number; progress: string };
  stopScroll: boolean;
  guideFilter: IFilterItem[];
  missedEvents: OrderCollectionEvent[];
};

export type AppContext = {
  user: User | undefined;
  cart: IProcessItem[];
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  deleteEvent(
    orderCollectionID: string,
    orderID: string,
    type: "message" | "status"
  ): void;
};

const initialAppState: AppState = {
  stopScroll: false,
  guideFilter: [],
  missedEvents: [],
};

export const AppContext = createContext<AppContext>({
  user: undefined,
  cart: [],
  appState: initialAppState,
  setAppState: () => {},
  deleteEvent: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialAppState);
  const { stopScroll, guideFilter, selectedProgressItem, missedEvents } = state;
  const { isLoggedIn, userType, user, isLoggedInResponse } = useUser();
  const { initialMissedEvents } = useMissedEvent({
    isLoggedIn,
  });
  const { cartQuery } = useCart();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflowY = stopScroll === true ? "hidden" : "scroll";
  }, [stopScroll]);

  useEffect(() => {
    if (initialMissedEvents.length > 0)
      setState((prevState) => ({
        ...prevState,
        missedEvents: initialMissedEvents,
      }));
  }, [initialMissedEvents]);

  const deleteEvent = (
    orderCollectionID: string,
    orderID: string,
    type: "message" | "status"
  ) => {
    // console.log("deleteEvent", orderCollectionID, orderID, type);
    setState((prevState) => {
      const existingOrderCollectionEvent: OrderCollectionEvent | undefined =
        prevState.missedEvents.find(
          (event) => event.orderCollectionID === orderCollectionID
        );

      if (
        existingOrderCollectionEvent !== undefined &&
        existingOrderCollectionEvent.orders.length > 0
      ) {
        const existingOrderEvents: OrderEvent[] =
          existingOrderCollectionEvent.orders;
        const editedOrderEvents = existingOrderEvents.map(
          (orderEvent): OrderEvent => {
            return {
              orderID: orderEvent.orderID,
              messages:
                orderEvent.orderID === orderID && type === "message"
                  ? undefined
                  : orderEvent.messages,
              status:
                orderEvent.orderID === orderID && type === "status"
                  ? undefined
                  : orderEvent.status,
            };
          }
        );
        const editedOrderCollectionEvent: OrderCollectionEvent = {
          orderCollectionID: existingOrderCollectionEvent.orderCollectionID,
          orders: editedOrderEvents.filter(
            (orderEvent) =>
              orderEvent.messages !== undefined ||
              orderEvent.status !== undefined
          ),
        };
        const missedEventsWithout = prevState.missedEvents.filter(
          (orderCollectionEvent) =>
            orderCollectionEvent.orderCollectionID !== orderCollectionID
        );
        const missedEventsWith =
          missedEventsWithout.length > 0
            ? [...missedEventsWithout, editedOrderCollectionEvent]
            : [editedOrderCollectionEvent];
        return {
          ...prevState,
          missedEvents: missedEventsWith,
        };
      } else {
        const newMissedEvents = prevState.missedEvents.filter(
          (orderCollectionEvent) =>
            orderCollectionEvent.orderCollectionID !== orderCollectionID
        );
        return {
          ...prevState,
          missedEvents: newMissedEvents.length > 0 ? newMissedEvents : [],
        };
      }
    });
  };

  const onWebsocktEvent = (event: MessageEvent) => {
    if (event.data !== undefined) {
      const newOrderCollectionEvent: OrderCollectionEvent = JSON.parse(
        event.data
      );
      const newOrderEvent = newOrderCollectionEvent.orders[0];
      const getNumberMessages = (
        oldEvent: OrderEvent | undefined,
        newEvent: OrderEvent | undefined
      ): number | undefined => {
        if (oldEvent === undefined && newEvent === undefined) return undefined;
        if (
          oldEvent === undefined &&
          newEvent !== undefined &&
          newEvent.messages !== undefined
        )
          return newEvent.messages > 0 ? newEvent.messages : undefined;
        if (
          newEvent === undefined &&
          oldEvent !== undefined &&
          oldEvent.messages !== undefined
        )
          return oldEvent.messages > 0 ? oldEvent.messages : undefined;
        if (
          oldEvent !== undefined &&
          newEvent !== undefined &&
          oldEvent.messages !== undefined &&
          newEvent.messages !== undefined
        ) {
          const result = oldEvent.messages + newEvent.messages;
          return result > 0 ? result : undefined;
        }

        return undefined;
      };
      const getNumberStatus = (
        oldEvent: OrderEvent | undefined,
        newEvent: OrderEvent | undefined
      ): number | undefined => {
        if (oldEvent === undefined && newEvent === undefined) return undefined;
        if (
          oldEvent === undefined &&
          newEvent !== undefined &&
          newEvent.status !== undefined
        )
          return newEvent.status > 0 ? newEvent.status : undefined;
        if (
          newEvent === undefined &&
          oldEvent !== undefined &&
          oldEvent.status !== undefined
        )
          return oldEvent.status > 0 ? oldEvent.status : undefined;
        if (
          oldEvent !== undefined &&
          newEvent !== undefined &&
          oldEvent.status !== undefined &&
          newEvent.status !== undefined
        ) {
          const result = oldEvent.status + newEvent.status;
          return result > 0 ? result : undefined;
        }

        return undefined;
      };
      const hydrateEvents = (
        missedEvents: OrderCollectionEvent[]
      ): OrderCollectionEvent[] => {
        const existingOrderCollecetionIDs: string[] = [];
        const existingOrderIDs: string[] = [];
        missedEvents.forEach((orderCollectionEvent) => {
          existingOrderCollecetionIDs.push(
            orderCollectionEvent.orderCollectionID
          );
          orderCollectionEvent.orders.forEach((orderEvent) => {
            existingOrderIDs.push(orderEvent.orderID);
          });
        });

        let hydratedMissedEvents = missedEvents;
        if (
          existingOrderCollecetionIDs.includes(
            newOrderCollectionEvent.orderCollectionID
          ) &&
          existingOrderIDs.includes(newOrderEvent.orderID)
        ) {
          const existingOrderCollectionEventsWithoutNew =
            hydratedMissedEvents.filter(
              (orderCollectionEvent) =>
                orderCollectionEvent.orderCollectionID !==
                newOrderCollectionEvent.orderCollectionID
            );
          const existingOrderCollectionEventNew = hydratedMissedEvents.find(
            (orderCollectionEvent) =>
              orderCollectionEvent.orderCollectionID ===
              newOrderCollectionEvent.orderCollectionID
          )!;
          const existingOrderEventNew =
            existingOrderCollectionEventNew.orders.find(
              (orderEvent) => orderEvent.orderID === newOrderEvent.orderID
            )!;
          hydratedMissedEvents = [
            ...existingOrderCollectionEventsWithoutNew,
            {
              orderCollectionID: newOrderCollectionEvent.orderCollectionID,
              orders: [
                ...existingOrderCollectionEventNew.orders.filter(
                  (orderEvent) => orderEvent.orderID !== newOrderEvent.orderID
                ),
                {
                  orderID: newOrderEvent.orderID,
                  messages: getNumberMessages(
                    existingOrderEventNew,
                    newOrderEvent
                  ),
                  status: getNumberStatus(existingOrderEventNew, newOrderEvent),
                },
              ],
            },
          ];
        } else {
          hydratedMissedEvents.push(newOrderCollectionEvent);
        }
        return hydratedMissedEvents;
      };

      if (newOrderCollectionEvent) {
        setState((prevState) => ({
          ...prevState,
          missedEvents: hydrateEvents(prevState.missedEvents),
        }));
        queryClient.invalidateQueries(["orders"]);
      }
    }
  };

  const {
    sendMessage,
    socket: websocket,
    state: webSocketState,
  } = useWebsocket(onWebsocktEvent, isLoggedIn);

  const setFilter = (guideFilter: IFilterItem[]): void => {
    setState((prevState) => ({ ...prevState, guideFilter }));
  };

  const adminRoutes = (
    <Route element={<PrivateAdminRoutes userType={userType} />}>
      <Route path="user" element={<AdminUsers />} />
      <Route path="model" element={<AdminModels />} />
      <Route path="material" element={<AdminMaterials />} />
      <Route
        path="procedure"
        element={<Heading variant="h1">Procedure</Heading>}
      />
      <Route path="printer" element={<Heading variant="h1">Printer</Heading>} />
      <Route path="order" element={<AdminOrders />} />
    </Route>
  );
  const clientRoutes = (
    <Route element={<PrivateClientRoutes user={user} />}>
      <Route path="manufacturer" element={<ManufacturerView />} />
      <Route path="checkout" element={<Checkout />} />
      <Route
        path="orders"
        element={<OrderCollectionOverview userType={UserType.client} />}
      />
      <Route path="assignments" element={<Error text="assignments" />} />
    </Route>
  );
  const manufacturerRoutes = (
    <Route element={<PrivateManufacturerRoutes user={user} />}>
      <Route path="proceedings" element={<Error text="proceedings" />} />
      <Route
        path="contracts"
        element={<OrderCollectionOverview userType={UserType.manufacturer} />}
      />
      <Route path="organization" element={<OrganizationView user={user} />} />
    </Route>
  );
  const privateRoutes = (
    <Route element={<PrivateRoutes user={user} />}>
      <Route path="account" element={<Profil user={user!} />} />
      <Route path="test" element={<RequestTest user={user} />} />
    </Route>
  );

  if (
    isLoggedInResponse === false ||
    (isLoggedIn === true && user === undefined)
  ) {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.overflow = "hidden";
    }
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-clip bg-white">
        <Heading variant="h1">{t("App.title")}</Heading>
        <h2>{t("App.loading")}</h2>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setAppState: setState,
        cart: cartQuery.data,
        user,
        deleteEvent,
      }}
    >
      <div
        className={`flex min-h-screen flex-col items-center justify-between gap-5 overflow-x-auto p-3 font-ptsans text-base`}
        data-testid="app"
      >
        <Header
          isLoggedIn={isLoggedIn}
          userType={userType}
          cartCount={cartQuery.data.length}
          events={missedEvents}
        />
        <main className="flex w-full flex-grow flex-col items-center justify-start gap-5 bg-slate-200 bg-opacity-80 p-5 xl:w-5/6">
          <Breadcrumb />
          <Routes data-testid="routes">
            <Route
              index
              element={
                <Home
                  events={missedEvents}
                  userType={userType}
                  cartCount={cartQuery.data.length}
                />
              }
            />

            <Route path="cart" element={<Cart />} />
            <Route
              path="process/*"
              element={
                <ProcessView
                  isLoggedInResponse={isLoggedInResponse}
                  guideAnswers={guideFilter}
                  selectedProgressItem={selectedProgressItem}
                />
              }
            />

            <Route path="guide">
              <Route index element={<GuideRoutes setFilter={setFilter} />} />
              <Route
                path=":path"
                element={<GuideRoutes setFilter={setFilter} />}
              />
              <Route path="*" element={<Navigate to="/guide" />} />
            </Route>
            <Route path="logout" element={<Logout />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="login" element={<LoginView />} />
            <Route path="login/redirect" element={<RedirectLogin />} />
            <Route path="register" element={<LoginView />} />
            <Route
              path="aboutus"
              element={<Redirect link={URL_AboutUs} extern />}
            />
            <Route path="service/*" element={<ServiceRoutes />} />
            <Route path="*" element={<Error />} />
            {clientRoutes}
            {manufacturerRoutes}
            {privateRoutes}
            {adminRoutes}
          </Routes>
        </main>
        <Footer />
      </div>
      <Background />
    </AppContext.Provider>
  );
};

export default App;
