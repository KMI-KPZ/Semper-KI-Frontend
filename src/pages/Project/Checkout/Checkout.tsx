import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/index";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import ProjectCheckoutItem from "./components/Item";
import { Process, ProcessStatus } from "@/hooks/Process/useProcess";
import { ProjectContext } from "@/contexts/ProjectContext";
import { useProject } from "@/hooks/Project/useProject";

interface ProjectCheckoutProps {}

export interface CheckoutFormData {
  processes: { process: Process; checked: boolean }[];
}

const ProjectCheckout: React.FC<ProjectCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { sendProject } = useProject();

  const { projectQuery: query } = useContext(ProjectContext);
  const processes: Process[] =
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
      sendProject(
        data.processes
          .filter((process) => process.checked === true)
          .map((process) => process.process.processID)
      );
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
