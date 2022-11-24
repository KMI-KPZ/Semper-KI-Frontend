import "../../../../styles.scss";
import "../../ProcessView.scss";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { Model } from "../../../../interface/Interface";
import { ModelCatalogCard } from "./ModelCatalogCard";
import { useFetch } from "../../../../hooks/useFetch";
import { useTranslation } from "react-i18next";

interface Props {
  selectModel: (model: Model) => void;
  setProgressState: (progressStateIndex: number) => void;
}

export const ModelCatalog = ({ selectModel, setProgressState }: Props) => {
  const { t } = useTranslation();
  const {
    data: modelList,
    isLoading: modelIsLoading,
    error: modelLoadingError,
  } = useFetch<Model>({ url: "http://localhost:3030/modelList" });

  return (
    <div className="process-content-container">
      <div className="catalog-container">
        <div className="user-input">
          <input
            type="text"
            className="input-field"
            placeholder={t("model.catalog.search-placeholder")}
            autoFocus
          />
          <div className="settings button light">
            <SettingsIcon />
          </div>
          <div className="search button dark">
            <SearchIcon />
          </div>
        </div>
        {modelLoadingError && (
          <div>
            {t("model.catalog.loading-error")}
            <br />
            {t("model.catalog.error-name")}
            {modelLoadingError.message}
          </div>
        )}
        {(modelIsLoading || !modelList) && !modelLoadingError && (
          <div>{t("model.catalog.loading-models")}</div>
        )}
        {!modelIsLoading && modelList && !modelLoadingError && (
          <div className="model-cards">
            {modelList.slice(0, 6).map((model: Model, index: number) => (
              <ModelCatalogCard
                setProgressState={setProgressState}
                selectModel={selectModel}
                model={model}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
