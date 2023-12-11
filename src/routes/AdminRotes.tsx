import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "@/pages/Admin/Admin";
import AdminUser from "@/pages/Admin/User/User";
import AdminOrganization from "@/pages/Admin/Organization/Organization";
import AdminProjects from "@/pages/Admin/Projects";
import Project from "@/pages/Projects/Project/Project";
import Service from "@/pages/Service/Service";
interface AdminRoutesProps {}

const AdminRoutes: React.FC<AdminRoutesProps> = (props) => {
  const {} = props;

  return (
    <Routes>
      <Route index element={<Admin />} />
      <Route path="user" element={<AdminUser />} />
      <Route path="organization" element={<AdminOrganization />} />
      <Route path="projects" element={<AdminProjects />} />
      <Route path="projects/:projectID/*" element={<Project />} />
      <Route
        path="projects/:projectID/suborder/:processID/*"
        element={<Service />}
      />
    </Routes>
  );
};

export default AdminRoutes;
