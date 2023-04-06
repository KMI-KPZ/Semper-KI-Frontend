import { IMaterial } from "../../../interface/Interface";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../General/Button";
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
      className={`flex justify-start items-center bg-white overflow-hidden hover:cursor-pointer hover:bg-gray-300 ${
        grid === true
          ? "flex-col basis-[48%] sm:basis-[32%] md:basis-[23.5%]"
          : "w-full flex-row"
      }`}
      onClick={handleOnClickCard}
    >
      <img
        className={`object-cover ${
          grid === true
            ? "min-w-full max-w-[200%] h-44"
            : "w-44 max-h-44 min-h-full "
        }`}
        src={material.URI}
        alt="Material"
      />
      <div
        className={`flex justify-around md:justify-between items-center p-3 gap-2  h-full ${
          grid === true ? "flex-col " : "w-full flex-row gap-5"
        }`}
      >
        <h2 className="text-center">{material.title}</h2>
        <div className="hidden 2xl:flex flex-col gap-2 items-center justify-center">
          {material.propList.map((title: string, index: number) => (
            <div key={index}>{title}</div>
          ))}
        </div>
        <Button onClick={handleOnClickSelect}>Auswählen</Button>
      </div>
    </div>
  );
};
