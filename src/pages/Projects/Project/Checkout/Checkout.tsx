import Container from "@component-library/Container";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/Button";
import SendIcon from "@mui/icons-material/Send";
import useCheckout from "./hooks/useCheckout";
import { useNavigate } from "react-router-dom";
import ProjectCheckoutItem from "./components/Item";
import logger from "@/hooks/useLogger";
import { ProcessProps, ProcessStatus } from "../../hooks/useProcess";
import { useProject } from "../../hooks/useProject";

interface ProjectCheckoutProps {}

export interface CheckoutFormData {
  processes: { process: ProcessProps; checked: boolean }[];
}

const ProjectCheckout: React.FC<ProjectCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { sendProject } = useCheckout();

  const { projectQuery } = useProject();
  const processes: ProcessProps[] =
    projectQuery.data !== undefined &&
    projectQuery.data.processes.filter(
      (process) => process.status === ProcessStatus.VERIFIED
    ).length > 0
      ? projectQuery.data.processes.filter(
          (process) => process.status === ProcessStatus.VERIFIED
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
    if (projectQuery.data !== undefined) {
      sendProject.mutate({
        projectID: projectQuery.data.projectID,
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
