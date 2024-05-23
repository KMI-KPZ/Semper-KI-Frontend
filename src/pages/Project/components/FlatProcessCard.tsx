import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import { Process, ProcessStatus } from "@/hooks/Process/useProcess";
import TestImg from "@images/Test.png";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";

interface FlatProcessCardProps {
  flatProcess: FlatProcess;
}

const FlatProcessCard: React.FC<FlatProcessCardProps> = (props) => {
  const { flatProcess: process } = props;
  const { t } = useTranslation();
  const getRingColor = (): string => {
    switch (process.flatProcessStatus) {
      case "ACTION_REQUIRED":
        return "ring-yellow-500";
      case "IN_PROGRESS":
        return "ring-yellow-500";
      case "COMPLETED":
        return "ring-green-500";
      default:
        return "ring-gray-500";
    }
  };

  return (
    <Container
      width="full"
      direction="row"
      justify="between"
      className={`overflow-clip rounded-xl ring-2 ${getRingColor()}`}
    >
      <img src={TestImg} alt="" className="h-full " />
      <Container width="full" direction="row" justify="between" className="p-5">
        <Container direction="row" align="start">
          <Container direction="col" align="start" gap={3}>
            <Text variant="strong">
              {t("Project.components.ProcessCard.serviceType")}
            </Text>
            <Text variant="strong">
              {t("Project.components.ProcessCard.status")}
            </Text>
          </Container>
          <Container direction="col" align="start" gap={3}>
            <Text>
              {t(
                `enum.ServiceType.${
                  ServiceType[process.serviceType] as keyof typeof ServiceType
                }`
              )}
            </Text>
            <Text>
              {t(`types.FlatProjectStatus.${process.flatProcessStatus}`)}
            </Text>
          </Container>
        </Container>
        <Container direction="row" align="start">
          <Container direction="col" align="start" gap={3}>
            <Text variant="strong">
              {t("Project.components.ProcessCard.updated")}
            </Text>
            <Text variant="strong">
              {t("Project.components.ProcessCard.count")}
            </Text>
          </Container>
          <Container direction="col" align="start" gap={3}>
            <Text>{process.updatedWhen.toLocaleString()}</Text>
            <Text>{process.amount}</Text>
          </Container>
        </Container>
        <Container direction="col" gap={3}>
          <Button
            size="sm"
            variant="primary"
            title={t("Project.components.ProcessCard.button.continue")}
          />
          <Button
            size="sm"
            variant="text"
            title={t("Project.components.ProcessCard.button.delete")}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default FlatProcessCard;
