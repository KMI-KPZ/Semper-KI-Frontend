import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import AdminOverview from "./Overview/Overview";
import AdminUser from "./User/User";
import useAdmin from "./hooks/useAdmin";
import AdminOrganization from "./Organization/Organization";

interface AdminRoutesProps {}

const AdminRoutes: React.FC<AdminRoutesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const { adminQuery } = useAdmin();

  return (
    <Routes>
      <Route index element={<AdminOverview />} />
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
    </Routes>
  );
};

export default AdminRoutes;
