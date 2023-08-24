import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { MaterialProps } from "../Material";
import { Heading } from "@component-library/Typography";
import useSubOrder from "@/pages/OrderRoutes/hooks/useSubOrder";
import { useNavigate } from "react-router-dom";

interface Props {
  material: MaterialProps;
  grid: boolean;
  openMaterialView(material: MaterialProps): void;
}

export const ProcessMaterialCard: React.FC<Props> = (props) => {
  const { material, openMaterialView, grid } = props;
  const { t } = useTranslation();
  const { updateSubOrder } = useSubOrder();
  const navigate = useNavigate();

  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    updateSubOrder.mutate({ changes: { service: { material: material } } });
    navigate("../postprocessing");
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
        <Heading variant="h2">{material.title}</Heading>
        <div className="hidden flex-col items-center justify-center gap-2 2xl:flex">
          {material.propList.map((title: string, index: number) => (
            <div key={index}>{title}</div>
          ))}
        </div>
        <Button
          onClick={handleOnClickSelect}
          title={t("Process.Material.MaterialCatalogCard.button.select")}
        />
      </div>
    </div>
  );
};
