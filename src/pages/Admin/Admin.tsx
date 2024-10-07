import { Container } from "@component-library/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/Dashboard";
import AdminUser from "./User/User";
import AdminOrganization from "./Organization/Organization";
import AdminProjects from "./Projects/Projects";
import AdminProject from "./Projects/Project";
import AdminResources from "./Resources/Resources";
import RequestInformation from "../Resources/RequestInformation/RequestInformation";
import RequestInformationForm from "../Resources/RequestInformation/RequestInformationForm";
import AdminResourcesNode from "./Resources/Node";
import AdminResourcesNodeView from "./Resources/NodeView";
// import AdminMenu from "./Menu/Menu";

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
      {/* <AdminMenu /> */}
      {/* <Container
        width="full"
        direction="col"
        className=" grow bg-white p-5"
        justify="start"
      > */}
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
          <Route path="request">
            <Route index element={<RequestInformation />} />
            <Route path="new" element={<RequestInformationForm />} />
          </Route>
          <Route path=":nodeID">
            <Route
              index
              element={
                <>
                  <AdminResources />
                  <AdminResourcesNodeView />
                </>
              }
            />
            <Route path="edit" element={<AdminResourcesNode type="edit" />} />
          </Route>
        </Route>
      </Routes>
      {/* </Container> */}
    </Container>
  );
};

export default Admin;
