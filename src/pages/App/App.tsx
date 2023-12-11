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
import { FilterItemProps } from "../Service/Manufacturing/Filter/Filter";
import RegisterOrganization from "../RegisterOrganization/RegisterOrganization";
import EmailVerification from "../EmailVerification/EmailVerification";
import ResKriVer from "../ResKriVer/ResKriVer";
import { OrganizationRouteOutlet } from "@/routeOutlets/OrganizationOutlet";
import { AdminRouteOutlet } from "@/routeOutlets/AdminOutlet";
import { ToastContainer } from "react-toastify";
import ProjectsRoutes from "@/routes/ProjectsRoutes";
import AdminRoutes from "@/routes/AdminRotes";
import AuthorizedUserRouteOutlet from "@/routeOutlets/AuthorizedUserOutlet";
import ContentBox from "@component-library/ContentBox";
import RedirectLogin from "../Login/RedirectLogin";

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
        className={`flex min-h-screen flex-col items-center justify-center overflow-x-auto font-ptsans text-base`}
        data-testid="app"
        id="app"
      >
        <Header />
        <main className="flex h-full w-full flex-grow flex-col items-center justify-start">
          {/* <Breadcrumb /> */}
          <Routes data-testid="routes">
            <Route index element={<Home />} />
            <Route
              path="registerOrganization"
              element={
                <ContentBox>
                  <RegisterOrganization />
                </ContentBox>
              }
            />
            <Route
              path="reskriver"
              element={
                <ContentBox>
                  <ResKriVer />
                </ContentBox>
              }
            />
            <Route
              path="logout"
              element={
                <ContentBox>
                  <Logout />
                </ContentBox>
              }
            />
            <Route
              path="portfolio"
              element={
                <ContentBox>
                  <Portfolio />
                </ContentBox>
              }
            />
            <Route
              path="verifyEMail"
              element={
                <ContentBox>
                  <EmailVerification />
                </ContentBox>
              }
            />
            <Route
              path="login"
              element={
                <ContentBox>
                  <Login />
                </ContentBox>
              }
            />
            <Route
              path="login/redirect"
              element={
                <ContentBox>
                  <RedirectLogin />
                </ContentBox>
              }
            />
            <Route
              path="register"
              element={
                <ContentBox>
                  <Login />
                </ContentBox>
              }
            />
            <Route
              path="legal/*"
              element={
                <ContentBox>
                  <Legal />
                </ContentBox>
              }
            />
            <Route path="demo/*" element={<Navigate to="/project/new" />} />
            <Route
              path="projects/*"
              element={
                <ContentBox>
                  <ProjectsRoutes />
                </ContentBox>
              }
            />
            <Route element={<AuthorizedUserRouteOutlet />}>
              <Route
                path="test"
                element={
                  <ContentBox>
                    <Test />
                  </ContentBox>
                }
              />
              <Route
                path="account"
                element={
                  <ContentBox>
                    <Profile />
                  </ContentBox>
                }
              />
              <Route
                element={
                  <ContentBox>
                    <OrganizationRouteOutlet />
                  </ContentBox>
                }
              >
                <Route
                  path="organization"
                  element={
                    <PermissionGate
                      element="Organization"
                      showMessage
                      children={
                        <ContentBox>
                          <Organization />
                        </ContentBox>
                      }
                    />
                  }
                />
                <Route
                  path="resources/*"
                  element={
                    <PermissionGate
                      children={
                        <ContentBox>
                          <Resouces />
                        </ContentBox>
                      }
                      element="Resources"
                      showMessage
                    />
                  }
                />
              </Route>
              <Route element={<AdminRouteOutlet />}>
                <Route
                  path="admin/*"
                  element={
                    <ContentBox>
                      <AdminRoutes />
                    </ContentBox>
                  }
                />
              </Route>
            </Route>
            <Route
              path="*"
              element={
                <ContentBox>
                  <Error />
                </ContentBox>
              }
            />
          </Routes>
        </main>
        <Modal
          open={cookieConsent === undefined}
          locked={cookieConsent === undefined}
          noIcon
          title="CookieBanner"
        >
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
