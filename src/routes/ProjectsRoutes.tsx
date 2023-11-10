import { UserProps } from "@/hooks/useUser";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import AuthorizedUserOutlet from "@/outlets/AuthorizedUserOutlet";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Projects from "@/pages/Projects/Projects";
import ProjectContextProvider from "@/pages/Projects/context/ProjectContext";
import Project from "@/pages/Projects/Project/Project";
import ProjectContractorSelection from "@/pages/Projects/Project/ContractorSelection/ContractorSelection";
import ProjectCheckout from "@/pages/Projects/Project/Checkout/Checkout";
import ProcessVerification from "@/pages/Projects/Project/Verification/Verification";
import ProcessContextProvider from "@/pages/Projects/context/ProcessContext";
import ServiceRoutes from "./ServiceRoutes";

interface ProjectsRoutesProps {}

const ProjectsRoutes: React.FC<ProjectsRoutesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Routes>
      <Route
        index
        element={
          <PermissionGate element="Projects">
            <Projects />
          </PermissionGate>
        }
      />
      <Route path=":projectID/*" element={<ProjectContextProvider />}>
        <Route
          index
          element={
            <PermissionGate element="Projects">
              <Project />
            </PermissionGate>
          }
        />
        <Route element={<AuthorizedUserOutlet />}>
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
          <Route element={<AuthorizedUserOutlet />}>
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
          <Route path="*" element={<Project />} />
          {/* <Route path="service/*" element={<ServiceRoutes />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default ProjectsRoutes;
