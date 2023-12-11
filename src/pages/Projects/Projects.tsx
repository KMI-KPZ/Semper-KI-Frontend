import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import ProjectsTable from "./components/Table";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { useProject } from "./hooks/useProject";
import DeleteIcon from "@mui/icons-material/Delete";
import logger from "@/hooks/useLogger";
import Container from "@component-library/Container";
import useFlatProjectQuerys, {
  FlatProjectProps,
} from "@/api/Project/useFlatProjectQuerys";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { t } = useTranslation();
  const { flatProjectsQuery } = useFlatProjectQuerys();
  const { createProject, deleteProject } = useProject();
  const { user } = useUser();
  const [selectedProjects, setSelectedProjects] = React.useState<string[]>([]);

  const onButtonClickCreateProject = () => {
    createProject();
  };

  const handleOnClickButtonDeleteSelected = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (window.confirm(t("Projects.Projects.deleteSelectedConfirm")) === true) {
      deleteProject(selectedProjects);
    } else logger("delete canceled");
  };

  const sortProjectByUpdatedDate = (
    project1: FlatProjectProps,
    project2: FlatProjectProps
  ) => {
    if (project1.updated > project2.updated) {
      return 1;
    }
    if (project1.updated < project2.updated) {
      return -1;
    }
    return 0;
  };

  const renderClientProjects = () =>
    flatProjectsQuery.data !== undefined &&
    flatProjectsQuery.data.length > 0 ? (
      <ProjectsTable
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        flatProjects={
          user.usertype !== UserType.ANONYM &&
          user.usertype === UserType.ORGANIZATION
            ? flatProjectsQuery.data
                .filter((project) => user.organization === project.client)
                .sort(sortProjectByUpdatedDate)
            : flatProjectsQuery.data.sort(sortProjectByUpdatedDate)
        }
      />
    ) : (
      <Text variant="body">{t("Projects.Projects.empty")}</Text>
    );

  const renderOrganizationProjects = (user: AuthorizedUserProps) =>
    flatProjectsQuery.data !== undefined &&
    flatProjectsQuery.data.length > 0 &&
    flatProjectsQuery.data.filter(
      (project) => user.organization !== project.client
    ).length > 0 ? (
      <ProjectsTable
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        flatProjects={flatProjectsQuery.data
          .filter((project) => user.organization !== project.client)
          .sort(sortProjectByUpdatedDate)}
      />
    ) : (
      <Text variant="body">{t("Projects.Projects.empty")}</Text>
    );

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
        <Heading variant="h1">{t("Projects.Projects.title")}</Heading>
        <Container className="md:justify-end">
          {selectedProjects.length > 0 ? (
            <PermissionGate element={"ProjectsButtonDeleteSelected"}>
              <Button
                variant="icon"
                size="sm"
                startIcon={<DeleteIcon />}
                onClick={handleOnClickButtonDeleteSelected}
                title={t("Projects.Projects.button.deleteSelected")}
              />
            </PermissionGate>
          ) : null}
          <PermissionGate element={"ProjectsButtonNew"}>
            <Button
              title={t("Projects.Projects.button.create")}
              onClick={onButtonClickCreateProject}
            />
          </PermissionGate>
        </Container>
      </div>
      <LoadingSuspense query={flatProjectsQuery}>
        {renderClientProjects()}
        {user.usertype !== UserType.ANONYM &&
        user.usertype === UserType.ORGANIZATION ? (
          <>
            <Heading variant="h2" className="mt-10 w-full text-left">
              {t("Projects.Projects.orga")}
            </Heading>
            {renderOrganizationProjects(user)}
          </>
        ) : null}
      </LoadingSuspense>
    </div>
  );
};

export default Projects;
