import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  startNewProcess(): void;
}

const NewProcess: React.FC<Props> = (props) => {
  const { startNewProcess } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    startNewProcess();
    navigate("/process/model");
  }, []);
  return <h1>{t("Process.NewProcess.header")}</h1>;
};

export default NewProcess;
