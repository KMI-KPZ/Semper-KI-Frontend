import React, { useEffect } from "react";
import { IModel } from "../../../interface/Interface";
import { getModelURI } from "../../../services/utils";
import Button from "../../General/Button";

interface Props {
  model: IModel;
  deselectModel(): void;
}

const ModelView: React.FC<Props> = (props) => {
  const { model, deselectModel } = props;

  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };

  const convertStringForImage = (input: string): string => {
    let base64 = input;
    base64 = base64.slice(2);
    base64 = base64.slice(0, -1);
    return base64;
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-fit w-full p-5">
      <h2 className="">{model.title}</h2>
      <img className="w-full max-w-xs" src={getModelURI(model)} alt="Model" />
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
      <Button onClick={deselectModel}>Ändern</Button>
    </div>
  );
};

export default ModelView;
