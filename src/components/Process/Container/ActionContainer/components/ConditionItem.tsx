import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import {
  ProcessError,
  ProcessErrorType,
} from "@/api/Process/Querys/useGetProcess";
import ProcessConditionIcon from "@/components/Process/ConditionIcon";
import { ProcessContext } from "@/contexts/ProcessContext";
import { twMerge } from "tailwind-merge";

interface ProcessConditionItemProps {
  error: ProcessError;
}

export const tanslateProcessErrorTypeKey = (key: ProcessErrorType): string => {
  if (
    key === "Process-VerificationFailed" ||
    key === "Service-VerificationFailed"
  ) {
    return "Verification";
  } else return key;
};

const ProcessConditionItem: React.FC<ProcessConditionItemProps> = (props) => {
  const { error } = props;
  const { t } = useTranslation();
  const { setLoadGroup: setLoadGroupID } = useContext(ProcessContext);
  const navigate = useNavigate();

  const handleOnClickButton = () => {
    if (error.groupID !== undefined) {
      setLoadGroupID({ groupID: error.groupID, navLink: "#" + error.key });
    } else {
      navigate("#" + tanslateProcessErrorTypeKey(error.key));
    }
  };

  return (
    <Container
      width="full"
      justify="start"
      direction="row"
      className={twMerge(
        `min-w-[calc(50%-10px)] self-stretch rounded-md border-2 border-orange-500 bg-white p-2 hover:cursor-pointer hover:bg-gray-50`,
        error.key === "Service-VerificationFailed" ? "border-blue-500" : ""
      )}
      onClick={handleOnClickButton}
      tabIndex
    >
      <ProcessConditionIcon
        error={true}
        info={error.key === "Service-VerificationFailed"}
      />
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
