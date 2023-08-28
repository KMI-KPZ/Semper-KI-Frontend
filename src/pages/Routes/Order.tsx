import { UserProps, UserType } from "@/hooks/useUser/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import Order from "../Order/Order";
import Service from "../Service/Service";
import SubOrderVerification from "../Order/SubOrder/Verification/Verification";
import SubOrder from "../Order/SubOrder/SubOrder";
import SubOrderManufacturerSelection from "../Order/SubOrder/ManufacturerSelection/ManufacturerSelection";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import SubOrderCheckout from "../Order/SubOrder/Checkout/Checkout";

interface OrderRoutesProps {
  user: UserProps | undefined;
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
          <Route
            path=":subOrderID/checkout"
            element={
              <PermissionGate element={"SubOrderCheckout"}>
                <SubOrderCheckout />
              </PermissionGate>
            }
          />
          <Route
            path=":subOrderID/verification"
            element={
              <PermissionGate element={"SubOrderVerification"}>
                <SubOrderVerification />
              </PermissionGate>
            }
          />
          <Route
            path=":subOrderID/manufacturerSelection"
            element={
              <PermissionGate element={"SubOrderManufacturerSelection"}>
                <SubOrderManufacturerSelection />
              </PermissionGate>
            }
          />
          <Route path=":subOrderID/*" element={<Service />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
