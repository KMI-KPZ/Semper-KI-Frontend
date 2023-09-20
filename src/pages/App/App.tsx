import { Header } from "@/components/Header";
import { Heading } from "@component-library/Typography";
import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../Error/Error";
import { Home } from "../Home/Home";
import { Test } from "../Test/Test";
import { UserProps } from "@/hooks/useUser/types";
import { DeleteEvent, Event } from "@/pages/App/types";
import { ToastContainer } from "react-toastify";
import useUser from "@/hooks/useUser";
import Background from "@/components/Background";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Login from "../Login/Login";
import RedirectLogin from "../Login/Redirect/RedirectLogin";
import Logout from "../Logout/Logout";
import Organization from "../Organization/Organization";
import Portfolio from "../Portfolio/Portfolio";
import Profile from "../Profile/Proflle";
import Resouces from "../Resources/Resources";
import Legal from "../Legal/Legal";
import useEvents from "./hooks/useEvents/useEvents";
import usePermissions, {
  Permission,
  PermissionGateType,
} from "@/hooks/usePermissions";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import "react-toastify/dist/ReactToastify.css";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import useCookieConsent from "@/components/CookieBanner/hooks/useCookieConsent";
import Modal from "@component-library/Modal";
import usePing from "@/hooks/usePing";
import Orders from "../Orders/Orders";
import OrderRoutes from "../Routes/Order";
import { FilterItemProps } from "../Service/Manufacturing/Filter/Filter";
import AdminRoutes from "../Routes/Admin";
import RegisterOrganization from "../RegisterOrganization/RegisterOrganization";
import AppLoadingSuspense from "./components/LoadingSuspense";
import { AdminOutlet, OrganizationOutlet, UserOutlet } from "../Outlets/Outlet";
import EmailVerification from "../EmailVerification/EmailVerification";

export type AppState = {
  selectedProgressItem?: { index: number; progress: string };
  guideFilter: FilterItemProps[];
  demoID?: string;
};

export type AppContext = {
  events: Event[];
  user: UserProps | undefined;
  permissions: Permission[] | undefined;
  permissionGates: PermissionGateType[] | undefined;
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
  appState: initialAppState,
  setAppState: () => {},
  deleteEvent: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialAppState);
  const { rejectCookies, acceptCookies, cookieConsent } = useCookieConsent();
  const { isLoggedIn, user, isLoggedInResponse } = useUser();
  const { permissionGates, permissions, reloadPermissions } =
    usePermissions(user);
  const { socket, deleteEvent, events } = useEvents(
    isLoggedIn,
    user,
    reloadPermissions
  );
  const { isMagazineUp } = usePing();

  const showLoadingSuspense = (): boolean =>
    isLoggedInResponse === false ||
    (isLoggedIn === true &&
      (user === undefined ||
        permissionGates === undefined ||
        permissions === undefined));

  return showLoadingSuspense() ? (
    <AppLoadingSuspense />
  ) : (
    <AppContext.Provider
      value={{
        appState: state,
        setAppState: setState,
        deleteEvent,
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
        <Header user={user} events={events} />
        <main className="flex w-full max-w-screen-2xl flex-grow flex-col items-center justify-start gap-5 bg-slate-200 bg-opacity-80 p-5 xl:w-5/6">
          <Breadcrumb />
          <Routes data-testid="routes">
            <Route index element={<Home events={events} user={user} />} />
            <Route
              path="registerOrganization"
              element={<RegisterOrganization />}
            />
            <Route path="logout" element={<Logout />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="verifyEMail" element={<EmailVerification />} />
            <Route path="login" element={<Login />} />
            <Route path="login/redirect" element={<RedirectLogin />} />
            <Route path="register" element={<Login />} />
            <Route
              path="legal/*"
              element={<Legal isMagazineUp={isMagazineUp} />}
            />
            <Route path="demo/*" element={<Navigate to="/order/new" />} />
            <Route path="orders" element={<Orders user={user} />} />
            <Route path="order/*" element={<OrderRoutes user={user} />} />
            <Route element={<UserOutlet user={user} />}>
              <Route path="test" element={<Test socket={socket} />} />
              <Route path="account" element={<Profile user={user!} />} />
            </Route>
            <Route element={<OrganizationOutlet user={user} />}>
              <Route
                path="organization"
                element={
                  <PermissionGate
                    element="Organization"
                    showMessage
                    children={<Organization />}
                  />
                }
              />
              <Route
                path="resources/*"
                element={
                  <PermissionGate
                    children={<Resouces />}
                    element="Resources"
                    showMessage
                  />
                }
              />
            </Route>
            <Route element={<AdminOutlet user={user} />}>
              <Route path="admin/*" element={<AdminRoutes user={user} />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Modal open={cookieConsent === undefined} noIcon>
          <CookieBanner
            acceptCookies={acceptCookies}
            rejectCookies={rejectCookies}
          />
        </Modal>
        <Footer isMagazineUp={isMagazineUp} />
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
