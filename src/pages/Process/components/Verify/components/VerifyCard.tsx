import { Container } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessVerifyCardProps {}

const ProcessVerifyCard: React.FC<ProcessVerifyCardProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <Container></Container>;
};

export default ProcessVerifyCard;
