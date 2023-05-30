import React from "react";
import { Button } from "@component-library/Button";
import { useTranslation } from "react-i18next";
import { IModel } from "..";

interface Props {
  model: IModel;
  grid: boolean;
  selectModel: (model: IModel) => void;
  openModelView(model: IModel): void;
}

export const ModelCard: React.FC<Props> = (props) => {
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
        src={model.URI}
        alt="Model"
      />
      <div
        className={`flex h-full items-center justify-around gap-2 p-3  md:justify-between ${
          grid === true ? "flex-col " : "w-full flex-row gap-5"
        }`}
      >
        <h2 className="">{model.title}</h2>
        <div
          className={`hidden flex-wrap  items-center justify-center gap-2 md:flex ${
            grid === true ? "flex-row" : "flex-col"
          }`}
        >
          {model.tags.map((title: string, index: number) => (
            <div key={index} className="rounded-lg bg-gray-200 px-2 py-1">
              {title}
            </div>
          ))}
        </div>
        {grid === false ? (
          <div className="hidden flex-col items-center justify-center gap-2 md:flex">
            <div>
              {t("Process.Model.ModelCard.license")}: {model.license}
            </div>
            <div>{t("Process.Model.ModelCard.certificates")}:</div>
            {model.certificate.map((title: string, index: number) => (
              <div key={index}>{title}</div>
            ))}
          </div>
        ) : null}
        <div
          className={`flex  flex-wrap gap-2 ${
            grid === true ? "flex-row" : "flex-col"
          }`}
        >
          <Button onClick={handleOnClickSelect}>
            {t("Process.Model.ModelCard.button.select")}
          </Button>
        </div>
      </div>
    </div>
  );
};
