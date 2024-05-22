import PermissionGate from "@/components/PermissionGate/PermissionGate";
import ProcessContextProvider from "@/contexts/ProcessContext";
import ProjectContextProvider from "@/contexts/ProjectContext";
import ProcessChat from "@/pages/Process/Chat/Chat";
import ProcessHistory from "@/pages/Process/History/History";
import ProjectCheckout from "@/pages/Project/Checkout/Checkout";
import ProjectContractorSelection from "@/pages/Project/ContractorSelection/ContractorSelection";
import ProjectPage from "@/pages/Project/Project";
import ProcessVerification from "@/pages/Project/Verification/Verification";
import Projects from "@/pages/Projects/Projects";
import AuthorizedUserRouteOutlet from "@/routeOutlets/AuthorizedUserOutlet";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import ServiceRoutes from "./ServiceRoutes";
import { Error } from "@/pages/Error/Error";

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
              <ProjectPage />
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
          <Route index element={<ProjectCheckout />} />
          <Route element={<AuthorizedUserRouteOutlet />}>
            <Route
              path="history"
              element={
                <>
                  <ProjectPage />
                  <ProcessHistory />
                </>
              }
            />
            <Route
              path="chat"
              element={
                <>
                  <ProjectPage />
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
                <ProjectPage />
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
