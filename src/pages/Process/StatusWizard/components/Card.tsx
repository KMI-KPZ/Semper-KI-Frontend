import { Container, Text } from "@component-library/index";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { StatusWizardItem } from "../StatusWizard";
import { Process } from "@/api/Process/Querys/useGetProcess";

interface StatusWizardCardProps {
  process: Process;
  item: StatusWizardItem;
}

const StatusWizardCard: React.FC<StatusWizardCardProps> = (props) => {
  const { item, process } = props;
  const { t } = useTranslation();

  const active =
    (process.processStatus >= item.startStatus &&
      item.endStatus === undefined) ||
    (item.endStatus !== undefined && process.processStatus > item.endStatus);
  const onGoing =
    (process.processStatus === item.startStatus &&
      item.endStatus === undefined) ||
    (item.endStatus !== undefined && process.processStatus === item.endStatus);

  return (
    <Container
      width="full"
      justify="start"
      className={`rounded-xl border-2 p-2 ${
        active ? "border-orange-200" : "border-slate-100"
      }`}
    >
      {item.icon}
      <Text>{t(`Process.StatusWizard.StatusWizard.item.${item.text}`)}</Text>
    </Container>
  );
};

export default StatusWizardCard;
