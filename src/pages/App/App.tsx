import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Organization from "../Organization/Organization";
import Portfolio from "../Portfolio/Portfolio";
import Resouces from "../Resources/Resources";
import Legal from "../Legal/Legal";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import CkBanner from "@/components/CookieBanner/CkBanner";
import RegisterOrganization from "../RegisterOrganization/RegisterOrganization";
import EmailVerification from "../EmailVerification/EmailVerification";
import ResKriVer from "../ResKriVer/ResKriVer";
import RedirectLogin from "../Login/RedirectLogin";
import Menu from "@/components/Menu";
import Advantages from "../Advantages/Advantages";
import Chatbot from "@/components/Chatbot/Chatbot";
import Profile from "../Profile/Proflle";
import Projects from "../Projects/Projects";
import ProjectOutlet from "@/outlets/ProjectOutlet";
import ProjectPage from "../Project/ProjectPage";
import ProcessOutlet from "@/outlets/ProcessOutlet";
import ProcessPage from "../Process/ProcessPage";
import Admin from "../Admin/Admin";
import AdminUser from "../Admin/User/User";
import AdminOrganization from "../Admin/Organization/Organization";
import AuthorizedUserOutlet from "@/outlets/AuthorizedUserOutlet";
import ServiceEdit from "../Process/components/Service/ServiceEdit/ServiceEdit";
import ManufacturingProcessOutlet from "@/outlets/ManufacturingProcessOutlet";
import ServiceModeling from "../Process/components/Service/ServiceEdit/Modelling/Modelling";
import { Header } from "@/components/Header";
import { createContext, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "../Error/Error";
import { Home } from "../Home/Home";
import { Test } from "../Test/Test";
import { OrganizationOutlet } from "@/outlets/OrganizationOutlet";
import { ToastContainer } from "react-toastify";
import { ContentBox } from "@component-library/index";
import { Background, Breadcrumb } from "@/components/index";
import { AdminOutlet } from "@/outlets/AdminOutlet";
import { DefinedProcessOutlet } from "@/outlets/DefinedProcessOutlet";
import { ManufacturingModels } from "../Process/components/Service/ServiceEdit/Manufacturing/Model/Model";
import { ManufacturingMaterials } from "../Process/components/Service/ServiceEdit/Manufacturing/Material/Material";
import { ManufacturingPostProcessings } from "../Process/components/Service/ServiceEdit/Manufacturing/PostProcessing/PostProcessing";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";
import AdminProjects from "../Admin/Projects/Projects";

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

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setAppState: setState,
      }}
    >
      <div
        className={`flex min-h-screen flex-col items-center justify-center font-ptsans text-base`}
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
                <Route
                  path=":processID/*"
                  element={
                    <ProcessOutlet>
                      <ProcessPage />
                    </ProcessOutlet>
                  }
                >
                  <Route path="service/*" element={<DefinedProcessOutlet />}>
                    <Route index element={<ServiceEdit />} />
                    <Route
                      path="manufacturing/*"
                      element={<ManufacturingProcessOutlet />}
                    >
                      <Route index element={<Navigate to="model" />} />
                      <Route path="model" element={<ManufacturingModels />} />
                      <Route
                        path="material"
                        element={<ManufacturingMaterials />}
                      />
                      <Route
                        path="postprocessing"
                        element={<ManufacturingPostProcessings />}
                      />
                      <Route path="*" element={<Error />} />
                    </Route>
                    <Route path="modeling/*" element={<ServiceModeling />} />
                    <Route path="*" element={<Navigate to="." />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route element={<AuthorizedUserOutlet />}>
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
                    <OrganizationOutlet />
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
              <Route element={<AdminOutlet />}>
                <Route
                  path="admin/*"
                  element={
                    <ContentBox>
                      <Routes>
                        <Route index element={<Admin />} />
                        <Route path="user" element={<AdminUser />} />
                        <Route
                          path="organization"
                          element={<AdminOrganization />}
                        />
                        <Route path="projects/*" element={<AdminProjects />} />
                      </Routes>
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
        <CkBanner />
        <Menu />
        {/* <ToTopButton /> */}
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
