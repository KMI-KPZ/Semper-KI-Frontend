import { Container } from "@component-library/index";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/Dashboard";
import AdminUser from "./User/User";
import AdminOrganization from "./Organization/Organization";
import AdminProjects from "./Projects/Projects";
import AdminProject from "./Projects/Project";
import AdminResources from "./Resources/Resources";
import ResourcesNodeForm from "@/components/Resources/NodeForm";
import ResourcesNodeView from "@/components/Resources/NodeView";
import AdminResourcesOverView from "./Resources/OverView";
import OrgaGraph from "../Resources/components/OrgaGraph";
import ProjectOutlet from "@/outlets/ProjectOutlet";
import ProjectPage from "../Project/ProjectPage";
import ProcessOutlet from "@/outlets/ProcessOutlet";
import ProcessPage from "../Process/ProcessPage";
import { DefinedProcessOutlet } from "@/outlets/DefinedProcessOutlet";
import ServiceEdit from "../Process/components/Service/ServiceEdit/ServiceEdit";
import ManufacturingProcessOutlet from "@/outlets/ManufacturingProcessOutlet";
import { ManufacturingModels } from "../Process/components/Service/ServiceEdit/Manufacturing/Model/Model";
import { ManufacturingMaterials } from "../Process/components/Service/ServiceEdit/Manufacturing/Material/Material";
import { ManufacturingPostProcessings } from "../Process/components/Service/ServiceEdit/Manufacturing/PostProcessing/PostProcessing";
import { Error } from "../Error/Error";
import ServiceModeling from "../Process/components/Service/ServiceEdit/Modelling/Modelling";

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
        {/* <Route path="projects/*">
          <Route index element={<AdminProjects />} />
          <Route path=":projectID" element={<AdminProject />} />
        </Route> */}
        <Route path="projects/*">
          <Route index element={<AdminProjects />} />
          <Route path=":projectID/*" element={<ProjectOutlet />}>
            <Route index element={<ProjectPage />} />
            <Route
              path=":processID/*"
              element={
                <ProcessOutlet>
                  <ProcessPage />
                </ProcessOutlet>
              }
            >
              <Route path="service/*" element={<DefinedProcessOutlet />}>
                <Route index element={<ServiceEdit />} />
                <Route
                  path="manufacturing/*"
                  element={<ManufacturingProcessOutlet />}
                >
                  <Route index element={<Navigate to="model" />} />
                  <Route path="model" element={<ManufacturingModels />} />
                  <Route path="material" element={<ManufacturingMaterials />} />
                  <Route
                    path="postprocessing"
                    element={<ManufacturingPostProcessings />}
                  />
                  <Route path="*" element={<Error />} />
                </Route>
                <Route path="modeling/*" element={<ServiceModeling />} />
                <Route path="*" element={<Navigate to="." />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="resources/*">
          <Route index element={<AdminResourcesOverView />} />
          <Route path="graph" element={<OrgaGraph />} />
          <Route path=":nodeType">
            <Route index element={<AdminResources />} />
            <Route
              path="create"
              element={<ResourcesNodeForm type="create" />}
            />
            <Route path=":nodeID">
              <Route
                index
                element={
                  <>
                    <AdminResources />
                    <ResourcesNodeView />
                  </>
                }
              />
              <Route path="edit" element={<ResourcesNodeForm type="edit" />} />
            </Route>
          </Route>
          {/* <Route index element={<AdminResources />} />
          <Route path="create" element={<ResourcesNodeForm type="create" />} />
          <Route path=":nodeID">
            <Route index element={<ResourcesNodeView />} />
            <Route path="edit" element={<ResourcesNodeForm type="edit" />} />
          </Route> */}
        </Route>
      </Routes>
    </Container>
  );
};

export default Admin;
