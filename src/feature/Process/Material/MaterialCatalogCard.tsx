import "../ProcessView.scss";
import "./Material.scss";
import { Material } from "../../../interface/Interface";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  material: Material;
  setProgressState: (progressStateIndex: number) => void;
  selectMaterial: (material: Material) => void;
  grid: boolean;
}

export const MaterialCatalogCard = ({
  material,
  setProgressState,
  selectMaterial,
  grid,
}: Props) => {
  const { t } = useTranslation();

  const handleAddClick = () => {
    selectMaterial(material);
    setProgressState(2);
  };

  return (
    <div className={`material-card ${grid ? "grid" : "list"}`}>
      <img
        className="material-card-image"
        src={require("../../../assets/images/material_placeholder.png")}
        alt="Material"
      />
      <div className="material-card-header">{material.name}</div>
      <div className="material-card-description">
        {material.propList?.map((spec: string, index: number) => (
          <div className="material-card-text" key={index}>
            {spec}
          </div>
        ))}
      </div>
      <div className="material-card-specs">
        {t("material.catalog.card.price")}: <b>$$$</b>
      </div>
      <div className="material-card-buttons" onClick={handleAddClick}>
        {t("material.catalog.card.add")}
      </div>
    </div>
  );
};
