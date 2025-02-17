import {
  Button,
  Container,
  Divider,
  Search,
  Text,
} from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FlatProcessCard from "./FlatProcessCard";
import AddIcon from "@mui/icons-material/Add";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";
import useSearch from "@/hooks/useSearch";

interface ProjectProcessesProps {
  processes: FlatProcess[];
}

type SortOrder = "asc" | "desc";

const ProjectProcesses: React.FC<ProjectProcessesProps> = (props) => {
  const { processes } = props;
  const { t } = useTranslation();
  const createProcess = useCreateProcess();
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<FlatProcess>();

  const handleOnClickButton = () => {
    createProcess.mutate();
  };

  const [sort, setSort] = useState<{
    column: keyof FlatProcess;
    order: SortOrder;
  }>({ column: "updatedWhen", order: "asc" });

  const handleSort = (column: keyof FlatProcess, order: SortOrder) => {
    setSort({ column, order });
  };

  const sortFlatProcess = (a: FlatProcess, b: FlatProcess) => {
    const valueA = a[sort.column] ?? "";
    const valueB = b[sort.column] ?? "";
    if (valueA < valueB) {
      return sort.order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sort.order === "asc" ? 1 : -1;
    }
    return 0;
  };

  const keyList: (keyof FlatProcess)[] = [
    "title",
    "actionStatus",
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
        <Search handleSearchInputChange={handleSearchInputChange} />
        <select
          className="bezier group flex
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
            md:flex-nowrap md:whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={sort.column}
          onChange={(e) => {
            const value = e.target.value;
            const [column, order] = value.split(".");
            handleSort(column as keyof FlatProcess, order as SortOrder);
          }}
        >
          {keyList.map((key, index) => (
            <React.Fragment key={index}>
              <option
                key={index + "asc"}
                className="text-center"
                value={`${key}.asc`}
              >
                {t(`Project.components.Processes.sort.${key}`)}
                {":    "}
                {t(`Project.components.Processes.sort.asc`)}
              </option>
              <option
                key={index + "desc"}
                className="text-center"
                value={`${key}.dsc`}
              >
                {t(`Project.components.Processes.sort.${key}`)}
                {":    "}
                {t(`Project.components.Processes.sort.dsc`)}
              </option>
            </React.Fragment>
          ))}
        </select>
      </Container>
      <Divider />
      {processes.length > 0 ? (
        processes
          .filter((flatProcess) => filterDataBySearchInput(flatProcess))
          .sort(sortFlatProcess)
          .map((process) => (
            <FlatProcessCard key={process.processID} flatProcess={process} />
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
