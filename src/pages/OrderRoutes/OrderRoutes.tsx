import { UserType } from "@/hooks/useUser/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import Order from "./Order/Order";
import OrderCheckout from "./Order/Checkout/Checkout";
import Service from "../Service/Service";
import NewOrder from "./New/NewOrder";
import NewSubOrder from "./New/NewSubOrder";

interface OrderRoutesProps {
  userType: UserType;
}

const OrderRoutes: React.FC<OrderRoutesProps> = (props) => {
  const { userType } = props;
  const { t } = useTranslation();

  return (
    <Routes>
      <Route index element={<Navigate to="/orders" />} />
      <Route path="new" element={<NewOrder />} />
      <Route path=":orderID/*">
        <Route index element={<Order userType={userType} />} />
        <Route path="checkout" element={<OrderCheckout />} />
        <Route path="subOrder">
          <Route index element={<Navigate to="../" />} />
          <Route path="new" element={<NewSubOrder />} />
          <Route path=":subOrderID/*" element={<Service />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
