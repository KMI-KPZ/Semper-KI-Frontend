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
      width="full"
      justify="start"
      direction="row"
      className={`min-w-[calc(50%-10px)] self-stretch rounded-md border-2 border-orange-500 bg-white p-2 hover:cursor-pointer hover:bg-gray-50`}
      onClick={() => {
        navigate("#" + error.key);
      }}
      tabIndex
    >
      <ProcessConditionIcon error={true} />
      <Text className="w-full text-center">
        {`${t(`types.ProcessError.${error.key}`)}${
          error.groupID !== undefined
            ? " " + t("general.group") + ` ${error.groupID + 1}`
            : ""
        }`}
      </Text>
    </Container>
  );
};

export default ProcessConditionItem;
