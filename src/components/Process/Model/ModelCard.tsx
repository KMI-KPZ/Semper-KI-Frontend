import "../../../styles.scss";
import "./../ProcessView.scss";
import { IModel } from "../../../interface/Interface";
import React from "react";
import { Button } from "@mui/material";

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

  const classNameList: string = grid === true ? "" : "list";

  return (
    <div className={`model-card ${classNameList}`} onClick={handleOnClickCard}>
      <img
        className={`model-card-img ${classNameList}`}
        src={model.URI}
        alt="Model"
      />
      <h2 className="model-card-headline">{model.name}</h2>
      <div className={`model-card-tags ${classNameList}`}>
        {model.tags.map((title: string, index: number) => (
          <div key={index} className="model-card-tag">
            {title}
          </div>
        ))}
      </div>
      {grid === false ? (
        <div className="model-card-specs">
          <div>Lizens: {model.license}</div>
          <div>Zertifikate:</div>
          {model.certificate.map((title: string, index: number) => (
            <div key={index}>{title}</div>
          ))}
        </div>
      ) : null}
      <div className="model-card-button" onClick={handleOnClickSelect}>
        <Button variant="contained">Auswählen</Button>
      </div>
    </div>
  );
};
