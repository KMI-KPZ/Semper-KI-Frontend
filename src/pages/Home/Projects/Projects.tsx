import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, Search, Text } from "@component-library/index";
import { Button } from "@component-library/index";
import HomeContainer from "../components/Container";
import useGetFlatProjects, {
  FlatProject,
} from "@/api/Project/Querys/useGetFlatProjects";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";
import useEvents from "@/hooks/useEvents/useEvents";
import useSearch from "@/hooks/useSearch";
import TuneIcon from "@mui/icons-material/Tune";
import TableHeaderButton from "@/components/Table/TableHeaderButton";
import useSort from "@/hooks/useSort";

import HomeProjektRow from "./ProjektRow";

interface HomeProjectsProps {}

const HomeProjects: React.FC<HomeProjectsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const {} = useEvents();
  const [openProjects, setOpenProjects] = React.useState<string[]>([]);

  const flatProjects = useGetFlatProjects();
  const createProject = useCreateProject();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<FlatProject>();
  const { getSortIcon, handleSort, sortItems } = useSort<FlatProject>();

  const handleOpen = (projectID: string) => {
    if (openProjects.includes(projectID)) {
      setOpenProjects(openProjects.filter((id) => id !== projectID));
    } else {
      setOpenProjects([...openProjects, projectID]);
    }
  };

  return (
    <HomeContainer>
      <Container width="full" direction="row" justify="between">
        <Heading variant="h2">{t("Home.Projects.heading")}</Heading>
        <Button
          title={t("Home.Projects.button.new")}
          size="sm"
          variant="primary"
        />
      </Container>
      <Container width="full" direction="row" justify="between">
        <Search handleSearchInputChange={handleSearchInputChange} />
        <Button
          title={t("Home.Projects.button.filter")}
          size="sm"
          variant="text"
          onClick={() => {
            createProject.mutate("test");
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
            {flatProjects.data !== undefined &&
            flatProjects.data
              .filter((orga) => filterDataBySearchInput(orga))
              .sort(sortItems).length > 0 ? (
              flatProjects.data
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
    </HomeContainer>
  );
};

export default HomeProjects;
