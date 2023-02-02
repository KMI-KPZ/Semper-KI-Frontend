import "../../../styles.scss";
import "../ProcessView.scss";
import "./Material.scss";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../Header/Search/Search";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { IMaterial } from "../../../interface/Interface";
import Loading from "../../../components/Process/Loading/Loading";
import { ProcessContext } from "../ProcessView";

interface Props {
  materials: IMaterial[];
  grid: boolean;
  selectMaterial: (material: IMaterial) => void;
  setProgress(path: string): void;
}

export const MaterialCatalog = ({
  selectMaterial,
  setProgress,
  materials,
  grid,
}: Props) => {
  const { t } = useTranslation();
  useEffect(() => {
    setProgress("material");
  }, []);

  return (
    <div className="material-cards">
      {materials.length > 0
        ? materials
            .slice(0, 12)
            .map((material: IMaterial, index: number) => (
              <MaterialCatalogCard
                grid={grid}
                selectMaterial={selectMaterial}
                material={material}
                key={index}
              />
            ))
        : "keine Materialien gefunden"}
    </div>
  );
};
