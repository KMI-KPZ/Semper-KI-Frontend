import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ProcessProps } from "../../hooks/useProcess";
import { Heading, Text } from "@component-library/Typography";
import { ServiceType } from "@/pages/Service/hooks/useService";
import Container from "@component-library/Container";
import { ProjectContext } from "../../context/ProjectContext";
import useCheckedProcesses from "../hooks/useCheckedProcesses";

interface ProcessInfoCardProps {
  process: ProcessProps;
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
          name: process.details.title,
        })}
        checked={checkedProcesses.includes(process.processID)}
        onChange={(e) => handleOnChangeCheckboxSelect(e, process.processID)}
      />
      <Container direction="col" className="md:items-start">
        <Heading variant="h2">
          {t("Projects.Project.components.ProcessInfoCard.title")}
        </Heading>
        {process.details.title !== undefined ? (
          <Container direction="row">
            <Text variant="body">
              {t("Projects.Project.components.ProcessInfoCard.name")}
            </Text>
            <Text variant="body">{process.details.title}</Text>
          </Container>
        ) : null}
        <Container direction="row">
          <Text variant="body">
            {t("Projects.Project.components.ProcessInfoCard.service")}
          </Text>
          <Text variant="body">
            {t(
              `enum.ServiceType.${
                ServiceType[process.service.type] as keyof typeof ServiceType
              }`
            )}
          </Text>
        </Container>
        {process.service.type === ServiceType.MANUFACTURING ? (
          <>
            <Container direction="row">
              <Text variant="body">
                {t("Projects.Project.components.ProcessInfoCard.model")}
              </Text>
              <Text variant="body">{process.service.model?.title}</Text>
            </Container>
            <Container direction="row">
              <Text variant="body">
                {t("Projects.Project.components.ProcessInfoCard.material")}
              </Text>
              <Text variant="body">{process.service.material?.title}</Text>
            </Container>
            <Container direction="row">
              <Text variant="body">
                {t(
                  "Projects.Project.components.ProcessInfoCard.postProcessing"
                )}
              </Text>
              <Text variant="body">
                {process.service.postProcessings
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
