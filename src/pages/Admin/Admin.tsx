import { Container } from "@component-library/index";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/Dashboard";
import AdminUser from "./User/User";
import AdminOrganization from "./Organization/Organization";
import AdminProjects from "./Projects/Projects";
import AdminProject from "./Projects/Project";
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
      </Routes>
      {/* </Container> */}
    </Container>
  );
};

export default Admin;
