import "../../../../styles.scss";
import "../../ProcessView.scss";
import "../Material.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Material } from "../../../../interface/Interface";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { useFetch } from "../../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import Search from "../../../../components/Process/Search/Search";

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
  } = useFetch<Material>({ url: "http://localhost:3030/materialList" });
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
        <Search
          headline={t("material.catalog.headline")}
          placeholder={t("material.catalog.search-placeholder")}
        />
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
