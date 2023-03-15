import React, { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import useCRSFToken from "../../hooks/useCSRFToken";
import { IOrder, IProcess } from "../../interface/Interface";
import { TestOrderList } from "../../services/TestData";
import useUser from "../../hooks/useUser";
import { Home } from "../Home/Home";
import { ProcessView } from "../Process/ProcessView";
import Logout from "../Logout/Logout";
import Login from "../Login/Login";
import { Error } from "../Error/Error";
import { IFilterItem } from "../Process/Filter/Interface";
import Redirect from "../Redirect/Redirect";
import Footer from "../Footer/Footer";
import { URL_AboutUs } from "../../config/Constants";
import { EUserType } from "../../interface/enums";
import ServiceRoutes from "../Service/ServiceRoutes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import GuideRoutes from "../Guide/GuideRoutes";
import {
  PrivateAdminRoutes,
  PrivateRoutes,
} from "../PrivateRoutes/PrivateRoutes";
import Account from "../Account/Account";
import useAdmin from "../../hooks/useAdmin";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Orders from "../Orders/Orders";
import "./../../styles.scss";
import AdminUserView from "../Admin/AdminUserView";
import AdminModelView from "../Admin/AdminModelView";
import AdminMaterialView from "../Admin/AdminMaterialView";
import AdminOrderView from "../Admin/AdminOrderView";
import Background from "../Background/Background";

export interface IAppState {
  stopScroll: boolean;
  processList: IProcess[];
  orderList: IOrder[];
  guideFilter: IFilterItem[];
}

export interface IAppContext {
  state: IAppState;
  setState: React.Dispatch<React.SetStateAction<IAppState>>;
}

export const AppContext = createContext<IAppContext>({
  state: {
    stopScroll: false,
    processList: [{}],
    orderList: TestOrderList,
    guideFilter: [],
  },
  setState: () => {},
});

const initialState: IAppState = {
  stopScroll: false,
  processList: [{}],
  orderList: TestOrderList,
  guideFilter: [],
};

const App: React.FC = () => {
  const [state, setState] = useState<IAppState>(initialState);
  const { stopScroll, guideFilter, orderList, processList } = state;
  const { CSRFToken } = useCRSFToken();
  const { isLoggedIn, userType, user, loadLoggedIn } = useUser();
  const { data, loadData, clearData } = useAdmin();

  const setProcessList = (processList: IProcess[]): void => {
    setState((prevState) => ({ ...prevState, processList }));
  };

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

  const privateRoutes = (
    <Route element={<PrivateRoutes user={user} />}>
      <Route
        path="cart"
        element={
          <ShoppingCart
            processList={processList}
            setProcessList={setProcessList}
          />
        }
      />
      <Route path="orders" element={<Orders orderList={orderList} />} />
      <Route path="proceedings" element={<Error text="proceedings" />} />
      <Route path="assignments" element={<Error text="assignments" />} />
      <Route path="messages" element={<Error text="messages" />} />
      <Route
        path="account"
        element={
          user === undefined ? <Navigate to="/" /> : <Account user={user} />
        }
      />
      {adminRoutes}
    </Route>
  );

  return (
    <AppContext.Provider value={{ state, setState }}>
      <div
        className={`flex flex-col gap-5 justify-between min-h-screen font-ptsans  
        ${stopScroll === true ? "overflow-hidden h-screen w-screen" : ""}`}
        data-testid="app"
      >
        <Header isLoggedIn={isLoggedIn} userType={userType} />
        <Breadcrumb />
        <main className="w-full flex flex-col justify-start items-center flex-grow">
          <Routes data-testid="routes">
            <Route
              index
              element={<Home isLoggedIn={isLoggedIn} userType={userType} />}
            />
            <Route
              path="process/*"
              element={<ProcessView guideAnswers={guideFilter} />}
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
            <Route path="login" element={<Login userType={userType} />} />
            <Route
              path="aboutus"
              element={<Redirect link={URL_AboutUs} extern />}
            />
            <Route path="service/*" element={<ServiceRoutes />} />
            <Route path="*" element={<Error />} />
            {privateRoutes}
          </Routes>
        </main>
        <Footer />
        <Background />
      </div>
    </AppContext.Provider>
  );
};

export default App;
