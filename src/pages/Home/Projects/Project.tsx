import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import HomeProcess from "./Process";
import useGetDashboardProject from "@/api/Project/Querys/useGetDashboardProject";

interface HomeProjectProps {
  projectID: string;
  owner: boolean;
}

const HomeProject: React.FC<HomeProjectProps> = (props) => {
  const { projectID, owner } = props;
  const { t } = useTranslation();
  // const project = useGetProject(projectID);
  const project = useGetDashboardProject(projectID);
  const createProcess = useCreateProcess();

  const handleOnClickButtonNew = () => {
    createProcess.mutate(projectID);
  };

  if (project.isLoading || project.isRefetching || project.data === undefined)
    return (
      <tr className="m-0 p-0">
        <td colSpan={4} className="m-0 p-0">
          <Container width="full" direction="col" className=" p-2">
            <LoadingAnimation />
          </Container>
        </td>
      </tr>
    );

  return (
    <tr className="m-0 p-0">
      <td colSpan={4} className="m-0  p-0">
        <Container
          width="full"
          direction="col"
          className="gap-0  rounded-md border-2 border-t-0 border-gray-300 p-0"
        >
          {project.data.processes.length > 0 ? (
            project.data.processes.map((process) => (
              <React.Fragment key={process.processID}>
                <HomeProcess
                  project={project.data}
                  process={process}
                  owner={owner}
                />
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <>
              <Container
                width="full"
                direction="col"
                justify="start"
                className="m-0  py-5"
              >
                <Text>{t("Home.Projects.Project.noProcess")}</Text>
              </Container>
              <Divider />
            </>
          )}
          <Button
            title={t("Home.Projects.Project.button.new")}
            onClick={handleOnClickButtonNew}
            className="my-5"
            size="sm"
            variant="primary"
          />
        </Container>
      </td>
    </tr>
  );
};

export default HomeProject;
