import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import Projects from "@/pages/Projects/Projects";
import ProjectContextProvider from "@/pages/Projects/context/ProjectContext";
import Project from "@/pages/Projects/Project/Project";
import ProjectContractorSelection from "@/pages/Projects/Project/ContractorSelection/ContractorSelection";
import ProjectCheckout from "@/pages/Projects/Project/Checkout/Checkout";
import ProcessVerification from "@/pages/Projects/Project/Verification/Verification";
import ProcessContextProvider from "@/pages/Projects/context/ProcessContext";
import { Error } from "@/pages/Error/Error";
import ServiceRoutes from "./ServiceRoutes";
import AuthorizedUserRouteOutlet from "@/routeOutlets/AuthorizedUserOutlet";
import ProcessHistory from "@/pages/Projects/Project/Process/History/History";
import ProcessChat from "@/pages/Projects/Project/Process/Chat/Chat";
import Redirect from "@/pages/Redirect/Redirect";

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
        <Route element={<AuthorizedUserRouteOutlet />}>
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
          <Route index element={<Project />} />
          <Route element={<AuthorizedUserRouteOutlet />}>
            <Route
              path="history"
              element={
                <>
                  <Project />
                  <ProcessHistory />
                </>
              }
            />
            <Route
              path="chat"
              element={
                <>
                  <Project />
                  <ProcessChat />
                </>
              }
            />
            <Route path="checkout" element={<Navigate to="../../checkout" />} />
            <Route
              path="verification"
              element={<Navigate to="../../verification" />}
            />
            <Route
              path="contractorSelection"
              element={<Navigate to="../../contractorSelection" />}
            />
          </Route>
          <Route
            path="service/*"
            element={
              <>
                <Project />
                <ServiceRoutes />
              </>
            }
          />
          <Route path="*" element={<Error text="process" />} />
        </Route>
        <Route path="*" element={<Error text="project" />} />
      </Route>
      <Route path="*" element={<Error text="projects" />} />
    </Routes>
  );
};

export default ProjectsRoutes;
