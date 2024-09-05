import { Container } from "@component-library/index";
import { Text } from "@component-library/index";
import React from "react";

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
      <Text className="">{name}</Text>
      <Text className="break-all">{data}</Text>
    </Container>
  );
};

export default ProcessHistoryTextItem;
