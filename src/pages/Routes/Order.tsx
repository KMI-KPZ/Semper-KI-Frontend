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
import { UserOutlet } from "../Outlets/Outlet";

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
          <Route element={<UserOutlet user={user} />}>
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
              path=":subOrderID/contractorSelection"
              element={
                <PermissionGate element={"SubOrderContractorSelection"}>
                  <SubOrderManufacturerSelection />
                </PermissionGate>
              }
            />
          </Route>
          <Route path=":subOrderID/*" element={<Service />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
