import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Menu from "./Navigation/Navigation";
import "./AuthorizedHome.scss";
import Dashboard from "./Dashboard/Dashboard";
import { Error } from "../Error/Error";
import Orders from "./Orders/Orders";
import { ProcessView } from "../Process/ProcessView";
import Navigation from "./Navigation/Navigation";
import {
  AuthTokenType,
  Order,
  Process,
  UserInfoType,
} from "../../interface/Interface";
import { UserType } from "../../interface/types";
import Account from "./Account/Account";
import { Fab } from "@mui/material";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

interface Props {
  authToken: AuthTokenType;
  userType: UserType;
  processList: Process[];
  setProcessList(processList: Process[]): void;
}

interface State {
  orderList: Order[];
  messages: string[];
}

const AuthorizedHome = ({
  processList,
  authToken,
  userType,
  setProcessList,
}: Props) => {
  const [state, setState] = useState<State>({
    orderList: [],
    messages: [],
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="authorized-home">
      <Navigation userType={userType} />
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
          <Route
            path="orders"
            element={<Orders orderList={state.orderList} />}
          />
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
