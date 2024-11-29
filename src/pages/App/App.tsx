import "react-toastify/dist/ReactToastify.css";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import Organization from "../Organization/Organization";
import Portfolio from "../Portfolio/Portfolio";
import Resources from "../Resources/Resources";
import Legal from "../Legal/Legal";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import CookieBanner from "@/components/CookieBanner/CookieBanner";
import RegisterOrganization from "../RegisterOrganization/RegisterOrganization";
import EmailVerification from "../EmailVerification/EmailVerification";
import ResKriVer from "../ResKriVer/ResKriVer";
import RedirectLogin from "../Login/RedirectLogin";
import Menu from "@/components/Menu/Menu";
import Advantages from "../Advantages/Advantages";
import Chatbot from "@/components/Chatbot/Chatbot";
import Profile from "../Profile/Proflle";
import Projects from "../Projects/Projects";
import ProjectOutlet from "@/outlets/ProjectOutlet";
import ProjectPage from "../Project/ProjectPage";
import ProcessOutlet from "@/outlets/ProcessOutlet";
import ProcessPage from "../Process/ProcessPage";
import Admin from "../Admin/Admin";
import AuthorizedUserOutlet from "@/outlets/AuthorizedUserOutlet";
import ServiceEdit from "../Process/components/Service/ServiceEdit/ServiceEdit";
import ManufacturingProcessOutlet from "@/outlets/ManufacturingProcessOutlet";
import ServiceModeling from "../Process/components/Service/ServiceEdit/Modelling/Modelling";
import { Header } from "@/components/Header/Header";
import { createContext, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Error } from "../Error/Error";
import { Home } from "../Home/Home";
import { Test } from "../Test/Test";
import { ToastContainer } from "react-toastify";
import { ContentBox } from "@component-library/index";
import { Background, Breadcrumb } from "@/components/index";
import { AdminOutlet } from "@/outlets/AdminOutlet";
import { DefinedProcessOutlet } from "@/outlets/DefinedProcessOutlet";
import { ManufacturingModels } from "../Process/components/Service/ServiceEdit/Manufacturing/Model/Model";
import { ManufacturingMaterials } from "../Process/components/Service/ServiceEdit/Manufacturing/Material/Material";
import { ManufacturingPostProcessings } from "../Process/components/Service/ServiceEdit/Manufacturing/PostProcessing/PostProcessing";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";
import useUser, { UserType } from "@/hooks/useUser";
import Footer from "@/components/Footer/Footer";
import UITest from "../Test/UITest";
import DescriptiveModelForm from "@/components/Form/DescriptiveModelForm";

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
  const { user } = useUser();

  return (
    <AppContext.Provider
      value={{
        appState: state,
        setAppState: setState,
      }}
    >
      <div
        className={`flex min-h-screen flex-col items-center justify-center font-ptsans text-base text-black`}
        data-testid="app"
        id="app"
      >
        <Header />
        <main className="flex h-full w-full flex-grow flex-col items-center justify-start">
          <Breadcrumb />
          <Routes data-testid="routes">
            <Route
              index
              element={
                user.usertype === UserType.ADMIN ? (
                  <Navigate to="admin" />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              element={
                <ContentBox>
                  <Outlet />
                </ContentBox>
              }
            >
              <Route
                path="advantages/user"
                element={<Advantages type="user" />}
              />
              <Route
                path="advantages/organization"
                element={<Advantages type="organization" />}
              />
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
              <Route path="projects/*">
                <Route index element={<Projects />} />
                <Route path=":projectID/*" element={<ProjectOutlet />}>
                  <Route index element={<ProjectPage />} />
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
                        <Route path="model">
                          <Route index element={<ManufacturingModels />} />
                          <Route
                            path="descriptive"
                            element={<DescriptiveModelForm />}
                          />
                        </Route>
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
                <Route path="test" element={<Test />} />
                <Route path="ui" element={<UITest />} />
                <Route path="account" element={<Profile />} />
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
                      children={<Resources />}
                      element="Resources"
                      showMessage
                    />
                  }
                />
                <Route element={<AdminOutlet />}>
                  <Route path="admin/*" element={<Admin />} />
                </Route>
              </Route>
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </main>
        <CookieBanner />
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
