import "../../../styles.scss";
import "./../ProcessView.scss";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IModel } from "../../../interface/Interface";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../Header/Search/Search";
import { ModelCatalogCard } from "./ModelCatalogCard";
import Loading from "../../../components/Process/Loading/Loading";
import { ProcessContext } from "../ProcessView";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";

interface Props {
  models: IModel[];
  selectModel(model: IModel): void;
  setProgress(path: string): void;
}

interface State {
  filter: string;
  grid: boolean;
}

export const ModelCatalog: React.FC<Props> = ({
  models,
  selectModel,
  setProgress,
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState<State>({ filter: "", grid: true });
  useEffect(() => {
    setProgress("model");
  }, []);
  return (
    <div className="model-cards">
      {models.length > 0 ? (
        <div className="model-cards">
          {models.map((model: IModel, index: number) => (
            <ModelCatalogCard
              grid={state.grid}
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
