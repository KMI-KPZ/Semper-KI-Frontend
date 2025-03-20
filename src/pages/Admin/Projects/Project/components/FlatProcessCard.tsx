import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, Button, Container, Text } from "@component-library/index";
import TestImg from "@images/Test.png";
import { FlatProcess } from "@/api/Project/Querys/useGetProject";
import { useNavigate } from "react-router-dom";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import useEvents from "@/hooks/useEvents/useEvents";

interface FlatProcessCardProps {
  flatProcess: FlatProcess;
}

const FlatProcessCard: React.FC<FlatProcessCardProps> = (props) => {
  const { flatProcess: process } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const deleteProcess = useDeleteProcess();
  const { getProcessEvents } = useEvents();
  const getRingColor = (): string => {
    switch (process.actionStatus) {
      case "ACTION_REQUIRED":
        return "ring-yellow-300";
      case "IN_PROGRESS":
        return "ring-yellow-300";
      case "COMPLETED":
        return "ring-green-500";
      default:
        return "ring-gray-500";
    }
  };

  const handleOnClickButtonContinue = () => {
    navigate(`${process.processID}`);
  };
  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Project.components.FlatProcessCard.confirm"))) {
      deleteProcess.mutate({ processIDs: [process.processID] });
    }
  };

  return (
    <Container
      width="full"
      direction="row"
      justify="between"
      className={`overflow-clip rounded-md ring-2 ${getRingColor()} duration-300 hover:cursor-pointer hover:shadow-md hover:ring-4 hover:ring-opacity-50`}
      onClick={handleOnClickButtonContinue}
    >
      <img src={TestImg} alt="" className="h-full " />
      <Container width="full" direction="row" justify="between" className="p-5">
        <Container direction="row" items="start">
          <Container direction="col" items="start" gap={3}>
            <Text variant="strong">
              {t("Project.components.FlatProcessCard.serviceName")}
            </Text>
            <Text variant="strong">
              {t("Project.components.FlatProcessCard.serviceType")}
            </Text>
            <Text variant="strong">
              {t("Project.components.FlatProcessCard.status")}
            </Text>
          </Container>
          <Container direction="col" items="start" gap={3}>
            <Text>{process.title}</Text>
            <Text>
              {t(
                `enum.ServiceType.${
                  ServiceType[process.serviceType] as keyof typeof ServiceType
                }`
              )}
            </Text>
            <Text>
              {t(`types.ProcessActionStatus.${process.actionStatus}`)}
            </Text>
          </Container>
        </Container>
        <Container direction="row" items="start">
          <Container direction="col" items="start" gap={3}>
            <Text variant="strong">
              {t("Project.components.FlatProcessCard.updated")}
            </Text>
            <Text variant="strong">
              {t("Project.components.FlatProcessCard.count")}
            </Text>
          </Container>
          <Container direction="col" items="start" gap={3}>
            <Text>{process.updatedWhen.toLocaleString()}</Text>
            <Text>{process.amount}</Text>
          </Container>
        </Container>
        <Container direction="col" gap={3}>
          <Badge count={getProcessEvents(process.processID).length}>
            <Button
              onClick={handleOnClickButtonContinue}
              size="sm"
              variant="primary"
              title={t("general.button.continue")}
            />
          </Badge>
          <Button
            onClick={handleOnClickButtonDelete}
            size="sm"
            variant="text"
            title={t("general.button.delete")}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default FlatProcessCard;
