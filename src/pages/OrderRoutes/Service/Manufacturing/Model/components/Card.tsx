import React from "react";
import { Button } from "@component-library/Button";
import { useTranslation } from "react-i18next";
import { ModelProps } from "../types";
import { Heading } from "@component-library/Typography";

interface Props {
  model: ModelProps;
  grid: boolean;
  selectModel: (model: ModelProps) => void;
  openModelView(model: ModelProps): void;
}

export const ProcessModelCard: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model, selectModel, grid, openModelView } = props;
  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    selectModel(model);
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    openModelView(model);
  };
  if (grid === true)
    return (
      <div
        className="flex w-full basis-[48%] flex-col items-center justify-start overflow-hidden bg-white
        hover:cursor-pointer hover:bg-gray-300 
        sm:basis-[32%] md:basis-[23.5%]"
        onClick={handleOnClickCard}
      >
        <img
          className="h-44 max-h-44 w-44 min-w-full max-w-[200%] object-contain "
          src={model.URI}
          alt="Model"
        />
        <div className="flex h-full flex-col items-center justify-around gap-2 p-3 md:justify-between ">
          <Heading variant="h2">{model.title}</Heading>
          <div className="hidden flex-row flex-wrap  items-center justify-center gap-2 md:flex ">
            {model.tags.map((title: string, index: number) => (
              <div key={index} className="rounded-lg bg-gray-200 px-2 py-1">
                {title}
              </div>
            ))}
          </div>
          <div
            className={`flex  flex-wrap gap-2 ${
              grid === true ? "flex-row" : "flex-col"
            }`}
          >
            <Button
              onClick={handleOnClickSelect}
              title={t("Process.Model.ModelCard.button.select")}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="flex w-full flex-col items-center justify-start overflow-hidden bg-white hover:cursor-pointer hover:bg-gray-300 sm:flex-row"
      onClick={handleOnClickCard}
    >
      <img
        className="max-h-44 min-h-full w-44 object-cover "
        src={model.URI}
        alt="Model"
      />
      <div className="flex h-full w-full flex-col items-center justify-around gap-5 p-3 sm:flex-row md:justify-between">
        <Heading variant="h2">{model.title}</Heading>
        <div className="hidden flex-col  flex-wrap items-center justify-center gap-2 md:flex">
          {model.tags.map((title: string, index: number) => (
            <div key={index} className="rounded-lg bg-gray-200 px-2 py-1">
              {title}
            </div>
          ))}
        </div>

        <div className="hidden flex-col items-center justify-center gap-2 md:flex">
          <div>
            {t("Process.Model.ModelCard.license")}: {model.license}
          </div>
          <div>{t("Process.Model.ModelCard.certificates")}:</div>
          {model.certificate.map((title: string, index: number) => (
            <div key={index}>{title}</div>
          ))}
        </div>
        <div className="flex  flex-col flex-wrap gap-2 ">
          <Button
            onClick={handleOnClickSelect}
            title={t("Process.Model.ModelCard.button.select")}
          />
        </div>
      </div>
    </div>
  );
};
