import { Header } from "@/components/Header";
import { Heading } from "@component-library/Typography";
import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../Error/Error";
import { Home } from "../Home/Home";
import { IProcessItem } from "../Process/types";
import { IFilterItem } from "../Process/Filter";
import { RequestTest } from "../RequestTest";
import {
  PrivateAdminRoutes,
  PrivateClientRoutes,
  PrivateManufacturerRoutes,
  PrivateRoutes,
} from "./components/PrivateRoutes";
import { User, UserType } from "@/hooks/useUser/types";
import { DeleteEvent, Event } from "@/pages/App/types";
import { ToastContainer } from "react-toastify";
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
import Portfolio from "../Portfolio/Portfolio";
import Cart from "../Process/Cart";
import Checkout from "../Process/Checkout";
import ManufacturerView from "../Process/Manufacturer";
import Profil from "../Profil";
import ResoucesView from "../Resources";
import ServiceRoutes from "../Service";
import Legal from "../Legal/Legal";
import useEvents from "./hooks/useEvents";
import usePermissions, {
  Permission,
  PermissionGateType,
} from "@/hooks/usePermissions";
import PermissionGate from "@/components/PermissionGate";
import "react-toastify/dist/ReactToastify.css";
import { ProcessView } from "../Process";
import logger from "@/hooks/useLogger";

export type AppState = {
  selectedProgressItem?: { index: number; progress: string };
  guideFilter: IFilterItem[];
};

export type AppContext = {
  events: Event[];
  user: User | undefined;
  permissions: Permission[] | undefined;
  permissionGates: PermissionGateType[] | undefined;
  cart: IProcessItem[];
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  deleteEvent(event: DeleteEvent): void;
};

const initialAppState: AppState = {
  guideFilter: [],
};

export const AppContext = createContext<AppContext>({
  events: [],
  user: undefined,
  permissions: [],
  permissionGates: [],
  cart: [],
  appState: initialAppState,
  setAppState: () => {},
  deleteEvent: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialAppState);
  const { isLoggedIn, userType, user, isLoggedInResponse } = useUser();
  const { cartQuery } = useCart();
  const { permissionGates, permissions, reloadPermissions } =
    usePermissions(user);
  const { socket, deleteEvent, events } = useEvents(
    isLoggedIn,
    userType,
    reloadPermissions
  );
  const { t } = useTranslation();

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
        element={
          <OrderCollectionOverview userType={UserType.client} events={events} />
        }
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
            element="OrderCollectionOverview"
            showMessage
            children={
              <OrderCollectionOverview
                userType={UserType.manufacturer}
                events={events}
              />
            }
          />
        }
      />
      <Route
        path="organization"
        element={
          <PermissionGate
            element="OrganizationView"
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
      <Route path="test" element={<RequestTest socket={socket} />} />
    </Route>
  );

  if (
    isLoggedInResponse === false ||
    (isLoggedIn === true &&
      (user === undefined || permissionGates === undefined))
  ) {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.style.overflow = "hidden";
    }
    return (
      <div
        data-testid="loadingSuspense"
        className="flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-clip bg-white"
      >
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
        deleteEvent,
        cart: cartQuery.data,
        user,
        permissions,
        permissionGates,
        events,
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
          events={events}
        />
        <main className="flex w-full flex-grow flex-col items-center justify-start gap-5 bg-slate-200 bg-opacity-80 p-5 xl:w-5/6">
          <Breadcrumb />
          <Routes data-testid="routes">
            <Route
              index
              element={
                <Home
                  events={events}
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
                  guideAnswers={state.guideFilter}
                  selectedProgressItem={state.selectedProgressItem}
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
      <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Background />
    </AppContext.Provider>
  );
};

export default App;
