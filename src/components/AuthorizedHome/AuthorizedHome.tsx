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
import AdminUserView from "./Admin/AdminUserView";
import AdminModelView from "./Admin/AdminModelView";
import useAdmin from "../../hooks/useAdmin";
import useFilter from "../../hooks/useFilter";
import AdminMaterialView from "./Admin/AdminMaterialView";
import AdminOrderView from "./Admin/AdminOrderView";

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
  const { data, loadData } = useAdmin(user.type);

  const adminRoutes = (
    <>
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
