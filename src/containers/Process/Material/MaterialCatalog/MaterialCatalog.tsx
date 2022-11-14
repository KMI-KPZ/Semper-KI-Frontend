import "../../../../styles.scss";
import "../../ProcessView.scss";
import "../Material.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Material } from "../../../../Interface";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { useFetch } from "../../../../Hooks/useFetch";
import { useTranslation } from "react-i18next";

interface Props {
  setProgressState: (progressStateIndex: number) => void;
  selectMaterial: (material: Material) => void;
}

export const MaterialCatalog = ({
  setProgressState,
  selectMaterial,
}: Props) => {
  const { t } = useTranslation();
  const {
    data: materialList,
    isLoading: materialIsLoading,
    error: materialLoadingError,
  } = useFetch<Material>({ url: "http://localhost:3001/materialList" });
  const [filter, setFilter] = useState<number>(0);

  const getFilterClassName = (index: number): string => {
    return `filter-text ${filter === index ? "active" : ""}`;
  };

  const handleClickFilter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    e.preventDefault();
    setFilter(index);
  };

  return (
    <div className="process-content-container">
      <div className="catalog-container">
        <div className="user-input">
          <input
            type="text"
            className="input-field"
            placeholder={t("material.catalog.search-placeholder")}
          />
          <div className="settings button light">
            <SettingsIcon />
          </div>
          <div className="search button dark">
            <SearchIcon />
          </div>
        </div>
        <div className="filter">
          <div
            className={getFilterClassName(0)}
            onClick={(e) => handleClickFilter(e, 0)}
          >
            {t("material.catalog.filter.top-materials")}
          </div>
          <div
            className={getFilterClassName(1)}
            onClick={(e) => handleClickFilter(e, 1)}
          >
            {t("material.catalog.filter.plastic")}
          </div>
          <div
            className={getFilterClassName(2)}
            onClick={(e) => handleClickFilter(e, 2)}
          >
            {t("material.catalog.filter.metal")}
          </div>
          <div
            className={getFilterClassName(3)}
            onClick={(e) => handleClickFilter(e, 3)}
          >
            {t("material.catalog.filter.keramik-glass")}
          </div>
        </div>
        {materialLoadingError && (
          <div>
            {t("material.catalog.loading-error")}
            <br />
            {t("material.catalog.error-name")}
            {materialLoadingError.message}
          </div>
        )}
        {(materialIsLoading || !materialList) && !materialLoadingError && (
          <div>{t("material.catalog.loading-material")}</div>
        )}
        {!materialIsLoading && materialList && !materialLoadingError && (
          <div className="material-cards">
            {materialList
              .slice(0, 5)
              .map((material: Material, index: number) => (
                <MaterialCatalogCard
                  setProgressState={setProgressState}
                  selectMaterial={selectMaterial}
                  material={material}
                  key={index}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
