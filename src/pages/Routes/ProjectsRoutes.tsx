import { UserProps } from "@/hooks/useUser/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import ProjectContextProvider from "../Projects/context/ProjectContext";
import Projects from "../Projects/Projects";
import Project from "../Projects/Project/Project";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import ProjectContractorSelection from "../Projects/Project/ContractorSelection/ContractorSelection";
import ProjectCheckout from "../Projects/Project/Checkout/Checkout";
import ProcessVerification from "../Projects/Project/Verification/Verification";
import ServiceRoutes from "./ServiceRoutes";
import { UserOutlet } from "../Outlets/UserOutlet";
import ProcessContextProvider from "../Projects/context/ProcessContext";

interface ProjectsRoutesProps {
  user: UserProps | undefined;
}

const ProjectsRoutes: React.FC<ProjectsRoutesProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Routes>
      <Route
        index
        element={
          <PermissionGate element="Projects">
            <Projects user={user} />
          </PermissionGate>
        }
      />
      <Route path=":projectID/*" element={<ProjectContextProvider />}>
        <Route
          index
          element={
            <PermissionGate element="Projects">
              <Project user={user} />
            </PermissionGate>
          }
        />
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
        <Route path=":processID/*" element={<ProcessContextProvider />}>
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
          <Route path="service/*" element={<ServiceRoutes />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ProjectsRoutes;
