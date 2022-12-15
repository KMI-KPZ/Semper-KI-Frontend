import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Menu from "../Navigation/Navigation";
import "./AuthorizedHome.scss";
import Dashboard from "./Dashboard/Dashboard";
import { Error } from "../Error/Error";
import Orders from "./Orders/Orders";
import { ProcessView } from "../Process/ProcessView";
import Navigation from "../Navigation/Navigation";
import { IAuthToken, IOrder, IProcess, IUser } from "../../interface/Interface";
import { TUserType } from "../../interface/types";
import Account from "./Account/Account";
import { Fab } from "@mui/material";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

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
      <Fab
        sx={{
          position: "absolute",
          bottom: 50,
          right: 50,
          color: "blue",
          backgroundColor: "yellow",
          "&:hover": {
            backgroundColor: "blue",
            color: "yellow",
          },
        }}
        onClick={() => navigate("/test")}
      >
        TEST
      </Fab>
    </div>
  );
};

export default AuthorizedHome;
