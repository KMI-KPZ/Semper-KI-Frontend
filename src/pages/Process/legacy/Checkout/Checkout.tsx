import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Button } from "@component-library/index";
import SendIcon from "@mui/icons-material/Send";
import ProjectCheckoutItem from "./components/Item";
import useSendProject from "@/api/Project/Mutations/useSendProject";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";

interface ProjectCheckoutProps {}

export interface CheckoutFormData {
  processes: { process: FlatProcess; checked: boolean }[];
}

const ProjectCheckout: React.FC<ProjectCheckoutProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const sendProject = useSendProject();

  const processes: FlatProcess[] = [];

  const { register, handleSubmit } = useForm<CheckoutFormData>({
    defaultValues: async () => ({
      processes: processes.map((process) => ({
        process,
        checked: true,
      })),
    }),
  });

  const handleOnClickButtonSend = (data: CheckoutFormData) => {
    sendProject.mutate(
      data.processes
        .filter((process) => process.checked === true)
        .map((process) => process.process.processID)
    );
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
