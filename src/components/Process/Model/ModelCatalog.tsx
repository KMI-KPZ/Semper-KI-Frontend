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
  // const { data, isLoading, error } = useFetch<IModel>({
  //   url: "http://127.0.0.1:3030/modelList",
  // });

  const [state, setState] = useState<State>({ filter: "", grid: true });
  useEffect(() => {
    setProgress("model");
  }, []);
  return (
    <div className="model-cards">
      {/* <Loading
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
        /> */}
      {models.length < 0 ? (
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
        t("model.catalog.loading-error")
      )}
    </div>
  );
};
