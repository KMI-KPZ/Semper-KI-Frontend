import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import useAdmin from "../Admin/hooks/useAdmin";
import Admin from "../Admin/Admin";
import AdminUser from "../Admin/User/User";
import AdminOrganization from "../Admin/Organization/Organization";
import AdminProjects from "../Admin/Projects";
import { UserProps } from "@/hooks/useUser/types";
import Service from "../Service/Service";
import Project from "../Projects/Project/Project";
interface AdminRoutesProps {
  user: UserProps | undefined;
}

const AdminRoutes: React.FC<AdminRoutesProps> = (props) => {
  const { user } = props;
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
      <Route path="projects/:projectID/*" element={<Project user={user} />} />
      <Route
        path="projects/:projectID/subproject/:processID/*"
        element={<Service />}
      />
    </Routes>
  );
};

export default AdminRoutes;
