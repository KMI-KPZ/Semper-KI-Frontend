import { Heading } from "@component-library/Typography";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  startNewProcess(): void;
}

const ProcessNewItem: React.FC<Props> = (props) => {
  const { startNewProcess } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    startNewProcess();
    navigate("/process/model");
  }, []);
  return <Heading variant="h1">{t("Process.NewProcess.header")}</Heading>;
};

export default ProcessNewItem;
