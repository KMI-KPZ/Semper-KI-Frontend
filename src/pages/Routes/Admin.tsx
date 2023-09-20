import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import useAdmin from "../Admin/hooks/useAdmin";
import Admin from "../Admin/Admin";
import AdminUser from "../Admin/User/User";
import AdminOrganization from "../Admin/Organization/Organization";
import AdminOrders from "../Admin/Orders";
import Order from "../Order/Order";
import { UserProps } from "@/hooks/useUser/types";
import Service from "../Service/Service";
interface AdminRoutesProps {
  user: UserProps | undefined;
}

const AdminRoutes: React.FC<AdminRoutesProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  const { adminQuery, adminOrdersQuery } = useAdmin();

  return (
    <Routes>
      <Route index element={<Admin />} />
      <Route
        path="user"
        element={<AdminUser users={adminQuery.data?.user} />}
      />
      <Route
        path="organization"
        element={
          <AdminOrganization organizations={adminQuery.data?.organizations} />
        }
      />
      <Route
        path="orders"
        element={<AdminOrders orders={adminOrdersQuery.data} />}
      />
      <Route path="orders/:orderID/*" element={<Order user={user} />} />
      <Route
        path="orders/:orderID/suborder/:subOrderID/*"
        element={<Service />}
      />
    </Routes>
  );
};

export default AdminRoutes;
