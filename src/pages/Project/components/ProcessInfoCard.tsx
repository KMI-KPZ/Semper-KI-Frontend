import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Heading, Text } from "@component-library/index";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { Container } from "@component-library/index";
import useCheckedProcesses from "../../../hooks/Project/useCheckedProcesses";
import { ProjectContext } from "@/contexts/ProjectContext";
import { Process } from "@/hooks/Process/useProcess";

interface ProcessInfoCardProps {
  process: Process;
}

const ProcessInfoCard: React.FC<ProcessInfoCardProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { handleOnChangeCheckboxSelect } = useCheckedProcesses();
  const { checkedProcesses } = useContext(ProjectContext);

  return (
    <Container>
      <input
        id="selectProcess"
        type="checkbox"
        className="h-6 w-6"
        name={t("Projects.Project.Project.label.selectProcess")}
        value={t("Projects.Project.Process.Process.label.selectProcess", {
          name: process.processDetails.title,
        })}
        checked={checkedProcesses.includes(process.processID)}
        onChange={(e) => handleOnChangeCheckboxSelect(e, process.processID)}
      />
      <Container direction="col" className="md:items-start">
        <Heading variant="h2">
          {t("Projects.Project.components.ProcessInfoCard.title")}
        </Heading>
        {process.processDetails.title !== undefined ? (
          <Container direction="row">
            <Text variant="body">
              {t("Projects.Project.components.ProcessInfoCard.name")}
            </Text>
            <Text variant="body">{process.processDetails.title}</Text>
          </Container>
        ) : null}
        <Container direction="row">
          <Text variant="body">
            {t("Projects.Project.components.ProcessInfoCard.service")}
          </Text>
          <Text variant="body">
            {t(
              `enum.ServiceType.${
                ServiceType[process.serviceType] as keyof typeof ServiceType
              }`
            )}
          </Text>
        </Container>
        {process.serviceType === ServiceType.MANUFACTURING ? (
          <>
            <Container direction="row">
              <Text variant="body">
                {t("Projects.Project.components.ProcessInfoCard.model")}
              </Text>
              <Text variant="body">
                {process.serviceDetails?.model?.fileName}
              </Text>
            </Container>
            <Container direction="row">
              <Text variant="body">
                {t("Projects.Project.components.ProcessInfoCard.material")}
              </Text>
              <Text variant="body">
                {process.serviceDetails?.material?.title}
              </Text>
            </Container>
            <Container direction="row">
              <Text variant="body">
                {t(
                  "Projects.Project.components.ProcessInfoCard.postProcessing"
                )}
              </Text>
              <Text variant="body">
                {process.serviceDetails.postProcessings
                  ?.map((postProcessing) => postProcessing.title)
                  .join(", ")}
              </Text>
            </Container>
          </>
        ) : null}
      </Container>
    </Container>
  );
};

export default ProcessInfoCard;
