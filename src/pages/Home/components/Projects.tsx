import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";
import { useProject } from "@/pages/Projects/hooks/useProject";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import HomeContainer from "./Container";
import { AppContext } from "@/pages/App/App";
import Container from "@component-library/Container";
import { useFlatProjects } from "@/pages/Projects/hooks/useFlatProjects";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useContext(AppContext);

  const { flatProjectsQuery } = useFlatProjects();
  const { createProject, createProjectWithProcess } = useProject();
  const { createProcessWithProjectID } = useProcess();

  const handleOnClickButtonNew = () => {
    createProject.mutate();
  };
  const handleOnClickButtonDemo = () => {
    createProjectWithProcess.mutate(undefined, {
      onSuccess(data) {
        createProcessWithProjectID.mutate(data);
      },
    });
  };

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.components.Projects.title")}</Heading>
      {user === undefined ? (
        <Container>
          {flatProjectsQuery.isFetched &&
          flatProjectsQuery.data !== undefined &&
          flatProjectsQuery.data.length > 0 ? (
            <>
              <Button
                title={t("Home.components.Projects.button.new")}
                onClick={handleOnClickButtonDemo}
              />
              <Button
                title={t("Home.components.Projects.button.continue")}
                to={`/projects/${flatProjectsQuery.data[0].projectID}`}
              />
              <Button
                title={t("Home.components.Projects.button.projects")}
                to="/projects"
              />
            </>
          ) : (
            <Button
              title={t("Home.components.Projects.button.demo")}
              onClick={handleOnClickButtonDemo}
            />
          )}
        </Container>
      ) : (
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
      )}
    </HomeContainer>
  );
};

export default HomeProjects;
