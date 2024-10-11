import { Container } from "@component-library/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/Dashboard";
import AdminUser from "./User/User";
import AdminOrganization from "./Organization/Organization";
import AdminProjects from "./Projects/Projects";
import AdminProject from "./Projects/Project";
import AdminResources from "./Resources/Resources";
import ResourcesNodeForm from "@/components/Resources/NodeForm";
import ResourcesNodeView from "@/components/Resources/NodeView";

interface AdminProps {}

const Admin: React.FC<AdminProps> = (props) => {
  const {} = props;

  return (
    <Container
      width="full"
      direction="row"
      align="start"
      justify="center"
      className="bg-white p-5"
    >
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="user" element={<AdminUser />} />
        <Route path="organization" element={<AdminOrganization />} />
        <Route path="projects/*">
          <Route index element={<AdminProjects />} />
          <Route path=":projectID" element={<AdminProject />} />
        </Route>
        <Route path="resources/*">
          <Route index element={<AdminResources />} />
          <Route path="create" element={<ResourcesNodeForm type="create" />} />
          <Route path=":nodeID">
            <Route index element={<ResourcesNodeView />} />
            <Route path="edit" element={<ResourcesNodeForm type="edit" />} />
          </Route>
        </Route>
      </Routes>
    </Container>
  );
};

export default Admin;
