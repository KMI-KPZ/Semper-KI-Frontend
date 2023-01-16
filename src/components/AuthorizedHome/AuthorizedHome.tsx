import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./AuthorizedHome.scss";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";
import { IAuthToken, IOrder, IProcess, IUser } from "../../interface/Interface";
import { TUserType } from "../../interface/types";
import Account from "./Account/Account";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import { Error } from "../Error/Error";

interface Props {
  authToken: IAuthToken;
  userType: TUserType;
  processList: IProcess[];
  orderList: IOrder[];
  setProcessList(processList: IProcess[]): void;
}

const AuthorizedHome = ({
  processList,
  orderList,
  authToken,
  userType,
  setProcessList,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="authorized-home">
      <section className="authorized-home-container">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route
            path="shoppingcart"
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
          <Route path="account" element={<Account authToken={authToken} />} />
        </Routes>
      </section>
    </div>
  );
};

export default AuthorizedHome;
