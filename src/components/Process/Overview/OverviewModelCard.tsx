import "../ProcessView.scss";
import "./Overview.scss";
import { IProcess } from "../../../interface/Interface";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  expanded: boolean;
  process: IProcess;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) => void;
}

export const OverviewModelCard = ({ process, expanded, onClick }: Props) => {
  const { t } = useTranslation();

  const getModelCardExpanded = (): JSX.Element => {
    return (
      <div className="overview-model-card expanded">
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
      <div className="overview-model-card small">
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
