import React, { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import useUser from "../../hooks/useUser";
import { Home } from "../Home/Home";
import { ProcessView } from "../Process/ProcessView";
import Logout from "../Logout/Logout";
import Login from "../Login/Login";
import { Error } from "../Error/Error";
import { IFilterItem } from "../Process/Filter/Interface";
import Redirect from "../Redirect/Redirect";
import Footer from "../Footer/Footer";
import ServiceRoutes from "../Service/ServiceRoutes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import GuideRoutes from "../Guide/GuideRoutes";
import {
  PrivateAdminRoutes,
  PrivateClientRoutes,
  PrivateManufacturerRoutes,
  PrivateRoutes,
} from "../PrivateRoutes/PrivateRoutes";
import Profil from "../Profil/Profil";
import OrderCollectionOverview from "../Orders/OrderCollectionOverview";
import AdminUserView from "../Admin/AdminUserView";
import AdminModelView from "../Admin/AdminModelView";
import AdminMaterialView from "../Admin/AdminMaterialView";
import AdminOrderView from "../Admin/AdminOrderView";
import Background from "../Background/Background";
import Checkout from "../AfterProcess/Checkout/Checkout";
import Cart from "../AfterProcess/Cart/Cart";
import { EUserType } from "../../interface/enums";
import { URL_AboutUs } from "../../constants/Constants";
import ManufacturerView from "../AfterProcess/Manufacturer/ManufacturerView";
import {
  IOrderCollectionEvent,
  IOrderEvent,
  IProcessItem,
  IUser,
} from "../../interface/Interface";
import LoginView from "../Login/LoginView";
import useMissedEvent from "../../hooks/useMissedEvent";
import { useWebsocket } from "../../hooks/useWebsocket";
import { useQueryClient } from "@tanstack/react-query";
import useCart from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import Contact from "../Contact/Contact";

export interface IAppState {
  selectedProgressItem?: { index: number; progress: string };
  stopScroll: boolean;
  guideFilter: IFilterItem[];
  missedEvents: IOrderCollectionEvent[];
}

export interface IAppContext {
  user: IUser | undefined;
  cart: IProcessItem[];
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
  deleteEvent(
    orderCollectionID: string,
    orderID: string,
    type: "message" | "status"
  ): void;
}

const initialState: IAppState = {
  stopScroll: false,
  guideFilter: [],
  missedEvents: [],
};

export const AppContext = createContext<IAppContext>({
  user: undefined,
  cart: [],
  appState: initialState,
  setAppState: () => {},
  deleteEvent: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<IAppState>(initialState);
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
      const existingOrderCollectionEvent: IOrderCollectionEvent | undefined =
        prevState.missedEvents.find(
          (event) => event.orderCollectionID === orderCollectionID
        );

      if (
        existingOrderCollectionEvent !== undefined &&
        existingOrderCollectionEvent.orders.length > 0
      ) {
        const existingOrderEvents: IOrderEvent[] =
          existingOrderCollectionEvent.orders;
        const editedOrderEvents = existingOrderEvents.map(
          (orderEvent): IOrderEvent => {
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
        const editedOrderCollectionEvent: IOrderCollectionEvent = {
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
      const newOrderCollectionEvent: IOrderCollectionEvent = JSON.parse(
        event.data
      );
      const newOrderEvent = newOrderCollectionEvent.orders[0];
      const getNumberMessages = (
        oldEvent: IOrderEvent | undefined,
        newEvent: IOrderEvent | undefined
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
        oldEvent: IOrderEvent | undefined,
        newEvent: IOrderEvent | undefined
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
        missedEvents: IOrderCollectionEvent[]
      ): IOrderCollectionEvent[] => {
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
      <Route path="user" element={<AdminUserView />} />
      <Route path="model" element={<AdminModelView />} />
      <Route path="material" element={<AdminMaterialView />} />
      <Route path="procedure" element={<h1>Procedure</h1>} />
      <Route path="printer" element={<h1>Printer</h1>} />
      <Route path="order" element={<AdminOrderView />} />
    </Route>
  );

  const clientRoutes = (
    <Route element={<PrivateClientRoutes user={user} />}>
      <Route path="manufacturer" element={<ManufacturerView />} />
      <Route path="checkout" element={<Checkout />} />
      <Route
        path="orders"
        element={<OrderCollectionOverview userType={EUserType.client} />}
      />
      <Route path="assignments" element={<Error text="assignments" />} />
    </Route>
  );

  const manufacturerRoutes = (
    <Route element={<PrivateManufacturerRoutes user={user} />}>
      <Route path="proceedings" element={<Error text="proceedings" />} />
      <Route
        path="contracts"
        element={<OrderCollectionOverview userType={EUserType.manufacturer} />}
      />
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
  )
    return (
      <div className="flex flex-col items-center justify-center bg-white w-screen h-screen gap-5">
        <h1 className="md:text-4xl xl:text-9xl">{t("App.title")}</h1>
        <h2>{t("App.loading")}</h2>
      </div>
    );

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
        className={`flex flex-col justify-between min-h-screen font-ptsans items-center gap-5 p-3 text-base overflow-x-auto`}
        data-testid="app"
      >
        <Header
          isLoggedIn={isLoggedIn}
          userType={userType}
          cartCount={cartQuery.data.length}
          events={missedEvents}
        />
        <main className="w-full xl:w-5/6 flex flex-col justify-start items-center p-5 flex-grow bg-opacity-80 bg-slate-200 gap-5">
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
            <Route path="login" element={<Login />} />
            <Route path="register" element={<LoginView register={true} />} />
            <Route path="contact" element={<Contact />} />
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
