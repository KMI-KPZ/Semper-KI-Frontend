import React, { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import useCRSFToken from "../../hooks/useCSRFToken";
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
import Account from "../Account/Account";
import useAdmin from "../../hooks/useAdmin";
import OrderOverview from "../OrderOverview/OrderOverview";
import "./../../styles.scss";
import AdminUserView from "../Admin/AdminUserView";
import AdminModelView from "../Admin/AdminModelView";
import AdminMaterialView from "../Admin/AdminMaterialView";
import AdminOrderView from "../Admin/AdminOrderView";
import Background from "../Background/Background";
import Checkout from "../AfterProcess/Checkout/Checkout";
import Order from "../AfterProcess/Order/Order";
import { EUserType } from "../../interface/enums";
import { URL_AboutUs } from "../../constants/Constants";
import ManufacturerView from "../AfterProcess/Manufacturer/ManufacturerView";
import { IUser } from "../../interface/Interface";
import LoginView from "../Login/LoginView";

export interface IAppState {
  selectedProgressItem?: { index: number; progress: string };
  stopScroll: boolean;
  guideFilter: IFilterItem[];
}

export interface IAppContext {
  user: IUser | undefined;
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
}

const initialState: IAppState = {
  stopScroll: false,
  guideFilter: [],
};

export const AppContext = createContext<IAppContext>({
  user: undefined,
  appState: initialState,
  setAppState: () => {},
});

const App: React.FC = () => {
  const [state, setState] = useState<IAppState>(initialState);
  const { stopScroll, guideFilter, selectedProgressItem } = state;
  const { CSRFToken, CSRFTokenError, CSRFTokenIsLoading } = useCRSFToken();
  const { isLoggedIn, userType, user, loadLoggedIn, isLoggedInResponse } =
    useUser();
  const { data, loadData, clearData } = useAdmin();

  const setFilter = (guideFilter: IFilterItem[]): void => {
    setState((prevState) => ({ ...prevState, guideFilter }));
  };

  useEffect(() => {
    if (CSRFToken === true) {
      loadLoggedIn();
    }
  }, [CSRFToken]);

  useEffect(() => {
    if (userType === EUserType.admin) {
      loadData();
    } else {
      clearData();
    }
  }, [userType]);

  const adminRoutes = (
    <Route element={<PrivateAdminRoutes userType={userType} />}>
      <Route path="user" element={<AdminUserView userList={data.users} />} />
      <Route
        path="model"
        element={<AdminModelView modelList={data.models} />}
      />
      <Route
        path="material"
        element={<AdminMaterialView materialList={data.materials} />}
      />
      <Route path="procedure" element={<h1>Procedure</h1>} />
      <Route path="printer" element={<h1>Printer</h1>} />
      <Route
        path="order"
        element={<AdminOrderView orderList={data.orders} />}
      />
    </Route>
  );

  const clientRoutes = (
    <Route element={<PrivateClientRoutes user={user} />}>
      <Route path="manufacturer" element={<ManufacturerView />} />
      <Route path="checkout" element={<Checkout />} />
      <Route
        path="orders"
        element={<OrderOverview userType={EUserType.client} />}
      />
      <Route path="proceedings" element={<Error text="proceedings" />} />
      <Route path="assignments" element={<Error text="assignments" />} />
    </Route>
  );

  const manufacturerRoutes = (
    <Route element={<PrivateManufacturerRoutes user={user} />}>
      <Route
        path="contracts"
        element={<OrderOverview userType={EUserType.manufacturer} />}
      />
    </Route>
  );

  const privateRoutes = (
    <Route element={<PrivateRoutes user={user} />}>
      <Route path="account" element={<Account user={user!} />} />
    </Route>
  );

  if (
    CSRFTokenIsLoading === true ||
    isLoggedInResponse === false ||
    (isLoggedIn === true && user === undefined)
  )
    return (
      <div className="flex flex-col items-center justify-center bg-white w-screen h-screen gap-5">
        <h1 className="md:text-4xl xl:text-9xl">Semper-KI</h1>
        <h2>Laden...</h2>
      </div>
    );

  return (
    <AppContext.Provider
      value={{ appState: state, setAppState: setState, user }}
    >
      <div
        className={`flex flex-col justify-between min-h-screen font-ptsans items-center gap-3
        ${stopScroll === true ? "overflow-hidden h-screen w-screen" : ""}`}
        data-testid="app"
      >
        <Header isLoggedIn={isLoggedIn} userType={userType} />
        <Breadcrumb />
        <main className="w-full max-w-[1600px] flex flex-col justify-start items-center flex-grow">
          <Routes data-testid="routes">
            <Route
              index
              element={<Home isLoggedIn={isLoggedIn} userType={userType} />}
            />
            <Route path="order" element={<Order />} />
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
            <Route path="test" element={<RequestTest />} />
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
        <Background />
      </div>
    </AppContext.Provider>
  );
};

export default App;
