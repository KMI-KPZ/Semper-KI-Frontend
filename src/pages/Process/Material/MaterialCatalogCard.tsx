import { IMaterial } from "../../../interface/Interface";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
interface Props {
  material: IMaterial;
  grid: boolean;
  selectMaterial: (material: IMaterial) => void;
  openMaterialView(material: IMaterial): void;
}

export const MaterialCatalogCard: React.FC<Props> = (props) => {
  const { material, selectMaterial, openMaterialView, grid } = props;
  const { t } = useTranslation();

  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    selectMaterial(material);
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    openMaterialView(material);
  };
  return (
    <div
      className={`flex items-center justify-start overflow-hidden bg-white hover:cursor-pointer hover:bg-gray-300 ${
        grid === true
          ? "basis-[48%] flex-col sm:basis-[32%] md:basis-[23.5%]"
          : "w-full flex-row"
      }`}
      onClick={handleOnClickCard}
    >
      <img
        className={`object-cover ${
          grid === true
            ? "h-44 min-w-full max-w-[200%]"
            : "max-h-44 min-h-full w-44 "
        }`}
        src={material.URI}
        alt="Material"
      />
      <div
        className={`flex h-full items-center justify-around gap-2 p-3  md:justify-between ${
          grid === true ? "flex-col " : "w-full flex-row gap-5"
        }`}
      >
        <h2 className="text-center">{material.title}</h2>
        <div className="hidden flex-col items-center justify-center gap-2 2xl:flex">
          {material.propList.map((title: string, index: number) => (
            <div key={index}>{title}</div>
          ))}
        </div>
        <Button onClick={handleOnClickSelect}>
          {t("Process.Material.MaterialCatalogCard.button.select")}
        </Button>
      </div>
    </div>
  );
};
