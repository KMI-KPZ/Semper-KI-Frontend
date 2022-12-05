import "../../../styles.scss";
import "./../ProcessView.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { Model } from "../../../interface/Interface";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../../../components/Process/Search/Search";
import { ModelCatalogCard } from "./ModelCatalogCard";
import Loading from "../../../components/Process/Loading/Loading";

interface Props {
  selectModel(model: Model): void;
  setProgressState: (progressStateIndex: number) => void;
}

export const ModelCatalog = ({ selectModel, setProgressState }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetch<Model>({
    url: "http://localhost:3030/modelList",
  });

  return (
    <div className="process-container vertical">
      <Search
        headline={t("model.catalog.headline")}
        placeholder={t("model.catalog.search-placeholder")}
      />
      <div className="process-container content search">
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
                {data.slice(0, 6).map((model: Model, index: number) => (
                  <ModelCatalogCard
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
