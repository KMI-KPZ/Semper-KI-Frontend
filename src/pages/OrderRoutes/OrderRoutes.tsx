import { User, UserType } from "@/hooks/useUser/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import Order from "./Order/Order";
import Service from "./Service/Service";
import SubOrderCheckout from "./Order/SubOrder/Verification/Verification";
import SubOrder from "./Order/SubOrder/SubOrder";
import SubOrderManufacturerSelection from "./Order/SubOrder/ManufacturerSelection/ManufacturerSelection";

interface OrderRoutesProps {
  user: User | undefined;
}

const OrderRoutes: React.FC<OrderRoutesProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Routes>
      <Route index element={<Navigate to="/orders" />} />
      <Route path=":orderID/*">
        <Route index element={<Order user={user} />} />
        <Route path="suborder">
          <Route index element={<Navigate to="../" />} />
          <Route path=":subOrderID/checkout" element={<SubOrderCheckout />} />
          <Route
            path=":subOrderID/verification"
            element={<SubOrderCheckout />}
          />
          <Route
            path=":subOrderID/manufacturerSelection"
            element={<SubOrderManufacturerSelection />}
          />
          <Route path=":subOrderID/*" element={<Service />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
