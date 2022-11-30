import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { User } from "../../interface/Interface";
import Menu from "./Navigation/Navigation";
import "./AuthorizedHome.scss";
import Dashboard from "./Dashboard/Dashboard";
import { Error } from "../Error/Error";

interface Props {
  user: User;
}

const AuthorizedHome = ({ user }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="authorized-home">
      <Menu user={user} />
      <section className="authorized-home-container">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="shoppingcart" element={<Error text="shoppingcart" />} />
          <Route path="orders" element={<Error text="orders" />} />
          <Route path="proceedings" element={<Error text="proceedings" />} />
          <Route path="assignments" element={<Error text="assignments" />} />
          <Route path="messages" element={<Error text="messages" />} />
          <Route path="account" element={<Error text="account" />} />
        </Routes>
      </section>
    </div>
  );
};

export default AuthorizedHome;
