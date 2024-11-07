import { Heading } from "@component-library/index";
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
    navigate("model");
  }, []);
  return (
    <Heading variant="h1">
      {t(
        "Process.components.Service.ServiceEdit.Manufacturing.NewItem.heading"
      )}
    </Heading>
  );
};

export default ProcessNewItem;
