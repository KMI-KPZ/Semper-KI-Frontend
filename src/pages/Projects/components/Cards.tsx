import { FlatProjectProps } from "@/api/Project/useFlatProjectQuerys";
import logger from "@/hooks/useLogger";
import useUser, { UserType } from "@/hooks/useUser";
import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProjectsCard from "./Card";
import { Divider } from "@component-library/index";

interface ProjectsCardsProps {
  flatProjects: FlatProjectProps[];
  selectedProjects: string[];
  setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
  filterDataBySearchInput: (
    data: FlatProjectProps,
    _keys?: (keyof FlatProjectProps)[] | undefined
  ) => boolean;
}

const ProjectsCards: React.FC<ProjectsCardsProps> = (props) => {
  const {
    flatProjects,
    selectedProjects,
    setSelectedProjects,
    filterDataBySearchInput,
  } = props;
  const { t } = useTranslation();
  const { user } = useUser();

  const ownProjects: FlatProjectProps[] =
    user.usertype !== UserType.ANONYM && user.usertype === UserType.ORGANIZATION
      ? flatProjects.filter((project) => user.organization === project.client)
      : flatProjects;
  const recievedProjects: FlatProjectProps[] =
    user.usertype === UserType.ORGANIZATION
      ? flatProjects.filter((project) => user.organization !== project.client)
      : [];

  const handleOnChangeCheckboxSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "own" | "recieved"
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedProjects(
        type === "own"
          ? ownProjects.map((project) => project.projectID)
          : recievedProjects.map((project) => project.projectID)
      );
    } else {
      setSelectedProjects([]);
    }
  };

  return (
    <Container direction="col" width="full">
      <Container direction="col" width="full">
        <Container direction="row" justify="start" width="full">
          <label className="flex flex-row items-center justify-center">
            <input
              type="checkbox"
              className="h-6 w-6"
              onChange={(e) => handleOnChangeCheckboxSelectAll(e, "own")}
              id="selectAllOwnProjects"
              name={t("Projects.components.Cards.label.selectAllOwnProjects")}
              value={t("Projects.components.Cards.label.selectAllOwnProjects")}
              checked={
                selectedProjects.length > 0 &&
                selectedProjects.length === ownProjects.length &&
                ownProjects.filter((project) =>
                  selectedProjects.includes(project.projectID)
                ).length === ownProjects.length
              }
            />
            <Text className="hidden">
              {t("Projects.components.Cards.label.selectAllOwnProjects")}
            </Text>
          </label>
          <Heading variant="h2">
            {user.usertype === UserType.ADMIN
              ? t("Projects.components.Cards.adminProjects")
              : t("Projects.components.Cards.ownProjects")}
          </Heading>
        </Container>
        {ownProjects.length > 0 ? (
          ownProjects
            .filter((flatProject) => filterDataBySearchInput(flatProject))
            .map((flatProject, index) => (
              <ProjectsCard
                flatProject={flatProject}
                key={index}
                selectedProjects={selectedProjects}
                setSelectedProjects={setSelectedProjects}
              />
            ))
        ) : (
          <Text>{t("Projects.components.Cards.noProjects")}</Text>
        )}
      </Container>
      {user.usertype === UserType.ORGANIZATION ? (
        <>
          <Divider />
          <Container direction="col" width="full">
            <Container direction="row" justify="start" width="full">
              <label className="flex flex-row items-center justify-center">
                <input
                  type="checkbox"
                  className="h-6 w-6"
                  onChange={(e) =>
                    handleOnChangeCheckboxSelectAll(e, "recieved")
                  }
                  id="selectAllRecievedProjects"
                  name={t(
                    "Projects.components.Cards.label.selectAllRecievedProjects"
                  )}
                  value={t(
                    "Projects.components.Cards.label.selectAllRecievedProjects"
                  )}
                  checked={
                    selectedProjects.length > 0 &&
                    selectedProjects.length === recievedProjects.length &&
                    recievedProjects.filter((project) =>
                      selectedProjects.includes(project.projectID)
                    ).length === recievedProjects.length
                  }
                />
                <Text className="hidden">
                  {t(
                    "Projects.components.Cards.label.selectAllRecievedProjects"
                  )}
                </Text>
              </label>
              <Heading variant="h2">
                {t("Projects.components.Cards.receivedProjects")}
              </Heading>
            </Container>

            {recievedProjects
              .filter((flatProject) => filterDataBySearchInput(flatProject))
              .map((flatProject, index) => (
                <ProjectsCard
                  flatProject={flatProject}
                  key={index}
                  selectedProjects={selectedProjects}
                  setSelectedProjects={setSelectedProjects}
                />
              ))}
          </Container>
        </>
      ) : null}
    </Container>
  );
};

export default ProjectsCards;
