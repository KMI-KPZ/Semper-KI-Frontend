import { IModel } from "../../../interface/Interface";
import React from "react";
import Button from "../../General/Button";

interface Props {
  model: IModel;
  grid: boolean;
  selectModel: (model: IModel) => void;
  openModelView(model: IModel): void;
}

export const ModelCard: React.FC<Props> = (props) => {
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
        src={model.URI}
        alt="Model"
      />
      <div
        className={`flex justify-around md:justify-between items-center p-3 gap-2  h-full ${
          grid === true ? "flex-col " : "w-full flex-row gap-5"
        }`}
      >
        <h2 className="model-card-headline">{model.title}</h2>
        <div
          className={`hidden md:flex  flex-wrap gap-2 items-center justify-center ${
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
          <div className="hidden md:flex flex-col gap-2 items-center justify-center">
            <div>Lizens: {model.license}</div>
            <div>Zertifikate:</div>
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
          <Button onClick={handleOnClickSelect}>Auswählen</Button>
        </div>
      </div>
    </div>
  );
};
