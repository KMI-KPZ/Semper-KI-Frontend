import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { MaterialProps } from "../Material";
import { Heading } from "@component-library/Typography";
import { useNavigate } from "react-router-dom";
import useProcess, { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import useService from "@/pages/Service/hooks/useService";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { ManufacturingServiceProps } from "../../types/types";
import logger from "@/hooks/useLogger";

interface Props {
  material: MaterialProps;
  grid: boolean;
  openMaterialView(material: MaterialProps): void;
}

export const ProcessMaterialCard: React.FC<Props> = (props) => {
  const { material, openMaterialView, grid } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updatedService } = useService();

  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("../postprocessing");
    updatedService({ material });
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
          title={t(
            "Service.Manufacturing.Material.components.Card.button.select"
          )}
        />
      </div>
    </div>
  );
};
