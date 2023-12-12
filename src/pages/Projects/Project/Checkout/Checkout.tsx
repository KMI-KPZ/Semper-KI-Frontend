import Container from "@component-library/Container";
import { Heading } from "@component-library/Typography";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import ProjectCheckoutItem from "./components/Item";
import logger from "@/hooks/useLogger";
import { ProcessProps, ProcessStatus } from "../../hooks/useProcess";
import { useProject } from "../../hooks/useProject";
import { ProjectContext } from "../../context/ProjectContext";
import useProcessMutations from "@/api/Process/useProcessMutations";
import useProjectMutations from "@/api/Project/useProjectMutations";

interface ProjectCheckoutProps {}

export interface CheckoutFormData {
  processes: { process: ProcessProps; checked: boolean }[];
}

const ProjectCheckout: React.FC<ProjectCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { sendProject } = useProject();

  const { projectQuery: query } = useContext(ProjectContext);
  const processes: ProcessProps[] =
    query.data !== undefined &&
    query.data.processes.filter(
      (process) => process.processStatus === ProcessStatus.VERIFIED
    ).length > 0
      ? query.data.processes.filter(
          (process) => process.processStatus === ProcessStatus.VERIFIED
        )
      : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: async () => ({
      processes: processes.map((process) => ({
        process,
        checked: true,
      })),
    }),
  });

  const navigate = useNavigate();

  const handleOnClickButtonSend = (data: CheckoutFormData) => {
    if (query.data !== undefined) {
      sendProject({
        processIDs: data.processes
          .filter((process) => process.checked === true)
          .map((process) => process.process.processID),
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Heading variant="h1">
        {t("Projects.Project.Checkout.Checkout.title")}
      </Heading>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5 md:flex-row">
        <Button
          onClick={handleSubmit(handleOnClickButtonSend)}
          endIcon={<SendIcon fontSize="large" />}
          title={t("Projects.Project.Checkout.Checkout.button.send")}
        />
      </div>
      <div
        className="flex w-full flex-col items-center justify-center gap-5
      gap-y-3 sm:flex-row sm:flex-wrap sm:items-start"
      >
        {processes.length > 0 ? (
          processes.map((item, index) => (
            <ProjectCheckoutItem
              key={index}
              process={item}
              register={register}
              index={index}
            />
          ))
        ) : (
          <Heading variant="h2">
            {t("Projects.Project.Checkout.Checkout.error.noItems")}
          </Heading>
        )}
      </div>
    </div>
  );
};

export default ProjectCheckout;
