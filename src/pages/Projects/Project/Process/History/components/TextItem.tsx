import Container from "@component-library/Container";
import { Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessHistoryTextItemProps {
  name: string;
  data: string;
}

const ProcessHistoryTextItem: React.FC<ProcessHistoryTextItemProps> = (
  props
) => {
  const { data, name } = props;

  return (
    <Container justify="between" direction="row" width="full">
      <Text className=" break-all ">{name}</Text>
      <Text>{data}</Text>
    </Container>
  );
};

export default ProcessHistoryTextItem;
