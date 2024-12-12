import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  LoadingAnimation,
} from "@component-library/index";
import useGetProject from "@/api/Project/Querys/useGetProject";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import HomeProcess from "./Process";

interface HomeProjectProps {
  projectID: string;
}

const HomeProject: React.FC<HomeProjectProps> = (props) => {
  const { projectID } = props;
  const { t } = useTranslation();
  const project = useGetProject(projectID);
  const createProcess = useCreateProcess();

  const handleOnClickButtonNew = () => {
    createProcess.mutate(projectID);
  };

  return (
    <tr className="m-0 p-0">
      <td colSpan={4} className="m-0  p-0">
        <Container
          width="full"
          direction="col"
          className="border-2 border-t-0 p-0 "
        >
          {project === undefined || project.data === undefined ? (
            <LoadingAnimation />
          ) : (
            project.data.processes.map((process) => (
              <React.Fragment key={process.processID}>
                <HomeProcess project={project.data} flatProcess={process} />
                <Divider />
              </React.Fragment>
            ))
          )}
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
