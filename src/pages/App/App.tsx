import { Header } from "@/components/Header";
import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../Error/Error";
import { Home } from "../Home/Home";
import { Test } from "../Test/Test";
import Footer from "@/components/Footer";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Organization from "../Organization/Organization";
import Portfolio from "../Portfolio/Portfolio";
import Resouces from "../Resources/Resources";
import Legal from "../Legal/Legal";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import "react-toastify/dist/ReactToastify.css";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import { FilterItemProps } from "../Service/Manufacturing/Filter/Filter";
import RegisterOrganization from "../RegisterOrganization/RegisterOrganization";
import EmailVerification from "../EmailVerification/EmailVerification";
import ResKriVer from "../ResKriVer/ResKriVer";
import { OrganizationRouteOutlet } from "@/routeOutlets/OrganizationOutlet";
import { AdminRouteOutlet } from "@/routeOutlets/AdminOutlet";
import { ToastContainer } from "react-toastify";
import AdminRoutes from "@/routes/AdminRoutes";
import AuthorizedUserRouteOutlet from "@/routeOutlets/AuthorizedUserOutlet";
import { ContentBox } from "@component-library/index";
import RedirectLogin from "../Login/RedirectLogin";
import Menu from "@/components/Menu";
import { Background, Breadcrumb } from "@/components/index";
import Advantages from "../Advantages/Advantages";
import Chatbot from "@/components/Chatbot/Chatbot";
import Profile from "../Profile/Proflle";
import Projects from "../Projects/Projects";
import ProjectOutlet from "@/routeOutlets/ProjectOutlet";
import ProjectPage from "../Project/ProjectPage";
import ProcessOutlet from "@/routeOutlets/ProcessOutlet";
import ProjectCheckout from "../Process/Checkout/Checkout";
import ProcessHistory from "../Process/History/History";
import ProcessChat from "../Process/Chat/Chat";
import ServiceRoutes from "@/routes/ServiceRoutes";
import ProcessPage from "../Process/ProcessPage";

export type AppState = {
  guideFilter: FilterItemProps[];
  demoID?: string;
  menuOpen: boolean;
};

export type AppContext = {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
};

const initialAppState: AppState = {
  guideFilter: [],
  menuOpen: false,
};

export const AppContext = createContext<AppContext>({
  appState: initialAppState,
  setAppState: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(initialAppState);

  //test

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
          <Breadcrumb />
          <Routes data-testid="routes">
            <Route index element={<Home />} />
            <Route
              path="advantages/user"
              element={
                <ContentBox>
                  <Advantages type="user" />
                </ContentBox>
              }
            />
            <Route
              path="advantages/organization"
              element={
                <ContentBox>
                  <Advantages type="organization" />
                </ContentBox>
              }
            />
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
            <Route path="projects/*">
              <Route
                index
                element={
                  <PermissionGate element="Projects">
                    <ContentBox>
                      <Projects />
                    </ContentBox>
                  </PermissionGate>
                }
              />
              <Route
                path=":projectID/*"
                element={
                  <ContentBox>
                    <ProjectOutlet />
                  </ContentBox>
                }
              >
                <Route
                  index
                  element={
                    <PermissionGate element="Projects">
                      <ProjectPage />
                    </PermissionGate>
                  }
                />
                <Route path=":processID/*" element={<ProcessOutlet />}>
                  <Route index element={<ProcessPage />} />
                  <Route element={<AuthorizedUserRouteOutlet />}>
                    <Route
                      path="history"
                      element={
                        <>
                          <ProjectPage />
                          <ProcessHistory />
                        </>
                      }
                    />
                    <Route
                      path="chat"
                      element={
                        <>
                          <ProjectPage />
                          <ProcessChat />
                        </>
                      }
                    />
                    <Route
                      path="checkout"
                      element={<Navigate to="../../checkout" />}
                    />
                    <Route
                      path="verification"
                      element={<Navigate to="../../verification" />}
                    />
                    <Route
                      path="contractorSelection"
                      element={<Navigate to="../../contractorSelection" />}
                    />
                  </Route>
                  <Route
                    path="service/*"
                    element={
                      <>
                        <ProjectPage />
                        <ServiceRoutes />
                      </>
                    }
                  />
                </Route>
              </Route>
            </Route>
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
        <CookieBanner />
        <Menu />
        <Footer />
      </div>
      <Chatbot />
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
