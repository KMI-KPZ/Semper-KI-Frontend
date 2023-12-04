import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@component-library/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Heading, Text } from "@component-library/Typography";
import useService, { ServiceType } from "@/pages/Service/hooks/useService";
import useContractor from "./hooks/useContractor";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";
import { useProject } from "../../hooks/useProject";
import { useForm } from "react-hook-form";
import { ProjectContext } from "../../context/ProjectContext";
import ProcessInfoCard from "../components/ProcessInfoCard";
import Container from "@component-library/Container";
import useCheckedProcesses from "../hooks/useCheckedProcesses";
import { twMerge } from "tailwind-merge";
import useGernalProcess from "../../hooks/useGernalProcess";

interface Props {}

interface FormData {
  processes: {
    process: ProcessProps;
    contractorID: string;
  }[];
}

const ProjectContractorSelection: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { project, checkedProcesses } = useContext(ProjectContext);
  const { t } = useTranslation();
  const { isServiceComplete } = useService();
  const { contractorsQuery } = useContractor();
  const { updateProcess } = useGernalProcess();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: async () => ({
      processes:
        project.processes.length === 0
          ? []
          : project.processes
              .filter((process) =>
                isServiceComplete(process.serviceType, process.serviceDetails)
              )
              .map((process) => {
                return {
                  process: process,
                  contractorID: "",
                };
              }),
    }),
  });

  const onSubmit = (data: FormData) => {
    data.processes
      .filter((process) => checkedProcesses.includes(process.process.processID))
      .forEach((process, index, allProcesses) => {
        updateProcess({
          processIDs: [process.process.processID],
          updates: {
            changes: {
              processStatus: ProcessStatus.CONTRACTOR_SELECTED,
              provisionalContractor: process.contractorID,
            },
          },
        });
      });
  };

  return (
    <form className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
        <Heading variant="h1">
          {t("Projects.Project.ContractorSelection.ContractorSelection.title")}
        </Heading>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-5">
        {project.processes.length > 0
          ? project.processes
              .filter(
                (process) =>
                  isServiceComplete(
                    process.serviceType,
                    process.serviceDetails
                  ) && process.processStatus === ProcessStatus.SERVICE_READY
              )
              .map((process, index) => (
                <div
                  key={index}
                  className={twMerge(
                    `flex w-full flex-col items-center justify-center gap-20  p-5 md:flex-row md:items-start md:justify-between`,
                    checkedProcesses.includes(process.processID)
                      ? "bg-white"
                      : "bg-slate-100"
                  )}
                >
                  <ProcessInfoCard process={process} />
                  <Container
                    direction="col"
                    className="grow md:max-w-2xl md:items-start md:justify-start"
                  >
                    <Heading variant="h2">
                      {t(
                        "Projects.Project.ContractorSelection.ContractorSelection.contractor"
                      )}
                    </Heading>
                    {contractorsQuery.data !== undefined &&
                    contractorsQuery.data.length > 0 ? (
                      contractorsQuery.data.map((manufacturer, _index) => (
                        <label
                          className="flex w-full flex-row items-center justify-center gap-5 p-3 shadow-card"
                          key={_index}
                        >
                          <input
                            type="radio"
                            {...register(`processes.${index}.contractorID`, {
                              required: checkedProcesses.includes(
                                process.processID
                              ),
                              disabled: !checkedProcesses.includes(
                                process.processID
                              ),
                            })}
                            value={manufacturer.id}
                          />
                          <Text variant="body">{manufacturer.name}</Text>
                        </label>
                      ))
                    ) : (
                      <Text variant="body">No manufacturers found</Text>
                    )}
                    {errors.processes?.[index]?.contractorID ? (
                      <Text variant="body" className="text-red-500">
                        {t(
                          "Projects.Project.ContractorSelection.ContractorSelection.error.missing"
                        )}
                      </Text>
                    ) : null}
                  </Container>
                </div>
              ))
          : null}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Button
          to=".."
          startIcon={<ArrowBackIcon />}
          title={t(
            "Projects.Project.ContractorSelection.ContractorSelection.button.overview"
          )}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          endIcon={<ArrowForwardIcon />}
          title={t(
            "Projects.Project.ContractorSelection.ContractorSelection.button.submit"
          )}
        />
      </div>
    </form>
  );
};

export default ProjectContractorSelection;
