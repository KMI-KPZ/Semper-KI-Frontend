import "../ProcessView.scss";
import "./Overview.scss";
import { Process } from "../../../Interface";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  expanded: boolean;
  process: Process;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void;
}

export const OverviewModelCard = ({ process, expanded, onClick }: Props) => {
  const { t } = useTranslation();

  const getModelCardExpanded = (): JSX.Element => {
    return (
      <div
        className="overview-model-card expanded"
        onClick={(e) => onClick(e, process.processId)}
      >
        <img
          className="model-card-img"
          src={require("../../../assets/images/model_placeholder.png")}
          alt="Model"
        />
        {process.model
          ? process.model.file.name
          : t("overview.models.no-model")}
      </div>
    );
  };

  const getModelCardSmall = (): JSX.Element => {
    return (
      <div
        className="overview-model-card small"
        onClick={(e) => onClick(e, process.processId)}
      >
        <img
          className="model-card-img"
          src={require("../../../assets/images/model_placeholder.png")}
          alt="Model"
        />
        {process.model
          ? process.model.file.name
          : t("overview.models.no-model")}
      </div>
    );
  };

  return expanded ? getModelCardExpanded() : getModelCardSmall();
};
