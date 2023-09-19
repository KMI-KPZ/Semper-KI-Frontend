import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import useAdmin from "../Admin/hooks/useAdmin";
import Admin from "../Admin/Admin";
import AdminUser from "../Admin/User/User";
import AdminOrganization from "../Admin/Organization/Organization";
import AdminOrders from "../Admin/Orders";
interface AdminRoutesProps {}

const AdminRoutes: React.FC<AdminRoutesProps> = (props) => {
  const {} = props;
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
    </Routes>
  );
};

export default AdminRoutes;
