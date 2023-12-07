import {
  HistoryProps,
  ProcessHistoryType,
} from "@/api/Process/useProcessQuerys";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessHistoryItemProps {
  data: string | {} | Date | ProcessHistoryType;
}

const ProcessHistoryItem: React.FC<ProcessHistoryItemProps> = (props) => {
  const { data } = props;
  const { t } = useTranslation();

  switch (typeof data) {
    case "string":
      return <Text className=" break-all ">{data}</Text>;
    case "object":
      if (data instanceof Date) {
        return <Text className="break-all">{data.toLocaleString()}</Text>;
      } else {
        return <Text className="break-all">{JSON.stringify(data)}</Text>;
      }
    case "number":
      return (
        <Text className="break-all">
          {t(
            `enum.ProcessHistoryType.${
              ProcessHistoryType[data] as keyof typeof ProcessHistoryType
            }`
          )}
        </Text>
      );
  }
};

export default ProcessHistoryItem;
