import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { useProject } from "./hooks/useProject";
import DeleteIcon from "@mui/icons-material/Delete";
import logger from "@/hooks/useLogger";
import Container from "@component-library/Container";
import useFlatProjectQuerys, {
  FlatProjectProps,
} from "@/api/Project/useFlatProjectQuerys";
import useAdminQuerys from "@/api/Admin/useAdminQuerys";
import ProjectsCards from "./components/Cards";

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = (props) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { flatProjectsQuery: userFlatProjectsQuery } = useFlatProjectQuerys();
  const { adminFlatProjectsQuery } = useAdminQuerys();
  const flatProjectsQuery =
    user.usertype === UserType.ADMIN
      ? adminFlatProjectsQuery
      : userFlatProjectsQuery;
  const { createProject, deleteProject } = useProject();

  const [selectedProjects, setSelectedProjects] = React.useState<string[]>([]);

  const onButtonClickCreateProject = () => {
    createProject();
  };

  const handleOnClickButtonDeleteSelected = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (window.confirm(t("Projects.Projects.deleteSelectedConfirm")) === true) {
      deleteProject(selectedProjects);
      setSelectedProjects([]);
    } else logger("delete canceled");
  };

  const sortProjectByUpdatedDate = (
    project1: FlatProjectProps,
    project2: FlatProjectProps
  ) => {
    if (project1.updatedWhen > project2.updatedWhen) {
      return 1;
    }
    if (project1.updatedWhen < project2.updatedWhen) {
      return -1;
    }
    return 0;
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <div className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
        <Heading variant="h1">{t("Projects.Projects.title")}</Heading>
        <Container className="md:justify-end">
          {selectedProjects.length > 0 ? (
            <PermissionGate element={"ProjectsButtonDeleteSelected"}>
              <Button
                variant="secondary"
                startIcon={<DeleteIcon />}
                onClick={handleOnClickButtonDeleteSelected}
                title={t("Projects.Projects.button.deleteSelected")}
              />
            </PermissionGate>
          ) : null}
          <PermissionGate element={"ProjectsButtonNew"}>
            <Button
              variant="primary"
              title={t("Projects.Projects.button.create")}
              onClick={onButtonClickCreateProject}
            />
          </PermissionGate>
        </Container>
      </div>
      <LoadingSuspense query={flatProjectsQuery}>
        <ProjectsCards
          flatProjects={
            flatProjectsQuery.data === undefined ? [] : flatProjectsQuery.data
          }
          selectedProjects={selectedProjects}
          setSelectedProjects={setSelectedProjects}
        />
      </LoadingSuspense>
    </div>
  );
};

export default Projects;
