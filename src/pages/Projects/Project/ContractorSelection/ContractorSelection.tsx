import React, { useState } from "react";
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
  const { projectQuery } = useProject();
  const { t } = useTranslation();
  const { isServiceComplete } = useService();
  const { contractorsQuery } = useContractor();
  const { updateProcessWithProcessID } = useProcess();
  const { processID } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: async () => ({
      processes:
        projectQuery.data === undefined
          ? []
          : projectQuery.data.processes
              .filter((process) => isServiceComplete(process.processID))
              .map((process) => {
                return {
                  process: process,
                  contractorID: "",
                };
              }),
    }),
  });

  const onSubmit = (data: FormData) => {
    data.processes.forEach((process, index, allProcesses) => {
      updateProcessWithProcessID.mutate(
        {
          processID: process.process.processID,
          updates: {
            changes: {
              status: ProcessStatus.CONTRACTOR_SELECTED,
              contractor: [process.contractorID],
            },
          },
        },
        {
          onSuccess: () => {
            if (index === allProcesses.length - 1) {
              navigate("../..");
            }
          },
        }
      );
    });
  };

  return (
    <form className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
        <Heading variant="h1">
          {t("AfterProcess.Contractor.ContractorView.header")}
        </Heading>
      </div>
      <div className="flex w-full flex-col items-center justify-start gap-5">
        {projectQuery.data !== undefined &&
        projectQuery.data.processes.length > 0
          ? projectQuery.data.processes
              .filter((process) => isServiceComplete(process.processID))
              .map((process, index) => (
                <label
                  key={index}
                  className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5 md:flex-row"
                >
                  <Text variant="body">{process.details.title}</Text>
                  <Text variant="body">
                    {ServiceType[process.service.type]}
                  </Text>
                  <div className="flex grow flex-row items-center justify-center gap-5">
                    {contractorsQuery.data !== undefined &&
                    contractorsQuery.data.length > 0 ? (
                      contractorsQuery.data.map((manufacturer, _index) => (
                        <label
                          className="flex flex-row items-center justify-center gap-5 p-3 shadow-card"
                          key={_index}
                        >
                          <Text variant="body">{manufacturer.name}</Text>
                          <input
                            type="radio"
                            {...register(`processes.${index}.contractorID`, {
                              required: true,
                            })}
                            value={manufacturer.id}
                          />
                        </label>
                      ))
                    ) : (
                      <Text variant="body">No manufacturers found</Text>
                    )}
                  </div>
                  {errors.processes?.[index]?.contractorID ? (
                    <Text variant="body" className="text-red-500">
                      {t(
                        "AfterProcess.Contractor.ContractorView.error.missing"
                      )}
                    </Text>
                  ) : null}
                </label>
              ))
          : null}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Button
          to=".."
          startIcon={<ArrowBackIcon />}
          title={t("AfterProcess.Contractor.ContractorView.button.overview")}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          endIcon={<ArrowForwardIcon />}
          title={t(
            "AfterProcess.Contractor.ContractorView.button.checkProject"
          )}
        />
      </div>
    </form>
  );
};

export default ProjectContractorSelection;
