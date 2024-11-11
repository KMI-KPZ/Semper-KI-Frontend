import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, Container, Heading } from "@component-library/index";
import { Button } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import HomeContainer from "./Container";
import useUser, { UserType } from "@/hooks/useUser";
import useGetFlatProjects from "@/api/Project/Querys/useGetFlatProjects";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";
import useEvents from "@/hooks/useEvents/useEvents";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const { totalProjectEventCount } = useEvents();

  const flatProjects = useGetFlatProjects();
  const createProject = useCreateProject();

  const handleOnClickButtonNew = () => {
    createProject.mutate("test");
  };
  const handleOnClickButtonDemo = () => {
    createProject.mutate("test");
  };

  if (user.usertype === UserType.ADMIN) return null;

  return (
    <HomeContainer>
      <Heading variant="h2">{t("Home.components.Projects.heading")}</Heading>
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
            <Badge count={totalProjectEventCount}>
              <Button
                title={t("Home.components.Projects.button.projects")}
                to="/projects"
              />
            </Badge>
          </PermissionGate>
        </div>
      )}
    </HomeContainer>
  );
};

export default HomeProjects;
