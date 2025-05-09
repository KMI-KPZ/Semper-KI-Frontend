import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Heading,
  LoadingAnimation,
  Modal,
  Search,
  Text,
} from "@component-library/index";
import { Button } from "@component-library/index";
import HomeContainer from "../components/Container";
import useGetDashboardProjects, {
  FlatDashboardProject,
} from "@/api/Project/Querys/useGetDashboardProjects";
import useSearch from "@/hooks/useSearch";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import useSort from "@/hooks/useSort";
import HomeProjektRow from "./ProjektRow";
import CreateProjectTitleForm from "@/pages/Home/Projects/CreateProjectTitleForm";
import { AuthorizedUser } from "@/hooks/useUser";
import useModal from "@/hooks/useModal";
import { gradientStyle } from "@component-library/Container/GrayContainer";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface HomeProjectsProps {
  recieved?: boolean;
  user?: AuthorizedUser;
  projectID?: string;
}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const { recieved = false, user, projectID } = props;
  const { t } = useTranslation();
  const [openProjects, setOpenProjects] = React.useState<string[]>(
    projectID === undefined ? [] : [projectID]
  );
  const { deleteModal } = useModal();

  const dashboardProject = useGetDashboardProjects();
  const { filterDataBySearchInput, handleSearchInputChange, searchInput } =
    useSearch<FlatDashboardProject>();

  const { getSortIcon, handleSort, sortItems } =
    useSort<FlatDashboardProject>();

  const [createProjectTitleFormOpen, setCreateProjectTitleFormOpen] =
    React.useState<boolean>(false);

  const handleOpen = (projectID: string) => {
    if (openProjects.includes(projectID)) {
      setOpenProjects(openProjects.filter((id) => id !== projectID));
    } else {
      setOpenProjects([...openProjects, projectID]);
    }
  };

  const filteredProjectsByRecieved =
    dashboardProject.data !== undefined
      ? dashboardProject.data.filter(
          (project) =>
            user === undefined ||
            (project.owner && !recieved) ||
            (!project.owner && recieved)
        )
      : [];

  const filteredProjectsBySearchInput = filteredProjectsByRecieved.filter(
    (orga) => filterDataBySearchInput(orga)
  );

  const filteredAndSortedProjects =
    filteredProjectsBySearchInput.sort(sortItems);

  const closeModal = () => {
    setCreateProjectTitleFormOpen(false);
    deleteModal("CreateProjectTitleEdit");
  };

  return (
    <HomeContainer className="gap-3 rounded-md bg-transparent  px-0  text-white">
      <Container width="full" direction="row" justify="between">
        <Heading variant="h2" className="text-white">
          {recieved
            ? t("Home.Projects.receivedProjects")
            : t("Home.Projects.heading")}
        </Heading>
        <PermissionGate element="ProjectCreate">
          {!recieved ? (
            <Button
              title={t("Home.Projects.button.new")}
              size="sm"
              variant="secondary"
              onClick={() => {
                setCreateProjectTitleFormOpen(true);
              }}
            />
          ) : null}
        </PermissionGate>
      </Container>
      <Container width="full" direction="row" justify="between">
        <Search
          handleSearchInputChange={handleSearchInputChange}
          style={gradientStyle}
        />
      </Container>
      <Container width="full">
        <table className="w-full table-auto border-separate border-spacing-x-0 border-spacing-y-0">
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Home.Projects.name")}
                objectKey="projectTitle"
                className=" text-white hover:text-white"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Home.Projects.updated")}
                objectKey="updatedWhen"
                className="text-white hover:text-white"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Home.Projects.processCount")}
                objectKey="processesCount"
                className="text-white hover:text-white"
              />
              <th>
                <Text className="font-bold">{t("Home.Projects.actions")}</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardProject.isLoading || dashboardProject.isRefetching ? (
              <tr className="bg-gradient-to-br  from-white/60 to-white/20 text-center ">
                <td
                  colSpan={4}
                  className="rounded-md border-2 border-ultramarinblau-dark border-opacity-20 p-2 text-center"
                >
                  <Container width="full" justify="center">
                    <LoadingAnimation />
                  </Container>
                </td>
              </tr>
            ) : filteredAndSortedProjects.length > 0 ? (
              filteredAndSortedProjects.map((project, index) => (
                <HomeProjektRow
                  key={index}
                  project={project}
                  open={openProjects.includes(project.projectID)}
                  handleOpen={handleOpen}
                  recieved={recieved}
                />
              ))
            ) : filteredProjectsByRecieved.length ===
              filteredProjectsBySearchInput.length ? (
              <tr className="bg-gradient-to-br  from-white/60 to-white/20 text-center ">
                <td
                  colSpan={4}
                  className="rounded-md border-2 border-ultramarinblau-dark border-opacity-20 p-2 text-center"
                >
                  <Text>{t("Home.Projects.noProjects")}</Text>
                </td>
              </tr>
            ) : (
              <tr style={gradientStyle} className="text-center ">
                <td
                  colSpan={4}
                  className="rounded-md border-2 border-ultramarinblau-dark border-opacity-20 p-2 text-center"
                >
                  <Text>
                    {t("Home.Projects.noProjectsSearch", {
                      search: searchInput,
                    })}
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
      <Modal
        modalKey="CreateProjectTitleEdit"
        open={createProjectTitleFormOpen}
        closeModal={closeModal}
      >
        <CreateProjectTitleForm close={closeModal} />
      </Modal>
    </HomeContainer>
  );
};

export default HomeProjects;
