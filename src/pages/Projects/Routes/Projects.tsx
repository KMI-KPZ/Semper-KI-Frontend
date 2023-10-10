import { UserProps } from "@/hooks/useUser/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import ProjectContextProvider from "../context/ProjectContext";
import Projects from "../Project";
import Project from "../Project/Project";
import { UserOutlet } from "@/pages/Outlets/Outlet";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import ProjectContractorSelection from "../Project/ContractorSelection/ContractorSelection";
import ProjectCheckout from "../Project/Checkout/Checkout";
import ProcessVerification from "../Project/Verification/Verification";

interface ProjectsRoutesProps {
  user: UserProps | undefined;
}

const ProjectsRoutes: React.FC<ProjectsRoutesProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Routes>
      <Route index element={<Projects user={user} />} />
      <Route path=":projectID/*" element={<ProjectContextProvider />}>
        <Route index element={<Project user={user} />} />
        <Route element={<UserOutlet user={user} />}>
          <Route
            path="contractorSelection"
            element={
              <PermissionGate element={"ProjectContractorSelection"}>
                <ProjectContractorSelection />
              </PermissionGate>
            }
          />
          <Route
            path="checkout"
            element={
              <PermissionGate element={"ProjectCheckout"}>
                <ProjectCheckout />
              </PermissionGate>
            }
          />
          <Route
            path="verification"
            element={
              <PermissionGate element={"ProjectVerification"}>
                <ProcessVerification />
              </PermissionGate>
            }
          />
        </Route>
        <Route path=":processID/*">
          <Route index element={<Project user={user} />} />
          <Route element={<UserOutlet user={user} />}>
            <Route
              path="checkout"
              element={
                <PermissionGate element={"ProcessCheckout"}>
                  <ProjectCheckout />
                </PermissionGate>
              }
            />
            <Route
              path="verification"
              element={
                <PermissionGate element={"ProcessVerification"}>
                  <ProcessVerification />
                </PermissionGate>
              }
            />
            <Route
              path="contractorSelection"
              element={
                <PermissionGate element={"ProcessContractorSelection"}>
                  <ProjectContractorSelection />
                </PermissionGate>
              }
            />
          </Route>
          <Route path="service">
            <Route
              index
              element={<div className="">Project Process Service</div>}
            />
            <Route path="manufacturing" element={<div>manufacturing</div>} />
            <Route path="modelling" element={<div>Modelling</div>} />
            <Route path="*" element={<Navigate to="." />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default ProjectsRoutes;
