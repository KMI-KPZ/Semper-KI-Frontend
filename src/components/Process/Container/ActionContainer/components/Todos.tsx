import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import ProcessConditionItem from "./ConditionItem";
import ActionStatusCard from "@/components/Process/ActionStatusCard";
import useStatusButtons from "@/hooks/Project/useStatusButtons";
import { twMerge } from "tailwind-merge";

interface ActionContainerTodosProps {
  process: Process;
  error?: boolean;
  className?: string;
}

const ActionContainerTodos: React.FC<ActionContainerTodosProps> = (props) => {
  const { process, error = false, className = "" } = props;
  const { t } = useTranslation();
  const { getStatusButtons } = useStatusButtons();
  const statusButtons = getStatusButtons(
    process,
    process.actionStatus !== "ACTION_REQUIRED"
  );

  return (
    <>
      {process.processErrors === undefined ||
      process.processErrors.length === 0 ? null : (
        <Container
          items="center"
          direction="col"
          wrap="wrap"
          width="fit"
          className={twMerge(
            `rouned-md gap-5  rounded-md border-2 bg-gray-100 px-10 py-5 md:min-w-[500px] ${
              error ? "border-red-500" : ""
            }`,
            className
          )}
        >
          <Heading variant="h2">
            {t("components.Process.Container.ActionContainer.heading")}
          </Heading>
          {process.processErrors.map((error, index) => (
            <ProcessConditionItem key={index} error={error} />
          ))}
        </Container>
      )}
      {process.actionStatus !== "ACTION_REQUIRED" &&
      statusButtons.length > 0 ? (
        <ActionStatusCard process={process} className="w-fit" />
      ) : null}
    </>
  );
};
export default ActionContainerTodos;
