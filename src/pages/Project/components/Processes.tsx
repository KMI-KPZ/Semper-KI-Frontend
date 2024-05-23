import { Process } from "@/hooks/Process/useProcess";
import { Button, Container, Divider, Text } from "@component-library/index";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FlatProcessCard from "./FlatProcessCard";
import AddIcon from "@mui/icons-material/Add";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";

interface ProjectProcessesProps {
  processes: FlatProcess[];
}

const ProjectProcesses: React.FC<ProjectProcessesProps> = (props) => {
  const { processes } = props;
  const { t } = useTranslation();
  const createProcess = useCreateProcess();

  const handleOnClickButton = () => {
    createProcess.mutate();
  };

  const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false); // State variable to keep track of the sort menu open/close
  const [sortColumn, setSortColumn] =
    useState<keyof FlatProcess>("updatedWhen"); // State variable to keep track of the column to sort
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State variable to keep track of the sorting order

  const handleSort = (column: keyof FlatProcess) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the sorting order
      setSortOrder((prevState) => (prevState === "asc" ? "desc" : "asc"));
    } else {
      // If a different column is clicked, set the new column and reset the sorting order to ascending
      setSortColumn(column);
      setSortOrder("asc");
      setSortMenuOpen(false);
    }
  };

  const getSortIcon = (column: keyof FlatProcess): React.ReactNode => {
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
  const sortedProcesses = useMemo(() => {
    if (sortColumn) {
      const sorted = [...processes].sort((a, b) => {
        const valueA = a[sortColumn] ?? "";
        const valueB = b[sortColumn] ?? "";
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
    return processes;
  }, [processes, sortColumn, sortOrder]);

  const keyList: (keyof FlatProcess)[] = [
    "title",
    "flatProcessStatus",
    "serviceType",
    "createdWhen",
    "updatedWhen",
    "amount",
  ];

  return (
    <Container className="bg-white p-5" width="full" direction="col">
      <Container width="full" justify="between">
        <Button
          onClick={handleOnClickButton}
          startIcon={<AddIcon />}
          size="sm"
          variant="primary"
          title={t("Project.components.Processes.button.create")}
        />
        <Container className="gap-1">
          <select
            className={` bezier group flex
          h-fit flex-wrap
          items-center justify-center 
          gap-3 break-words 
          rounded-lg border-2    
          border-slate-500
          bg-slate-50 p-2
          text-center text-black 
          shadow-button-secondary brightness-100
          transition 
          duration-200 
          hover:cursor-pointer 
          hover:shadow-button-inner-secondary
          hover:brightness-95 
          md:flex-nowrap md:whitespace-nowrap
          `}
          >
            {keyList.map((key) => (
              <option className="text-center" onClick={() => handleSort(key)}>
                {t(`Project.components.Processes.sort.${key}`)}
                <KeyboardArrowUpIcon />
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              setSortOrder((prevState) =>
                prevState === "asc" ? "desc" : "asc"
              )
            }
            size="xs"
            title={t("Project.components.Processes.sort.order")}
          >
            <div
              className={`duration-300 ${
                sortOrder === "asc" ? "rotate-0" : "rotate-180"
              }`}
            >
              <KeyboardArrowDownIcon />
            </div>
          </Button>
        </Container>
      </Container>
      <Divider />
      {sortedProcesses.length > 0 ? (
        sortedProcesses.map((process) => (
          <FlatProcessCard flatProcess={process} />
        ))
      ) : (
        <Text>{t("Project.components.Processes.noProcess")}</Text>
      )}
      <Button
        onClick={handleOnClickButton}
        startIcon={<AddIcon />}
        size="sm"
        variant="primary"
        title={t("Project.components.Processes.button.create")}
      />
    </Container>
  );
};

export default ProjectProcesses;
