import React, { createContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RequestTest } from "../../RequestTest/RequestTest";
import { Header } from "../Header/Header";
import useCRSFToken from "../../hooks/useCSRFToken";
import { IOrder, IProcessItem } from "../../interface/Interface";
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
import Blog from "../Blog/Blog";
import useCart from "../../hooks/useCart";

export interface IAppState {
  cart: IProcessItem[];
  stopScroll: boolean;
  blogOpen: boolean;
  processList: IProcessItem[];
  orderList: IOrder[];
  guideFilter: IFilterItem[];
}

export interface IAppContext {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
}

export const AppContext = createContext<IAppContext>({
  appState: {
    stopScroll: false,
    blogOpen: false,
    cart: [],
    processList: [{}],
    orderList: [],
    guideFilter: [],
  },
  setAppState: () => {},
});

const initialState: IAppState = {
  stopScroll: false,
  blogOpen: false,
  cart: [],
  processList: [{}],
  orderList: [],
  guideFilter: [],
};

const App: React.FC = () => {
  const [state, setState] = useState<IAppState>(initialState);
  const { stopScroll, blogOpen, guideFilter, orderList, processList } = state;
  const { CSRFToken } = useCRSFToken();
  const { isLoggedIn, userType, user, loadLoggedIn, isLoggedInResponse } =
    useUser();
  const { data, loadData, clearData } = useAdmin();
  const { pathname } = useLocation();
  const { cart, loadCart } = useCart();

  const setProcessList = (processList: IProcessItem[]): void => {
    setState((prevState) => ({ ...prevState, processList }));
  };

  const setFilter = (guideFilter: IFilterItem[]): void => {
    setState((prevState) => ({ ...prevState, guideFilter }));
  };

  const openBlog = () => {
    setState((prevState) => ({
      ...prevState,
      blogOpen: true,
      stopScroll: true,
    }));
  };

  const closeBlog = () => {
    setState((prevState) => ({
      ...prevState,
      blogOpen: false,
      stopScroll: false,
    }));
  };

  useEffect(() => {
    if (CSRFToken === true) {
      loadLoggedIn();
    }
  }, [CSRFToken]);

  useEffect(() => {
    if (isLoggedInResponse === true) {
      loadCart();
    }
  }, [isLoggedInResponse]);

  useEffect(() => {
    if (userType === EUserType.admin) {
      loadData();
    } else {
      clearData();
    }
  }, [userType]);

  useEffect(() => {
    if (blogOpen === true && pathname === "/blog") closeBlog();
  }, [pathname]);

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
    <AppContext.Provider value={{ appState: state, setAppState: setState }}>
      <div
        className={`flex flex-col justify-between min-h-screen font-ptsans items-center
        ${stopScroll === true ? "overflow-hidden h-screen w-screen" : ""}
        ${blogOpen === true ? "" : "gap-5"}`}
        data-testid="app"
      >
        <Header
          isLoggedIn={isLoggedIn}
          userType={userType}
          closeBlog={closeBlog}
        />
        {blogOpen === false ? <Breadcrumb /> : null}
        <main className="w-full max-w-[1600px] flex flex-col justify-start items-center flex-grow">
          <Routes data-testid="routes">
            <Route
              index
              element={<Home isLoggedIn={isLoggedIn} userType={userType} />}
            />
            <Route
              path="cart"
              element={
                <ShoppingCart
                  loadCart={loadCart}
                  processList={cart}
                  setProcessList={setProcessList}
                />
              }
            />
            <Route path="blog" element={<Blog openBlog={openBlog} />} />
            <Route
              path="process/*"
              element={<ProcessView cart={cart} guideAnswers={guideFilter} />}
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
