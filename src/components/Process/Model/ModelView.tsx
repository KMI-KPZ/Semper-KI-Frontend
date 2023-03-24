import React, { useEffect } from "react";
import { IModel } from "../../../interface/Interface";

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

  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-fit w-full">
      <h2 className="">{model.title}</h2>
      <img className="w-full max-w-xs" src={model.URI} alt="Model" />
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
      <div className="pb-2" onClick={deselectModel}>
        <div className=" text-white flex flex-row justify-center items-center w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
          Ändern
        </div>
      </div>
    </div>
  );
};

export default ModelView;
