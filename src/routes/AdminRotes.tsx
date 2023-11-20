import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import useAdmin from "@/pages/Admin/hooks/useAdmin";
import Admin from "@/pages/Admin/Admin";
import AdminUser from "@/pages/Admin/User/User";
import AdminOrganization from "@/pages/Admin/Organization/Organization";
import AdminProjects from "@/pages/Admin/Projects";
import Project from "@/pages/Projects/Project/Project";
import Service from "@/pages/Service/Service";
import { AuthorizedUserContext } from "@/routeOutlets/AuthorizedUserOutlet";
interface AdminRoutesProps {}

const AdminRoutes: React.FC<AdminRoutesProps> = (props) => {
  const {} = props;
  const { user } = useContext(AuthorizedUserContext);
  const { t } = useTranslation();

  const { adminQuery, adminProjectsQuery } = useAdmin();

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
        path="projects"
        element={<AdminProjects projects={adminProjectsQuery.data} />}
      />
      <Route path="projects/:projectID/*" element={<Project />} />
      <Route
        path="projects/:projectID/suborder/:processID/*"
        element={<Service />}
      />
    </Routes>
  );
};

export default AdminRoutes;
