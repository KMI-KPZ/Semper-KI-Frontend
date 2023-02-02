import "../../../styles.scss";
import "./../ProcessView.scss";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IModel } from "../../../interface/Interface";
import { ModelCatalogCard } from "./ModelCatalogCard";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import { IProcessState } from "../ProcessView";

interface Props {
  models: IModel[];
  processState: IProcessState;
  selectModel(model: IModel): void;
  setProgress(path: string): void;
}

export const ModelCatalog: React.FC<Props> = ({
  models,
  processState,
  selectModel,
  setProgress,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    setProgress("model");
  }, []);
  return (
    <div className="model-cards">
      {models.length > 0 ? (
        <div className="model-cards">
          {models.map((model: IModel, index: number) => (
            <ModelCatalogCard
              grid={processState.grid}
              selectModel={selectModel}
              model={model}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div>
          <LoadingAnimation type={0} />
          {t("model.catalog.loading-error")}
        </div>
      )}
    </div>
  );
};
