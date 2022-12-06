import "../../../styles.scss";
import "../ProcessView.scss";
import "./Material.scss";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../../../components/Process/Search/Search";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { Material } from "../../../interface/Interface";
import Loading from "../../../components/Process/Loading/Loading";

interface Props {
  setProgressState: (progressStateIndex: number) => void;
  selectMaterial: (material: Material) => void;
}

interface State {
  filter: string;
  grid: boolean;
}

export const MaterialCatalog = ({
  setProgressState,
  selectMaterial,
}: Props) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetch<Material>({
    url: "http://localhost:3030/materialList",
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
        headline={t("material.catalog.headline")}
        placeholder={t("material.catalog.search-placeholder")}
      />
      <div className="material-cards">
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
              <div className="material-cards">
                {data.slice(0, 12).map((material: Material, index: number) => (
                  <MaterialCatalogCard
                    grid={state.grid}
                    setProgressState={setProgressState}
                    selectMaterial={selectMaterial}
                    material={material}
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
