import React from "react";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";
import { useProject } from "@/pages/Projects/hooks/useProject";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import HomeContainer from "./Container";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  // const { projectsQuery } = useFlatProjects();
  const { createProject } = useProject();
  const handleOnClickButtonNew = () => {
    createProject.mutate();
  };

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.components.Projects.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <PermissionGate element={"ProjectsButtonNew"}>
          <Button
            title={t("Home.components.Projects.button.new")}
            onClick={handleOnClickButtonNew}
          />
        </PermissionGate>
        <PermissionGate element={"ProjectsButton"}>
          <Button
            title={t("Home.components.Projects.button.projects")}
            to="/projects"
          />
        </PermissionGate>
      </div>
    </HomeContainer>
  );
};

export default HomeProjects;
