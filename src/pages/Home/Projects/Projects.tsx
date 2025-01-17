import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Heading,
  Modal,
  Search,
  Text,
} from "@component-library/index";
import { Button } from "@component-library/index";
import HomeContainer from "../components/Container";
import useGetDashboardProjects, {
  FlatDashboardProject,
} from "@/api/Project/Querys/useGetDashboardProjects";
import useEvents from "@/hooks/useEvents/useEvents";
import useSearch from "@/hooks/useSearch";
import TuneIcon from "@mui/icons-material/Tune";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import useSort from "@/hooks/useSort";
import HomeProjektRow from "./ProjektRow";
import CreateProjectTitleForm from "@/pages/Projects/components/TitleForm";
import logger from "@/hooks/useLogger";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const {} = useEvents();
  const [openProjects, setOpenProjects] = React.useState<string[]>([]);

  const dashboardProject = useGetDashboardProjects();
  const { filterDataBySearchInput, handleSearchInputChange } =
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

  return (
    <HomeContainer className="">
      <Container width="full" direction="row" justify="between">
        <Heading variant="h2">{t("Home.Projects.heading")}</Heading>
        <Button
          title={t("Home.Projects.button.new")}
          size="sm"
          variant="primary"
          onClick={() => {
            setCreateProjectTitleFormOpen(true);
          }}
        />
      </Container>
      <Container width="full" direction="row" justify="between">
        <Search handleSearchInputChange={handleSearchInputChange} />
        <Button
          title={t("Home.Projects.button.filter")}
          size="sm"
          variant="text"
          onClick={() => {
            logger("info", "Filter button clicked");
          }}
          children={<TuneIcon />}
        />
      </Container>
      <Container width="full">
        <table className="w-full table-auto border-separate border-spacing-x-0 border-spacing-y-2">
          <thead>
            <tr>
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Home.Projects.name")}
                objectKey="projectTitle"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Home.Projects.updated")}
                objectKey="updatedWhen"
              />
              <TableHeaderButton
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                title={t("Home.Projects.status")}
                objectKey="projectStatus"
              />
              <th>
                <Text className="font-bold">{t("Home.Projects.actions")}</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardProject.data !== undefined &&
            dashboardProject.data
              .filter((orga) => filterDataBySearchInput(orga))
              .sort(sortItems).length > 0 ? (
              dashboardProject.data
                .filter((orga) => filterDataBySearchInput(orga))
                .sort(sortItems)
                .map((project, index) => (
                  <HomeProjektRow
                    key={index}
                    project={project}
                    open={openProjects.includes(project.projectID)}
                    handleOpen={handleOpen}
                  />
                ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <Text>{t("Home.Projects.noProjects")}</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
      <Modal
        modalKey="CreateProjectTitleEdit"
        open={createProjectTitleFormOpen}
        closeModal={() => {
          setCreateProjectTitleFormOpen(false);
        }}
      >
        <CreateProjectTitleForm
          close={() => {
            setCreateProjectTitleFormOpen(false);
          }}
        />
      </Modal>
    </HomeContainer>
  );
};

export default HomeProjects;
