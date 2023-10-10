import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import HomeContainer from "../../components/Container";
import { useProject } from "@/pages/Projects/hooks/useProject";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface HomeAuthorizedProjectProps {}

const HomeAuthorizedProject: React.FC<HomeAuthorizedProjectProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  // const { projectsQuery } = useFlatProjects();
  const { createProject } = useProject();
  const handleOnClickButtonNew = () => {
    createProject.mutate();
  };

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.Home.Authorized.Project.title")}</Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <PermissionGate element={"ProjectsButtonNew"}>
          <Button
            title={t("Home.Home.Authorized.Project.button.new")}
            onClick={handleOnClickButtonNew}
          />
        </PermissionGate>
        <PermissionGate element={"ProjectsButton"}>
          <Button
            title={t("Home.Home.Authorized.Project.button.projects")}
            to="/projects"
          />
        </PermissionGate>
      </div>
    </HomeContainer>
  );
};

export default HomeAuthorizedProject;
