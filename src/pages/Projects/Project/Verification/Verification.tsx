import React, { useContext, useEffect, useState } from "react";
import ProcessVerificationItem from "./components/Item";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import logger from "@/hooks/useLogger";
import { useForm } from "react-hook-form";
import { queryByTestId } from "@testing-library/react";
import { ProcessProps, ProcessStatus } from "../../hooks/useProcess";
import { useProject } from "../../hooks/useProject";
import { ProjectContext } from "../../context/ProjectContext";

interface Props {}
export interface VerifyFormData {
  processes: { process: ProcessProps; checked: boolean }[];
}

const ProcessVerification: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { verifyProject } = useProject();

  const { projectQuery } = useContext(ProjectContext);
  const processes: ProcessProps[] =
    projectQuery.data === undefined
      ? []
      : projectQuery.data.processes.filter(
          (process) =>
            process.processStatus === ProcessStatus.CONTRACTOR_SELECTED
        );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({
    defaultValues: async () => ({
      processes: processes.map((process) => ({ process, checked: true })),
    }),
  });

  const navigate = useNavigate();

  const handleOnClickButtonVerify = (data: VerifyFormData) => {
    if (projectQuery.data !== undefined) {
      verifyProject({
        processIDs: data.processes
          .filter((process) => process.checked === true)
          .map((process) => process.process.processID),
        send: false,
      });
    }
  };

  const handleOnClickButtonRequest = (data: VerifyFormData) => {
    if (projectQuery.data !== undefined) {
      verifyProject({
        processIDs: data.processes
          .filter((process) => process.checked === true)
          .map((process) => process.process.processID),
        send: true,
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Heading variant="h1">
        {t("Projects.Project.Verification.Verification.title")}
      </Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 md:flex-row">
        <Button
          onClick={handleSubmit(handleOnClickButtonVerify)}
          endIcon={<AssignmentTurnedInIcon fontSize="large" />}
          title={t("Projects.Project.Verification.Verification.button.verify")}
        />
        <Button
          onClick={handleSubmit(handleOnClickButtonRequest)}
          endIcon={<ScheduleSendIcon fontSize="large" />}
          title={t("Projects.Project.Verification.Verification.button.request")}
        />
      </div>

      <div
        className="flex w-full flex-col items-center justify-center gap-5
      gap-y-3 sm:flex-row sm:flex-wrap sm:items-start"
      >
        {processes.length > 0 ? (
          processes.map((item, index) => (
            <ProcessVerificationItem
              key={index}
              process={item}
              register={register}
              index={index}
            />
          ))
        ) : (
          <Heading variant="h2">
            {t("Projects.Project.Verification.Verification.error.noItems")}
          </Heading>
        )}
      </div>
    </div>
  );
};

export default ProcessVerification;
