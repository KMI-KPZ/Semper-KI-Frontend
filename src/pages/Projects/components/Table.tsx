import { FlatProject } from "@/api/Project/Querys/useGetFlatProjects";
import { Button, Text } from "@component-library/index";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProject } from "../hooks/useProject";
import logger from "@/hooks/useLogger";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import ProjectsTableRow from "./TableRow";

interface ProjectsTableProps {
  projects: FlatProject[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = (props) => {
  const { projects } = props;
  const { t } = useTranslation();

  const [sortColumn, setSortColumn] = useState<keyof FlatProject | undefined>(); // State variable to keep track of the column to sort
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State variable to keep track of the sorting order

  const handleSort = (column: keyof FlatProject) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the sorting order
      setSortOrder((prevState) => (prevState === "asc" ? "desc" : "asc"));
    } else {
      // If a different column is clicked, set the new column and reset the sorting order to ascending
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: keyof FlatProject): React.ReactNode => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      );
    }
    return <div className="h-6 w-6" />;
  };

  // Sort the projects based on the sortColumn and sortOrder
  const sortedProjects = useMemo(() => {
    if (sortColumn) {
      const sorted = [...projects].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        logger(valueA, valueB);
        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return projects;
  }, [projects, sortColumn, sortOrder]);

  return (
    <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2">
      <thead>
        <tr>
          <th className="">
            <div className="flex items-center justify-center">
              <Button
                variant="text"
                title={t("Projects.components.Table.name")}
                onClick={() => handleSort("projectTitle")}
              >
                <div className="ml-6 flex flex-row items-center justify-center">
                  {t("Projects.components.Table.name")}
                  {getSortIcon("projectTitle")}
                </div>
              </Button>
            </div>
          </th>
          <th className="">
            <div className="flex items-center justify-center">
              <Button
                variant="text"
                title={t("Projects.components.Table.updated")}
                onClick={() => handleSort("updatedWhen")}
              >
                <div className="ml-6 flex flex-row items-center justify-center">
                  {t("Projects.components.Table.updated")}
                  {getSortIcon("updatedWhen")}
                </div>
              </Button>
            </div>
          </th>
          <th className="">
            <div className="flex items-center justify-center">
              <Button
                variant="text"
                title={t("Projects.components.Table.status")}
                onClick={() => handleSort("projectStatus")}
              >
                <div className="ml-6 flex flex-row items-center justify-center">
                  {t("Projects.components.Table.status")}
                  {getSortIcon("projectStatus")}
                </div>
              </Button>
            </div>
          </th>
          <th className="">
            <div className="flex items-center justify-center">
              <Button
                variant="text"
                title={t("Projects.components.Table.count")}
                onClick={() => handleSort("processesCount")}
              >
                <div className="ml-6 flex flex-row items-center justify-center">
                  {t("Projects.components.Table.count")}
                  {getSortIcon("processesCount")}
                </div>
              </Button>
            </div>
          </th>
          <th className="">
            <div className="flex items-center justify-center">
              <Text className="font-bold">
                {t("Projects.components.Table.actions")}
              </Text>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedProjects.map((flatProject) => (
          <ProjectsTableRow
            key={flatProject.projectID}
            flatProject={flatProject}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProjectsTable;
