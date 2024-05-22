import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { Button } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import HomeContainer from "./Container";
import useUser, { UserType } from "@/hooks/useUser";
import { ContentBox } from "@component-library/index";
import useGetFlatProjects from "@/api/Project/Querys/useGetFlatProjects";
import { useProject } from "@/hooks/Project/useProject";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();

  const flatProjects = useGetFlatProjects();
  const { createProject } = useProject();

  const handleOnClickButtonNew = () => {
    createProject();
  };
  const handleOnClickButtonDemo = () => {
    createProject();
  };

  return (
    <HomeContainer className="bg-white">
      <ContentBox className="py-5">
        <Heading variant="h2">{t("Home.components.Projects.title")}</Heading>
        {user.usertype === UserType.ANONYM ? (
          <Container>
            {flatProjects.isFetched &&
            flatProjects.data !== undefined &&
            flatProjects.data.length > 0 ? (
              <>
                <Button
                  title={t("Home.components.Projects.button.new")}
                  onClick={handleOnClickButtonDemo}
                  variant="primary"
                />
                <Button
                  title={t("Home.components.Projects.button.continue")}
                  to={`/projects/${flatProjects.data[0].projectID}`}
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
                variant="primary"
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
