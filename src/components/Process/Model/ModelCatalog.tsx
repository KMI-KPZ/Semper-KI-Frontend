import "../../../styles.scss";
import "./../ProcessView.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IModel } from "../../../interface/Interface";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../../../components/Process/Search/Search";
import { ModelCatalogCard } from "./ModelCatalogCard";
import Loading from "../../../components/Process/Loading/Loading";

interface Props {
  models: IModel[];
  selectModel(model: IModel): void;
  setProgressState: (progressStateIndex: number) => void;
}

interface State {
  filter: string;
  grid: boolean;
}

export const ModelCatalog: React.FC<Props> = ({
  models,
  selectModel,
  setProgressState,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetch<IModel>({
    url: "http://localhost:3030/modelList",
  });

  const [state, setState] = useState<State>({ filter: "", grid: true });

  const handleClickGrid = (grid: boolean) => {
    setState((prevState) => ({ ...prevState, grid: grid }));
  };

  return (
    <div className="process-container vertical">
      <Search
        grid={state.grid}
        handleClickGrid={handleClickGrid}
        headline={t("model.catalog.headline")}
        placeholder={t("model.catalog.search-placeholder")}
      />
      <div className="model-cards">
        <Loading
          isLoading={isLoading}
          data={data}
          error={error}
          errorText={t("model.catalog.error-name")}
          loadingErrorText={t("model.catalog.loading-error")}
          loadingText={t("model.catalog.loading-models")}
          component={
            !isLoading &&
            data &&
            !error && (
              <div className="model-cards">
                {data.slice(0, 6).map((model: IModel, index: number) => (
                  <ModelCatalogCard
                    grid={state.grid}
                    setProgressState={setProgressState}
                    selectModel={selectModel}
                    model={model}
                    key={index}
                  />
                ))}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};
