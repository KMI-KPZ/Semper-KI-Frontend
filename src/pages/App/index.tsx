import { Header } from "@/components/Header";
import { Heading } from "@component-library/Typography";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../Error";
import { Home } from "../Home";
import { IProcessItem, ProcessView } from "../Process";
import { IFilterItem } from "../Process/Filter";
import { RequestTest } from "../RequestTest";
import {
  PrivateAdminRoutes,
  PrivateClientRoutes,
  PrivateManufacturerRoutes,
  PrivateRoutes,
} from "./components/PrivateRoutes";
import { User, UserType } from "@/hooks/useUser/types";
import { DeleteEvent, Event } from "@/pages/App/hooks/types";
import useCart from "@/hooks/useCart";
import useUser from "@/hooks/useUser";
import Background from "@/components/Background";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import AdminMaterials from "../Admin/Materials";
import AdminModels from "../Admin/Models";
import AdminOrders from "../Admin/Orders";
import AdminUsers from "../Admin/Users";
import GuideRoutes from "../Guide";
import LoginView from "../Login";
import RedirectLogin from "../Login/Redirect";
import Logout from "../Logout";
import OrderCollectionOverview from "../Orders";
import OrganizationView from "../Organization";
import Portfolio from "../Portfolio";
import Cart from "../Process/Cart";
import Checkout from "../Process/Checkout";
import ManufacturerView from "../Process/Manufacturer";
import Profil from "../Profil";
import ResoucesView from "../Resources";
import ServiceRoutes from "../Service";
import Legal from "../Legal";
import useEvents from "./hooks/useEvents";
import usePermissions, {
  OrdersReadPermission,
  OrgaReadPermission,
  Permission,
} from "@/hooks/usePermissions";
import PermissionGate from "@/components/PermissionGate";

export type AppState = {
  selectedProgressItem?: { index: number; progress: string };
  stopScroll: boolean;
  guideFilter: IFilterItem[];
  missedEvents: Event[];
  permissions?: Permission[];
};

export type AppContext = {
  user: User | undefined;
  cart: IProcessItem[];
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  deleteEvent(event: DeleteEvent): void;
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
  const { cartQuery } = useCart();
  const { deleteEvent } = useEvents(setState, isLoggedIn);
  const { t } = useTranslation();
  usePermissions(setState, isLoggedIn && userType === UserType.manufacturer);

  useEffect(() => {
    document.body.style.overflowY = stopScroll === true ? "hidden" : "scroll";
    document.body.style.scrollbarGutter = "stable";
    // document.body.style.paddingRight = stopScroll === true ? "17px" : "";
  }, [stopScroll]);

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
        element={
          <PermissionGate
            gate={OrdersReadPermission}
            showMessage
            children={
              <OrderCollectionOverview userType={UserType.manufacturer} />
            }
          />
        }
      />
      <Route
        path="organization"
        element={
          <PermissionGate
            gate={OrgaReadPermission}
            showMessage
            children={<OrganizationView />}
          />
        }
      />
      <Route path="resources/*" element={<ResoucesView />} />
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
        <Heading variant="h2">{t("App.loading")}</Heading>
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
            <Route path="service/*" element={<ServiceRoutes />} />
            <Route path="legal/*" element={<Legal />}></Route>
            {clientRoutes}
            {manufacturerRoutes}
            {privateRoutes}
            {adminRoutes}
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Background />
    </AppContext.Provider>
  );
};

export default App;
