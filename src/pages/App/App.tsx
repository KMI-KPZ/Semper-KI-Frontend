import { Header } from "@/components/Header";
import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../Error/Error";
import { Home } from "../Home/Home";
import { Test } from "../Test/Test";
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
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import "react-toastify/dist/ReactToastify.css";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import useCookieConsent from "@/components/CookieBanner/hooks/useCookieConsent";
import Modal from "@component-library/Modal";
import usePing from "@/hooks/usePing";
import { FilterItemProps } from "../Service/Manufacturing/Filter/Filter";
import RegisterOrganization from "../RegisterOrganization/RegisterOrganization";
import EmailVerification from "../EmailVerification/EmailVerification";
import ResKriVer from "../ResKriVer/ResKriVer";
import AuthorizedUserOutlet from "@/outlets/AuthorizedUserOutlet";
import { OrganizationOutlet } from "@/outlets/OrganizationOutlet";
import { AdminOutlet } from "@/outlets/AdminOutlet";
import { ToastContainer } from "react-toastify";
import ProjectsRoutes from "@/routes/ProjectsRoutes";
import AdminRoutes from "@/routes/AdminRotes";

export type AppState = {
  selectedProgressItem?: { index: number; progress: string };
  guideFilter: FilterItemProps[];
  demoID?: string;
};

export type AppContext = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const initialAppState: AppState = {
  guideFilter: [],
};

export const AppContext = createContext<AppContext>({
  appState: initialAppState,
  setAppState: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialAppState);
  const { rejectCookies, acceptCookies, cookieConsent } = useCookieConsent();

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setAppState: setState,
      }}
    >
      <div
        className={`flex min-h-screen flex-col items-center justify-between gap-5 overflow-x-auto p-3 font-ptsans text-base`}
        data-testid="app"
      >
        <Header />
        <main className="flex w-full max-w-screen-2xl flex-grow flex-col items-center justify-start gap-5 bg-slate-200 bg-opacity-80 p-5 xl:w-5/6">
          <Breadcrumb />
          <Routes data-testid="routes">
            <Route index element={<Home />} />
            <Route
              path="registerOrganization"
              element={<RegisterOrganization />}
            />
            <Route path="reskriver" element={<ResKriVer />} />
            <Route path="logout" element={<Logout />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="verifyEMail" element={<EmailVerification />} />
            <Route path="login" element={<Login />} />
            <Route path="login/redirect" element={<RedirectLogin />} />
            <Route path="register" element={<Login />} />
            <Route path="legal/*" element={<Legal />} />
            <Route path="demo/*" element={<Navigate to="/project/new" />} />
            <Route path="projects/*" element={<ProjectsRoutes />} />
            <Route element={<AuthorizedUserOutlet />}>
              <Route path="test" element={<Test />} />
              <Route path="account" element={<Profile />} />
              <Route element={<OrganizationOutlet />}>
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
              <Route element={<AdminOutlet />}>
                <Route path="admin/*" element={<AdminRoutes />} />
              </Route>
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
