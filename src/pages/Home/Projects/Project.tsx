import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  LoadingAnimation,
} from "@component-library/index";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import HomeProcess from "./Process";
import useGetDashboardProject from "@/api/Project/Querys/useGetDashboardProject";

interface HomeProjectProps {
  projectID: string;
}

const HomeProject: React.FC<HomeProjectProps> = (props) => {
  const { projectID } = props;
  const { t } = useTranslation();
  // const project = useGetProject(projectID);
  const project = useGetDashboardProject(projectID);
  const createProcess = useCreateProcess();

  const handleOnClickButtonNew = () => {
    createProcess.mutate(projectID);
  };

  if (project.isLoading || project.data === undefined)
    return (
      <tr className="m-0 p-0">
        <td colSpan={4} className="m-0  p-0">
          <LoadingAnimation />
        </td>
      </tr>
    );

  return (
    <tr className="m-0 p-0">
      <td colSpan={4} className="m-0  p-0">
        <Container
          width="full"
          direction="col"
          className="border-2 border-t-0 p-0 "
        >
          {project.data.processes.map((process) => (
            <React.Fragment key={process.processID}>
              <HomeProcess project={project.data} process={process} />
              <Divider />
            </React.Fragment>
          ))}
          <Button
            title={t("Home.Projects.Project.button.new")}
            onClick={handleOnClickButtonNew}
            className="mb-5"
            size="sm"
            variant="primary"
          />
        </Container>
      </td>
    </tr>
  );
};

export default HomeProject;
