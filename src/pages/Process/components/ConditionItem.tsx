import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import { ProcessError } from "@/api/Process/Querys/useGetProcess";
import ProcessConditionIcon from "@/components/Process/ConditionIcon";

interface ProcessConditionItemProps {
  error: ProcessError;
}

const ProcessConditionItem: React.FC<ProcessConditionItemProps> = (props) => {
  const { error } = props;
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Container
      width="fit"
      justify="start"
      direction="row"
      className={`self-stretch rounded-md border-2 border-orange-500 p-2 hover:cursor-pointer hover:bg-gray-50`}
      onClick={() => {
        navigate("#" + error);
      }}
      tabIndex
    >
      <ProcessConditionIcon error={true} />
      <Text>{t(`types.ProcessError.${error}`)}</Text>
    </Container>
  );
};

export default ProcessConditionItem;
