import { Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/index";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import ProjectCheckoutItem from "./components/Item";
import { useProject } from "@/hooks/Project/useProject";
import useSendProject from "@/api/Project/Mutations/useSendProject";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProjectCheckoutProps {}

export interface CheckoutFormData {
  processes: { process: Process; checked: boolean }[];
}

const ProjectCheckout: React.FC<ProjectCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const sendProject = useSendProject();

  const { project } = useProject();
  const processes: Process[] =
    project.data !== undefined &&
    project.data.processes.filter(
      (process) => process.processStatus === ProcessStatus.VERIFIED
    ).length > 0
      ? project.data.processes.filter(
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
