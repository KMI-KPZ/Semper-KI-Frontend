import { Container } from "@component-library/index";
import { Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessHistoryTextItem from "./TextItem";
import logger from "@/hooks/useLogger";
import ProcessHistoryServiceText from "./ServiceText";
import {
  HistoryProps,
  ProcessHistoryType,
} from "@/api/Process/Querys/useGetProcessHistory";
import { ProcessStatus } from "@/hooks/Process/useProcess";

interface ProcessHistoryItemProps {
  item: HistoryProps;
}

const ProcessHistoryItem: React.FC<ProcessHistoryItemProps> = (props) => {
  const { item } = props;
  const { t } = useTranslation();

  switch (item.type) {
    case ProcessHistoryType.CREATION:
      return (
        <Text className=" break-all ">
          {t("Projects.Project.Process.History.components.Item.created")}
        </Text>
      );
    case ProcessHistoryType.STATUS:
      return (
        <Text className=" break-all ">
          {t("Projects.Project.Process.History.components.Item.status")}
          {t(
            `enum.ProcessStatus.${
              ProcessStatus[item.data] as keyof typeof ProcessStatus
            }`
          )}
        </Text>
      );
    case ProcessHistoryType.MESSAGE:
      return (
        <Container direction="col">
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.message.date"
            )}
            data={new Date(item.data.date).toLocaleString()}
          />
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.message.userID"
            )}
            data={item.createdBy}
          />
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.message.userName"
            )}
            data={item.data.userName}
          />
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.message.text"
            )}
            data={item.data.text}
          />
        </Container>
      );
    case ProcessHistoryType.FILE:
      return (
        <Container direction="col">
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.file.fileName"
            )}
            data={item.data.fileName}
          />
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.file.createdBy"
            )}
            data={item.data.createdBy}
          />
          <ProcessHistoryTextItem
            name={t(
              "Projects.Project.Process.History.components.Item.file.date"
            )}
            data={new Date(item.data.date).toLocaleString()}
          />
          <ProcessHistoryTextItem
            name={t("Projects.Project.Process.History.components.Item.file.id")}
            data={item.data.id}
          />
        </Container>
      );
    case ProcessHistoryType.DELETION:
      return (
        <Text className=" break-all ">
          {t(
            "Projects.Project.Process.History.components.Item.deletition.deleted"
          )}
        </Text>
      );
    case ProcessHistoryType.DETAILS:
      return <ProcessHistoryServiceText service={item.data} />;
    case ProcessHistoryType.OTHER:
      return <Text className="break-all">{String(item.data)}</Text>;
  }
};

export default ProcessHistoryItem;
