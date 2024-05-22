import { Button, Search } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { useProject } from "./hooks/useProject";
import { Container } from "@component-library/index";
import useSearch from "@/hooks/useSearch";
import useGetAdminFlatProjects from "@/api/Admin/Querys/useGetAdminFlatProjects";
import useGetFlatProjects, {
  FlatProject,
} from "@/api/Project/Querys/useGetFlatProjects";
import ProjectsTable from "./components/Table";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const _flatProjects = useGetFlatProjects();
  const adminFlatProjects = useGetAdminFlatProjects();
  const flatProjects =
    user.usertype === UserType.ADMIN ? adminFlatProjects : _flatProjects;
  const { createProject, deleteProject } = useProject();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<FlatProject>();

  const onButtonClickCreateProject = () => {
    createProject();
  };

  const ownProjects: FlatProject[] =
    flatProjects.data === undefined
      ? []
      : user.usertype !== UserType.ANONYM &&
        user.usertype === UserType.ORGANIZATION
      ? flatProjects.data.filter(
          (project) => user.organization === project.client
        )
      : flatProjects.data;
  const recievedProjects: FlatProject[] =
    flatProjects.data === undefined
      ? []
      : user.usertype === UserType.ORGANIZATION
      ? flatProjects.data.filter(
          (project) => user.organization !== project.client
        )
      : [];

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
        <Heading variant="h1">{t("Projects.Projects.title")}</Heading>
        <Container className="md:justify-end">
          <PermissionGate element={"ProjectsButtonNew"}>
            <Button
              variant="primary"
              title={t("Projects.Projects.button.create")}
              onClick={onButtonClickCreateProject}
            />
          </PermissionGate>
        </Container>
      </div>
      <Search handleSearchInputChange={handleSearchInputChange} />
      <div className="flex w-full flex-col items-start">
        <Heading variant="h2">
          {user.usertype === UserType.ADMIN
            ? t("Projects.components.Cards.adminProjects")
            : t("Projects.components.Cards.ownProjects")}
        </Heading>
        <LoadingSuspense query={flatProjects}>
          <ProjectsTable
            projects={ownProjects.filter((flatProject) =>
              filterDataBySearchInput(flatProject)
            )}
          />
        </LoadingSuspense>
      </div>
      {user.usertype === UserType.ORGANIZATION ? (
        <>
          <Heading variant="h2">
            {t("Projects.components.Cards.receivedProjects")}
          </Heading>
          <LoadingSuspense query={flatProjects}>
            <ProjectsTable
              projects={recievedProjects.filter((flatProject) =>
                filterDataBySearchInput(flatProject)
              )}
            />
          </LoadingSuspense>
        </>
      ) : null}
    </div>
  );
};

export default Projects;
