import "../ProcessView.scss";
import React from "react";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { getFileSizeAsString } from "../../../services/utils";
import { IModel } from "../../../interface/Interface";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";

interface Props {
  model: IModel;
  selectModel: (model: IModel) => void;
}

export const ModelView = ({ model, selectModel }: Props) => {
  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };

  return (
    <div className="model-view">
      <h2 className="model-view-headline">{model.name}</h2>
      <img className="model-view-img" src={model.URI} alt="Model" />
      <div className="model-view-tags">
        {model.tags.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <div className="model-view-date">Erstellt am: {getDate()}</div>
      <div className="model-view-licens">Lizenz: {model.license}</div>
      <div className="model-view-certificates">
        Zertifikate:{" "}
        {model.certificate.length > 0
          ? model.certificate.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : "keine"}
      </div>
      <div className="model-view-button" onClick={(e) => selectModel(model)}>
        <Button variant="contained">Auswählen</Button>
      </div>
    </div>
  );
};
