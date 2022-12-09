import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { User } from "../../interface/Interface";
import Menu from "./Navigation/Navigation";
import "./AuthorizedHome.scss";
import Dashboard from "./Dashboard/Dashboard";
import { Error } from "../Error/Error";
import Orders from "./Orders/Orders";
import { ProcessView } from "../Process/ProcessView";
import Navigation from "./Navigation/Navigation";

interface Props {
  user: User;
}

const AuthorizedHome = ({ user }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="authorized-home">
      <Navigation user={user} />
      <section className="authorized-home-container">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="shoppingcart" element={<Error text="shoppingcart" />} />
          <Route path="orders" element={<Orders />} />
          <Route path="proceedings" element={<Error text="proceedings" />} />
          <Route path="assignments" element={<Error text="assignments" />} />
          <Route path="messages" element={<Error text="messages" />} />
          <Route path="account" element={<Error text="account" />} />
          <Route path="process/*" element={<ProcessView />} />
        </Routes>
      </section>
    </div>
  );
};

export default AuthorizedHome;
