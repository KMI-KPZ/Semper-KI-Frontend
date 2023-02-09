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
import { IOrder, IProcess, IUser } from "../../interface/Interface";
import Account from "./Account/Account";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import { Error } from "../Error/Error";
import { EUserType } from "../../interface/enums";
import { ICardItem } from "../CardView/CardView";
import ListView from "../ListView/ListView";

interface Props {
  user: IUser;
  processList: IProcess[];
  orderList: IOrder[];
  setProcessList(processList: IProcess[]): void;
}

const AuthorizedHome = ({
  processList,
  orderList,
  user,
  setProcessList,
}: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const adminRoutes = (
    <>
      <Route path="user" element={<ListView list={[{}, {}, {}]} />} />
      <Route path="model" element={<h1>illegale geheime User daten</h1>} />
      <Route path="material" element={<h1>illegale geheime User daten</h1>} />
      <Route path="printer" element={<h1>illegale geheime User daten</h1>} />
    </>
  );

  return (
    <div className="authorized-home">
      <Routes>
        <Route index element={<Dashboard userType={user.type} />} />
        {user.type === EUserType.admin ? adminRoutes : null}
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
        <Route path="account" element={<Account user={user} />} />
      </Routes>
    </div>
  );
};

export default AuthorizedHome;
