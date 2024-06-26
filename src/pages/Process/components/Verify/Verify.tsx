import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ProcessStatusButtons from "../StatusButtons";
import ProcessContainer from "@/components/Process/Container";

interface ProcessVerifyProps {}

const ProcessVerify: React.FC<ProcessVerifyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <ProcessContainer id="verified">
      <ProcessStatusButtons
        start={ProcessStatus.CONTRACTOR_SELECTED}
        end={ProcessStatus.VERIFIED}
      />
    </ProcessContainer>
  );
};

export default ProcessVerify;
