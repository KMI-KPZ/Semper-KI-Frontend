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
import { UserContext } from "@/contexts/UserContextProvider";
import useUser, { UserType } from "@/hooks/useUser";
import ContentBox from "@component-library/ContentBox";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();

  const { flatProjectsQuery } = useFlatProjects();
  const { createProject } = useProject();

  const handleOnClickButtonNew = () => {
    createProject.mutate();
  };
  const handleOnClickButtonDemo = () => {
    createProject.mutate();
  };

  return (
    <HomeContainer className="bg-slate-300">
      <ContentBox className="py-5">
        <Heading variant="h2">{t("Home.components.Projects.title")}</Heading>
        {user.usertype === UserType.ANONYM ? (
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
      </ContentBox>
    </HomeContainer>
  );
};

export default HomeProjects;
